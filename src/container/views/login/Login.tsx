import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../../api/prepare';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { TextInput } from '../../../components/input/TextInput';
import { Loading } from '../../../components/loading/Loading';
import { isProbablyAuthenticated } from '../../../components/secured/Secured';
import { useMessages } from '../../../i18n';
import { selectApiInfo } from '../../../store/api-info/selectors';
import { savedCookies } from '../../../store/persisted/selectors';
import { selectUserInfo } from '../../../store/user/selectors';
import styles from './Login.module.scss';

export function Login(): ReactElement {
  const messages = useMessages();
  const cookies = useSelector(savedCookies);
  const userInfo = useSelector(selectUserInfo);
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
      console.log('handleLogin');
      setVerifiedAuth(true);
      handleLogin();
    }
  }, [handleLogin, cookies, verifiedAuth, apiInfo]);

  return (
    <div className={styles.Component}>
      <div className={styles.LoginBox}>
        <div className={styles.LoginImage} />
        <TextInput
          aria-label="enter username"
          value={username}
          onChange={handleUsernameChange}
          placeholder={messages.Views.Login.View.Username}
        />
        <TextInput
          aria-label="enter password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder={messages.Views.Login.View.Password}
        />
        {userInfo === 'loading' ? (
          <Loading />
        ) : (
          <Button aria-label="login" onClick={handleLogin}>
            {messages.Views.Login.View.Login}
          </Button>
        )}
      </div>
    </div>
  );
}
