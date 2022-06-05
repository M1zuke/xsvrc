import { Close } from '@mui/icons-material';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../../../../api/use-api';
import { Button } from '../../../../components/button/Button';
import { Content } from '../../../../components/content/Content';
import { LoadableContent } from '../../../../components/loadable-content/LoadableContent';
import { Modal } from '../../../../components/modal/Modal';
import { Tabs } from '../../../../components/tabs/Tabs';
import { UserCard } from '../../../../components/user-card/UserCard';
import { selectFriendInfoById, selectFriendInfoByLocation } from '../../../../store/friends/selectors';
import { Dialog, DialogWithProps } from '../../../dialog/Dialog';
import { ChangeUsername } from './edit-user/ChangeUsername';
import { useFriendProfileTabModel } from './friend-profile-tab-model';
import styles from './FriendsProfileModal.module.scss';

type FriendProfileProps = {
  userId: string;
  edit?: boolean;
};

export function FriendProfileModal({ userId, onCanceled, edit }: DialogWithProps<FriendProfileProps>): ReactElement {
  const cachedUser = useSelector(selectFriendInfoById(userId));
  const samePeopleInInstance = useSelector(selectFriendInfoByLocation(cachedUser));
  const { getUser } = useApi();

  const tabConfig = useFriendProfileTabModel(samePeopleInInstance);

  useEffect(() => {
    getUser(userId).finally();
  }, [getUser, userId]);

  return (
    <Modal onCancel={onCanceled}>
      <Dialog className={styles.Component}>
        <Button onClick={onCanceled} className={styles.CloseButton} icon>
          <Close />
        </Button>
        <LoadableContent data={cachedUser}>
          {(user) => (
            <>
              <UserCard user={user} edit={edit} />
              <Content translucent>
                {!edit ? <Tabs config={tabConfig} data={user} entryKey="overview" /> : <ChangeUsername user={user} />}
              </Content>
            </>
          )}
        </LoadableContent>
      </Dialog>
    </Modal>
  );
}
