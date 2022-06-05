import classNames from 'classnames';
import React, { ReactElement, useMemo } from 'react';
import { UserInfo } from '../../api/types';
import { isLoggedIn } from '../../common/utils';
import styles from './Status.module.scss';

type StatusProps = {
  friendInfo: UserInfo;
  className?: string;
};

export function Status({ friendInfo, className }: StatusProps): ReactElement {
  const classes = useMemo(
    () =>
      classNames(
        styles.Status,
        {
          [styles.Active]: friendInfo.status === 'active' && isLoggedIn(friendInfo),
          [styles.AskMe]: friendInfo.status === 'ask me' && isLoggedIn(friendInfo),
          [styles.JoinMe]: friendInfo.status === 'join me' && isLoggedIn(friendInfo),
          [styles.Busy]: friendInfo.status === 'busy' && isLoggedIn(friendInfo),
        },
        className,
      ),
    [className, friendInfo],
  );
  return <div className={classes} />;
}
