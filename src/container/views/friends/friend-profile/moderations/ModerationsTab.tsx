import { Block, Mic, MicOff, Shield, Visibility, VisibilityOff } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModerationType, UserInfo } from '../../../../../api/types';
import { useApi } from '../../../../../api/use-api';
import { Content } from '../../../../../components/content/Content';
import { useMessages } from '../../../../../i18n';
import { IsLoggedInUser } from '../../../../../store/friends/selectors';
import { deleteModeration } from '../../../../../store/user/actions';
import { GetModerationsByUserId } from '../../../../../store/user/selectors';
import { useAppDispatch } from '../../../../../thunk/dispatch';
import { ConfirmDialog } from '../../../../dialog/ConfirmDialog';
import styles from './ModerationsTab.module.scss';

type ModerationsTabProps = {
  user: UserInfo;
};

export function ModerationsTab({ user }: ModerationsTabProps): ReactElement {
  const messages = useMessages();
  const { moderateUser, unModerateUser } = useApi();
  const dispatch = useAppDispatch();
  const isLoggedInUser = useSelector(IsLoggedInUser(user.id));
  const [showConfirmBlock, setConfirmBlock] = useState(false);

  const moderations = useSelector(GetModerationsByUserId(user.id));
  const isMuted = useMemo(() => moderations.find((m) => m.type === 'mute'), [moderations]);
  const isBlocked = useMemo(() => moderations.find((m) => m.type === 'block'), [moderations]);
  const showAvatar = useMemo(() => moderations.find((m) => m.type === 'showAvatar'), [moderations]);
  const hideAvatar = useMemo(() => moderations.find((m) => m.type === 'hideAvatar'), [moderations]);

  const onModerateUser = useCallback(
    (type: ModerationType) => async () => {
      moderateUser(user.id, type).finally();
    },
    [moderateUser, user.id],
  );
  const onUnModerateUser = useCallback(
    (type: ModerationType) => async () => {
      if (type === 'showAvatar') {
        await unModerateUser(user.id, 'showAvatar');
        await unModerateUser(user.id, 'hideAvatar');
        dispatch(deleteModeration(user.id, 'hideAvatar'));
        dispatch(deleteModeration(user.id, 'showAvatar'));
      } else if (type === 'mute') {
        await unModerateUser(user.id, 'mute');
        await unModerateUser(user.id, 'unmute');
        dispatch(deleteModeration(user.id, 'mute'));
        dispatch(deleteModeration(user.id, 'unmute'));
      } else {
        await unModerateUser(user.id, type).finally();
        dispatch(deleteModeration(user.id, type));
      }
    },
    [dispatch, unModerateUser, user.id],
  );

  return (
    <Content translucent className={classNames(styles.ModerationsTab, { [styles.Disabled]: isLoggedInUser })} noPadding>
      {showConfirmBlock && (
        <ConfirmDialog
          title={messages.Views.Moderations.ConfirmBlockTitle(user.displayName)}
          body={messages.Views.Moderations.ConfirmBodyMessage(user.displayName)}
          onCanceled={() => setConfirmBlock(false)}
          onConfirmed={() => onModerateUser('block')()}
        />
      )}
      <div className={styles.ModerationBlock}>
        <Mic className={classNames(styles.Icon, { [styles.Active]: !isMuted })} onClick={onUnModerateUser('mute')} />
        <MicOff className={classNames(styles.Icon, { [styles.Active]: isMuted })} onClick={onModerateUser('mute')} />
        <div className={styles.ModerationTitle}>User Voice</div>
      </div>
      <div className={classNames(styles.ModerationBlock, styles.Span2)}>
        <Visibility
          className={classNames(styles.Icon, { [styles.Active]: showAvatar })}
          onClick={onModerateUser('showAvatar')}
        />
        <VisibilityOff
          className={classNames(styles.Icon, { [styles.Active]: hideAvatar })}
          onClick={onModerateUser('hideAvatar')}
        />
        <Shield
          className={classNames(styles.Icon, { [styles.Active]: !showAvatar && !hideAvatar })}
          onClick={onUnModerateUser('showAvatar')}
        />
        <div className={styles.ModerationTitle}>Avatar Display</div>
      </div>
      <div className={classNames(styles.ModerationBlock, styles.OneIcon)}>
        <Block
          className={classNames(styles.Icon, { [styles.Active]: isBlocked })}
          onClick={isBlocked ? onUnModerateUser('block') : () => setConfirmBlock(true)}
        />
        <div className={styles.ModerationTitle}>{isBlocked ? 'Unblock User' : 'Block User'}</div>
      </div>
    </Content>
  );
}
