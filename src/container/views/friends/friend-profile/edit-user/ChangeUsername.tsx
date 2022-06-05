import { Check, Error, Warning } from '@mui/icons-material';
import classNames from 'classnames';
import React, { ReactElement, useCallback, useState } from 'react';
import { UserInfo } from '../../../../../api/types';
import { useApi } from '../../../../../api/use-api';
import { Button } from '../../../../../components/button/Button';
import { Content } from '../../../../../components/content/Content';
import { TextInput } from '../../../../../components/input/TextInput';
import styles from './ChangeUsername.module.scss';

type ChangeUsernameProps = {
  user: UserInfo;
};

export function ChangeUsername({ user }: ChangeUsernameProps): ReactElement {
  const [username, setUsername] = useState(user.displayName);
  const [repeatedUsername, setRepeatedUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userExists, setUserExits] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const { usernameExits, changeUsername } = useApi();

  const checkForUsername = useCallback(async () => {
    const result = await usernameExits(user.id, username);
    setUserExits(result?.userExists ?? false);
    setChecked(true);
  }, [user.id, username, usernameExits]);

  const usernameChanged = useCallback((value) => {
    setUsername(value);
    setUserExits(true);
    setChecked(false);
  }, []);

  const handleChangeUsername = useCallback(async () => {
    const result = await changeUsername(user.id, username, password);
    setError(result ?? null);
  }, [changeUsername, password, user.id, username]);

  return (
    <Content blockable className={styles.Component}>
      <div className={styles.Label}>Username:</div>
      <TextInput onChange={(value) => usernameChanged(value)} value={username} />

      <div className={styles.Label}>Repeat Username:</div>
      <TextInput onChange={(value) => setRepeatedUsername(value)} value={repeatedUsername} disabled={userExists} />

      <div className={styles.Label}>Password</div>
      <TextInput
        type="password"
        placeholder="Current password"
        onChange={(value) => setPassword(value)}
        value={password}
        disabled={userExists}
      />
      <Button onClick={checkForUsername}>Check for availability</Button>
      <Button
        onClick={handleChangeUsername}
        disabled={userExists || !checked || username !== repeatedUsername || !password}
      >
        Change Username
      </Button>

      <div className={classNames(styles.Help, { [styles.Available]: checked && !userExists })}>
        {checked && !userExists ? (
          <>
            <Check /> Username available
          </>
        ) : (
          <>
            <Warning /> Username unchecked or not available! Change your username or check it.
          </>
        )}
      </div>
      {error && (
        <div className={styles.Help}>
          <Error /> {JSON.parse(error)}
        </div>
      )}
    </Content>
  );
}
