import { Block, DoNotTouch, Mic, MicOff, PanTool, Shield, Visibility, VisibilityOff } from '@mui/icons-material';
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
import { ModerationBlock, ModerationBlockIcon } from './moderation-block/ModerationBlock';
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
  const interactOn = useMemo(() => moderations.find((m) => m.type === 'interactOn'), [moderations]);
  const interactOff = useMemo(() => moderations.find((m) => m.type === 'interactOff'), [moderations]);

  const onUnModerateUser = useCallback(
    (type: ModerationType, noDefaultBehaviour?: boolean) => async () => {
      if (type === 'showAvatar' || type === 'hideAvatar') {
        await unModerateUser(user.id, 'showAvatar');
        await unModerateUser(user.id, 'hideAvatar');
        dispatch(deleteModeration(user.id, 'hideAvatar'));
        dispatch(deleteModeration(user.id, 'showAvatar'));
      } else if (type === 'mute' || type === 'unmute') {
        await unModerateUser(user.id, 'mute');
        await unModerateUser(user.id, 'unmute');
        dispatch(deleteModeration(user.id, 'mute'));
        dispatch(deleteModeration(user.id, 'unmute'));
      } else if (type === 'interactOn' || type === 'interactOff') {
        await unModerateUser(user.id, 'interactOn');
        await unModerateUser(user.id, 'interactOff');
        dispatch(deleteModeration(user.id, 'interactOn'));
        dispatch(deleteModeration(user.id, 'interactOff'));
      } else if (!noDefaultBehaviour) {
        await unModerateUser(user.id, type).finally();
        dispatch(deleteModeration(user.id, type));
      }
    },
    [dispatch, unModerateUser, user.id],
  );

  const onModerateUser = useCallback(
    (type: ModerationType) => async () => {
      await onUnModerateUser(type, true)().finally();
      moderateUser(user.id, type).finally();
    },
    [moderateUser, onUnModerateUser, user.id],
  );

  const moderationsIcons: Record<string, ModerationBlockIcon> = useMemo(
    () => ({
      unmute: { icon: Mic, onClick: onUnModerateUser('mute'), active: !isMuted },
      mute: { icon: MicOff, onClick: onModerateUser('mute'), active: !!isMuted },
      showAvatar: { icon: Visibility, onClick: onModerateUser('showAvatar'), active: !!showAvatar },
      hideAvatar: { icon: VisibilityOff, onClick: onModerateUser('hideAvatar'), active: !!hideAvatar },
      defaultAvatar: { icon: Shield, onClick: onUnModerateUser('showAvatar'), active: !showAvatar && !hideAvatar },
      blocked: {
        icon: Block,
        onClick: isBlocked ? onUnModerateUser('block') : () => setConfirmBlock(true),
        active: !!isBlocked,
      },
      forceOnInteraction: { icon: PanTool, onClick: onModerateUser('interactOn'), active: !!interactOn },
      forceOffInteraction: { icon: DoNotTouch, onClick: onModerateUser('interactOff'), active: !!interactOff },
      defaultInteraction: {
        icon: Shield,
        onClick: onUnModerateUser('interactOn'),
        active: !interactOn && !interactOff,
      },
    }),
    [hideAvatar, interactOff, interactOn, isBlocked, isMuted, onModerateUser, onUnModerateUser, showAvatar],
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
      <ModerationBlock title="User Voice" icons={[moderationsIcons.unmute, moderationsIcons.mute]} />
      <ModerationBlock
        title="Avatar Display"
        icons={[moderationsIcons.showAvatar, moderationsIcons.hideAvatar, moderationsIcons.defaultAvatar]}
        span2
      />
      <ModerationBlock title={isBlocked ? 'Unblock User' : 'Block User'} icons={[moderationsIcons.blocked]} oneIcon />
      <ModerationBlock
        title="Interaction"
        icons={[
          moderationsIcons.forceOnInteraction,
          moderationsIcons.forceOffInteraction,
          moderationsIcons.defaultInteraction,
        ]}
        span2
      />
    </Content>
  );
}
