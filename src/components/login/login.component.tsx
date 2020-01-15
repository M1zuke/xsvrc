import React, { FC, RefObject } from 'react';

import './login.component.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../services/vrc-api.service';
import { logInUser } from '../../store/user/actions';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const username: RefObject<HTMLInputElement> = React.createRef();
  const password: RefObject<HTMLInputElement> = React.createRef();

  const onLoginClick = () => {
    login(username.current!.value, password.current!.value).then((userInfo: UserInfo) => {
      dispatch(logInUser(userInfo));
    });
  };
  return (
      <div className="login-component">
        <input ref={username} className="login-input" type="text" placeholder="Username"/>
        <input ref={password} className="password-input" type="password" placeholder="password"/>
        <div className="login-btn" onClick={onLoginClick}>Login</div>
      </div>
  );
};
