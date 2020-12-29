import { RequestParams } from '../common/electron-fetch';
import { setNotifications } from '../store/user/actions';
import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';
import { NotificationDTO } from './types';

const limit = 100;

export function getAllNotifications(
  type?: NotificationDTO['type'],
  notifications: NotificationDTO[] = [],
  offset = 0,
): AppThunkAction<Promise<void>> {
  return async function (dispatch, getState) {
    // const date = new Date();
    // date.setHours(1, 0, 0, 0);
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
      dispatch(setNotifications(newNotifications));
    } else {
      console.log(response);
    }
  };
}
