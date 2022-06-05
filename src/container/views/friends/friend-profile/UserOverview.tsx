import classNames from 'classnames';
import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UserInfo } from '../../../../api/types';
import { useSettings } from '../../../../common/use-settings';
import { isActive, isLoggedIn } from '../../../../common/utils';
import { Tag } from '../../../../components/tag/Tag';
import { useMessages } from '../../../../i18n';
import { IsLoggedInUser } from '../../../../store/friends/selectors';
import { ModerationsTab } from './moderations/ModerationsTab';
import styles from './UserOverview.module.scss';

type UserBioProps = {
  user: UserInfo;
};

export function UserOverview({ user }: UserBioProps): ReactElement {
  const messages = useMessages();
  const settings = useSettings();
  const isLoggedInUser = useSelector(IsLoggedInUser(user.id));
  const Format = messages.Format.FullDate(settings.settings);
  const isSupporter = useMemo(() => user.tags.includes('system_supporter'), [user.tags]);

  const iconStyle = useMemo(
    () => ({
      backgroundImage: `url('${user.userIcon}')`,
    }),
    [user.userIcon],
  );
  const overwriteStyle = useMemo(
    () => ({
      backgroundImage: `url('${user.profilePicOverride}')`,
    }),
    [user.profilePicOverride],
  );

  const languageTags = useMemo(() => {
    return user.tags
      .filter((tag) => tag.includes('language_'))
      .map((tag) => tag.split('_')[1])
      .join(', ');
  }, [user.tags]);

  return (
    <div className={styles.Component}>
      <div className={styles.LeftRow}>
        <div className={styles.UserStatus}>
          <Tag label="User status" translucent>
            <div
              className={classNames(styles.UserStatusIcon, {
                [styles.Orange]: user.status === 'ask me' && isLoggedIn(user),
                [styles.Blue]: user.status === 'join me' && isLoggedIn(user),
                [styles.Red]: user.status === 'busy' && isLoggedIn(user),
                [styles.Green]: user.status === 'active' && isLoggedIn(user),
                [styles.Offline]: user.status === 'offline' && isLoggedIn(user),
              })}
            />
          </Tag>
          <Tag label="Online through website" checked={isActive(user)} />
          <Tag label="Account creation date">{Format(user.date_joined)}</Tag>
        </div>
        <Tag label="Biography" fullWidth>
          <pre>{user.bio || 'No Bio entered'}</pre>
        </Tag>
        <Tag label="Tags" fullWidth childrenClassName={styles.VisualizedTags}>
          <Tag label="Is Supporter" checked={user.tags.includes('system_supporter')} />
          <Tag label="Avatar Upload" checked={user.tags.includes('system_avatar_access')} />
          <Tag label="World Upload" checked={user.tags.includes('system_world_access')} />
          {languageTags && <Tag label="Languages">{languageTags}</Tag>}
          {user.last_login && <Tag label="Last login">{Format(user.last_login)}</Tag>}
          {user.last_activity && <Tag label="Last activity">{Format(user.last_activity) ?? 'No entry'}</Tag>}
        </Tag>
        <Tag label="Moderations" fullWidth disabled={isLoggedInUser}>
          <ModerationsTab user={user} />
        </Tag>
      </div>
      <div className={classNames(styles.PremiumUser, { [styles.NoSupporter]: !isSupporter })}>
        <Tag label="Usericon" translucent fullWidth>
          <div className={styles.Image} style={iconStyle}>
            {!user.userIcon && <div>None</div>}
          </div>
        </Tag>
        <Tag label="Profile Pic Overwrite" translucent fullWidth>
          <div className={classNames(styles.Image, styles.Quad)} style={overwriteStyle}>
            {!user.profilePicOverride && <div>None</div>}
          </div>
        </Tag>
      </div>
    </div>
  );
}
