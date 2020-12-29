import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from '../../api/prepare';
import { RawWebsocketNotification, WebSocketNotification } from '../../api/types';
import { savedCookies } from '../../store/cookies/selectors';
import { updateFriend } from '../../store/friends/actions';
import { selectFriendInfo } from '../../store/friends/selectors';
import { useAppDispatch } from '../../thunk/dispatch';

export function WebSockets(): ReactElement {
  const dispatch = useAppDispatch();
  const webSocket = useRef<WebSocket | null>(null);
  const cookies = useSelector(savedCookies);
  const friendInfo = useSelector(selectFriendInfo);
  const authCookie = useMemo(() => cookies.find((cookie) => cookie.key === 'auth'), [cookies]);

  useEffect(() => {
    if (authCookie && isLoaded(friendInfo)) {
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
  }, [authCookie, cookies, dispatch, friendInfo]);
  return <></>;
}
