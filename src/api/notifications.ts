import { RequestParams } from '../common/electron-controls';
import { setNotifications } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { NotificationContent, NotificationDTO } from './types';

const limit = 100;

export function getAllNotifications(
  type?: NotificationContent['type'],
  notifications: NotificationDTO[] = [],
  offset = 0,
): AppThunkAction<Promise<void>> {
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
