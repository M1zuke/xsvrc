import { RequestParams } from '../common/electron-controls';
import { removeNotification, setNotifications } from '../store/user/actions';
import { AsyncAppAction } from '../thunk';
import { api, prepare } from './prepare';
import { NotificationContent, NotificationDTO } from './types';

const limit = 100;

export function getAllNotifications(
  type?: NotificationContent['type'],
  notifications: NotificationDTO[] = [],
  offset = 0,
): AsyncAppAction {
  return async function (dispatch, getState) {
    const params: RequestParams[] = type ? [{ key: 'type', value: type }] : [];
    const response = await prepare<NotificationDTO[]>(getState, dispatch, {
      url: api(`auth/user/notifications`),
      params: [
        ...params,
        { key: 'sent', value: 'false' },
        { key: 'offset', value: offset },
        { key: 'n', value: limit },
      ],
    });

    if (response.type === 'entity') {
      const newNotifications = [...notifications, ...response.result];
      if (response.result.length > 0) {
        return dispatch(getAllNotifications(type, newNotifications, offset + limit));
      }
      const parsedNotifications: NotificationContent[] = newNotifications.map((not) => ({
        ...not,
        details: JSON.parse(not.details),
      }));
      dispatch(setNotifications(parsedNotifications));
    }
  };
}

const NotificationsAnswerPossibilities = ['accept', 'hide', 'see'] as const;
export type NotificationsAnswerPossibility = typeof NotificationsAnswerPossibilities[number];

export function handleNotification(
  notification: NotificationContent,
  method: NotificationsAnswerPossibility,
): AsyncAppAction {
  return async function (dispatch, getState) {
    const response = await prepare(getState, dispatch, {
      url: api(`auth/user/notifications/${notification.id}/${method}`),
      method: 'PUT',
    });

    if (response.type === 'entity') {
      dispatch(removeNotification(notification.id));
    }
  };
}
