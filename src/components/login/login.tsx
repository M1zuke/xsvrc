import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser } from '../../services/vrc-api.service';
import { logInUser } from '../../store/user/actions';
import { StoredCookie } from '../../store/user/reducer';
import { selectLoggedIn, selectStoredCookies } from '../../store/user/selectors';
import { Loading } from '../loading/loading';
import { Button } from '../utils/buttons/button';
import { TextInput } from '../utils/inputs/textInput';

import './login.scss';

interface LoginState {
  loggingIn: boolean;
  username: string;
  password: string;
  failed: boolean;
  succeed: boolean;
}

export const Login: FC = () => {

  const [state, setState] = useState<LoginState>({
    loggingIn: false,
    username: '',
    password: '',
    failed: false,
    succeed: false,
  });

  const storedCookies: StoredCookie[] = useSelector(selectStoredCookies);
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector(selectLoggedIn);
  const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setState({
    ...state,
    username: e.target.value,
  }), [state]);
  const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setState({
    ...state,
    password: e.target.value,
  }), [state]);


  const onLoginClick = useCallback(() => {
    if (!state.loggingIn) {
      setState({...state, loggingIn: true});
      loginUser(state.username, state.password, storedCookies)
      .then((userInfo: UserInfo) => {
        setState({...state, loggingIn: false, succeed: true});
        dispatch(logInUser(userInfo));
        history.push('/overview');
      })
      .catch((e: Error) => {
        setState({
          ...state,
          failed: true,
          succeed: false,
        });
        return Promise.reject(e);
      });
    }
  }, [state, dispatch, history, storedCookies]);

  if (storedCookies.length > 0 && !state.failed && !state.loggingIn && loggedIn && !state.succeed) {
    onLoginClick();
  }

  return (
    <div className="login-component">
      <div className="login-image" />
      <div className="login-container">
        <TextInput onchange={onUsernameChange} placeholder="Username" />
        <TextInput type="password" onchange={onPasswordChange} placeholder="Password" />
        {state.loggingIn ? <Loading /> : <Button theme="dark" onclick={onLoginClick}>Login</Button>}
      </div>
    </div>
  );
};
