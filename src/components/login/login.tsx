import React, { ChangeEvent, FC, useCallback, useState } from 'react';

import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/vrc-api.service';
import { logInUser } from '../../store/user/actions';
import { selectLoggedIn } from '../../store/user/selectors';
import { Loading } from '../loading/loading';
import { useHistory } from 'react-router';

interface LoginState {
  loggingIn: boolean;
  username: string;
  password: string;
}

export const Login: FC = () => {

  const [state, setState] = useState<LoginState>({
    loggingIn: false,
    username: '',
    password: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector(selectLoggedIn);
  const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setState({ ...state, username: e.target.value }), [state]);
  const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setState({ ...state, password: e.target.value }), [state]);


  const onLoginClick = useCallback(() => {
    if (!loggedIn && !state.loggingIn) {
      setState({ ...state, loggingIn: true });
      loginUser(state.username, state.password).then((userInfo: UserInfo) => {
        setState({ ...state, loggingIn: false });
        console.log(userInfo);
        dispatch(logInUser(userInfo));
        history.push('/overview');
      }).catch(() => {
        setState({ ...state, loggingIn: false });
      });
    }
  }, [state, dispatch, history, loggedIn]);

  return (
      <div className="login-component">
        <input className="login-input" type="text" placeholder="Username" onChange={ onUsernameChange }/>
        <input className="password-input" type="password" placeholder="password" onChange={ onPasswordChange }/>
        { state.loggingIn ? <Loading/> : <div className="login-btn" onClick={ onLoginClick }>Login</div> }

      </div>
  );
};
