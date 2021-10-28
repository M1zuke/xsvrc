import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isErrorNotification, RawWebsocketNotification, WebSocketNotification } from '../../api/types';
import { useApi } from '../../api/use-api';
import { updateFriend } from '../../store/friends/actions';
import { savedCookies } from '../../store/persisted/selectors';
import { isLoggedIn } from '../../store/user/selectors';
import { useAppDispatch } from '../../thunk/dispatch';

export function WebSockets(): ReactElement {
  const dispatch = useAppDispatch();
  const webSocket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const cookies = useSelector(savedCookies);
  const loggedIn = useSelector(isLoggedIn);
  const { logout } = useApi();
  const authCookie = useMemo(() => cookies.find((cookie) => cookie.key === 'auth'), [cookies]);

  useEffect(() => {
    if (authCookie && loggedIn && !connected) {
      webSocket.current = new WebSocket(`wss://pipeline.vrchat.cloud/?authToken=${authCookie.cleanValue}`);
      webSocket.current.onmessage = (message) => {
        const parsedData: RawWebsocketNotification = JSON.parse(message.data);
        if (!isErrorNotification(parsedData)) {
          const websocketNotification: WebSocketNotification = {
            ...parsedData,
            content: JSON.parse(parsedData.content),
          };
          dispatch(updateFriend(websocketNotification)).finally();
        } else {
          logout().finally();
        }
      };
      webSocket.current.onclose = () => {
        setConnected(false);
        console.log('ws closed');
      };
      webSocket.current.onopen = () => {
        setConnected(true);
        console.log('ws opened');
      };
    }
  }, [authCookie, connected, dispatch, loggedIn, logout]);
  return <></>;
}
