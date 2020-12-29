import { VRCApiInfo } from './api-info/state';
import { CookieState } from './cookies/state';
import { FriendInfoState } from './friends/state';
import { Loadable } from './reducer';
import { UserEventState } from './user-events/state';
import { UserState } from './user/state';
import { ViewState } from './view/state';

export interface AppState {
  user: UserState;
  apiInfo: Loadable<VRCApiInfo>;
  view: ViewState;
  cookies: CookieState;
  friends: FriendInfoState;
  userEvents: UserEventState;
}
