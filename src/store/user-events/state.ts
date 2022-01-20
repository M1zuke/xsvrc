import { FriendNotification, UserInfo, UserNotification } from '../../api/types';
import { UserComparison } from '../../components/websockets/common';

export type UserEvent = {
  userId: UserInfo['id'];
  timestamp: Date;
  eventType: FriendNotification['type'] | UserNotification['type'];
  displayName: UserInfo['displayName'];
  comparison: UserComparison;
  eventKey: number;
};

export type UserEventState = UserEvent[];

export const INITIAL_USER_EVENT_STATE: UserEventState = [];
