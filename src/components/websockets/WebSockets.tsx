import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { RawWebsocketNotification, WebSocketNotification } from '../../api/types';
import { updateFriend } from '../../store/friends/actions';
import { savedCookies } from '../../store/persisted/selectors';
import { selectUserInfo } from '../../store/user/selectors';
import { useAppDispatch } from '../../thunk/dispatch';

export function WebSockets(): ReactElement {
  const dispatch = useAppDispatch();
  const webSocket = useRef<WebSocket | null>(null);
  const cookies = useSelector(savedCookies);
  const userInfo = useSelector(selectUserInfo);
  const authCookie = useMemo(() => cookies.find((cookie) => cookie.key === 'auth'), [cookies]);

  useEffect(() => {
    if (authCookie && isLoaded(userInfo)) {
      webSocket.current = new WebSocket(`wss://pipeline.vrchat.cloud/?authToken=${authCookie.cleanValue}`);
      webSocket.current.onmessage = (message) => {
        const parsedData: RawWebsocketNotification = JSON.parse(message.data);
        const websocketNotification: WebSocketNotification = {
          ...parsedData,
          content: JSON.parse(parsedData.content),
        };

        dispatch(updateFriend(websocketNotification)).finally();
      };
      return () => webSocket.current?.close();
    }
  }, [authCookie, cookies, dispatch, userInfo]);
  return <></>;
}
