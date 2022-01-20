import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { TextInput } from '../../../components/input/TextInput';
import { isProbablyAuthenticated } from '../../../components/secured/Secured';
import { useMessages } from '../../../i18n';
import { selectApiInfo } from '../../../store/api-info/selectors';
import { savedCookies } from '../../../store/persisted/selectors';
import styles from './Login.module.scss';

export function Login(): ReactElement {
  const messages = useMessages();
  const cookies = useSelector(savedCookies);
  const apiInfo = useSelector(selectApiInfo);
  const { login } = useApi();
  const [verifiedAuth, setVerifiedAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = useCallback((value: string) => setUsername(value), []);
  const handlePasswordChange = useCallback((value: string) => setPassword(value), []);

  const handleLogin = useCallback(() => {
    login(username, password).finally();
  }, [login, password, username]);

  useEffect(() => {
    if (isProbablyAuthenticated(cookies) && !verifiedAuth && isLoaded(apiInfo)) {
      setVerifiedAuth(true);
      handleLogin();
    }
  }, [handleLogin, cookies, verifiedAuth, apiInfo]);

  return (
    <div className={styles.Component}>
      <div className={styles.LoginBox}>
        <div className={styles.LoginImage} />
        <TextInput value={username} onChange={handleUsernameChange} placeholder={messages.Views.Login.View.Username} />
        <TextInput
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder={messages.Views.Login.View.Password}
        />

        <Button aria-label="login" onClick={handleLogin}>
          {messages.Views.Login.View.Login}
        </Button>
      </div>
    </div>
  );
}
