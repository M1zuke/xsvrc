import { Delete, Star } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserInfo } from '../../api/types';
import { useApi } from '../../api/use-api';
import { useTrustRank } from '../../common/trust-system';
import { AssignToFavoriteDialog } from '../../container/dialog/AssignToFavoriteDialog';
import { ConfirmDialog, ConfirmDialogProps } from '../../container/dialog/ConfirmDialog';
import { DialogWithProps } from '../../container/dialog/Dialog';
import { useMessages } from '../../i18n';
import { IsLoggedInUser } from '../../store/friends/selectors';
import { GetFavoriteOfUser } from '../../store/user/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: UserInfo;
};

export function UserCard({ user }: UserCardProps): ReactElement {
  const { UserCard } = useMessages().Views;
  const [showConfirmDialog, setShowConfirmDialog] = useState<DialogWithProps<ConfirmDialogProps> | null>(null);
  const [showAssignToFavoriteDialog, setShowAssignToFavoriteDialog] = useState(false);
  const { unfriendUser, addToFavorites, removeFromFavorites } = useApi();
  const history = useHistory();
  const isLoggedInUser = useSelector(IsLoggedInUser(user.id));
  const isFavorite = useSelector(GetFavoriteOfUser(user.id));

  const avatarThumbnailImage = useMemo(() => {
    const url = user.profilePicOverride || user.currentAvatarThumbnailImageUrl;
    return {
      backgroundImage: `url('${url}')`,
    };
  }, [user.currentAvatarThumbnailImageUrl, user.profilePicOverride]);

  const userTrustRank = useTrustRank(user.tags);

  const generateClassnames = useCallback(
    (defaultStyle: string) => {
      return classNames(defaultStyle, {
        [styles.Visitor]: userTrustRank === 'Visitor',
        [styles.NewUser]: userTrustRank === 'New User',
        [styles.User]: userTrustRank === 'User',
        [styles.KnownUser]: userTrustRank === 'Known User',
        [styles.TrustedUser]: userTrustRank === 'Trusted User' || userTrustRank === 'Veteran User',
        [styles.LegendaryUser]: userTrustRank === 'Legendary User',
      });
    },
    [userTrustRank],
  );

  const handleOnUnfriendClick = useCallback(
    (confirmed?: boolean) => {
      if (confirmed) {
        unfriendUser(user.id).finally();
        history.goBack();
      } else {
        setShowConfirmDialog({
          onConfirmed: () => handleOnUnfriendClick(true),
          onCanceled: () => setShowConfirmDialog(null),
          title: UserCard.ConfirmMessages.ConfirmUnfriend.Title(user.displayName),
          body: UserCard.ConfirmMessages.ConfirmUnfriend.Body,
        });
      }
    },
    [UserCard.ConfirmMessages.ConfirmUnfriend, history, unfriendUser, user.displayName, user.id],
  );

  const handleOnFavoriteUser = useCallback(
    (group: string) => {
      addToFavorites(user, group).finally();
    },
    [addToFavorites, user],
  );

  const handleFavoriteUserButtonCLick = useCallback(
    (confirmed?: boolean) => {
      if (isFavorite) {
        if (confirmed) {
          removeFromFavorites(isFavorite).finally();
        } else {
          setShowConfirmDialog({
            onConfirmed: () => handleFavoriteUserButtonCLick(true),
            onCanceled: () => setShowConfirmDialog(null),
            title: UserCard.ConfirmMessages.ConfirmRemoveFavorite.Title(user.displayName),
            body: UserCard.ConfirmMessages.ConfirmRemoveFavorite.Body(user.displayName, isFavorite.groupName),
          });
        }
      } else {
        setShowAssignToFavoriteDialog(true);
      }
    },
    [UserCard.ConfirmMessages.ConfirmRemoveFavorite, isFavorite, removeFromFavorites, user.displayName],
  );

  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          onCanceled={() => setShowConfirmDialog(null)}
          onConfirmed={showConfirmDialog.onConfirmed}
          title={showConfirmDialog.title}
          body={showConfirmDialog.body}
        />
      )}
      {showAssignToFavoriteDialog && (
        <AssignToFavoriteDialog
          onCanceled={() => setShowAssignToFavoriteDialog(false)}
          onConfirmed={handleOnFavoriteUser}
        />
      )}
      <Content className={styles.UserCard} translucent>
        <div className={styles.BackgroundImage} style={avatarThumbnailImage} />
        <div className={generateClassnames(styles.AvatarThumbnail)} style={avatarThumbnailImage} />
        <div className={styles.Overview}>
          <div className={styles.UserInfo}>
            <div className={styles.UserName}>
              {user.displayName} ({user.username})
            </div>
            <div className={styles.StatusDescription}>{user.statusDescription}</div>
            <div className={styles.TrustRank}>
              <div className={generateClassnames(styles.FontStyles)}>{userTrustRank}</div>
            </div>
          </div>
          <div className={styles.UserInteractions}>
            <Button
              onClick={() => handleFavoriteUserButtonCLick()}
              className={classNames(styles.FavoriteUser, {
                [styles.AlreadyFavorite]: !!isFavorite,
              })}
              icon={!isFavorite}
              disabled={isLoggedInUser || !user.isFriend}
            >
              <Star />
              {isFavorite?.groupName}
            </Button>
            <Button
              icon
              onClick={() => handleOnUnfriendClick()}
              className={styles.DeleteUser}
              disabled={isLoggedInUser || !user.isFriend}
            >
              <Delete />
            </Button>
          </div>
        </div>
      </Content>
    </>
  );
}
