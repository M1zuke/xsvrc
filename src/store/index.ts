import { VRCApiInfo } from './api-info/state';
import { CookieState } from './cookies/state';
import { FriendInfoState } from './friends/state';
import { Loadable } from './reducer';
import { VRCUserState } from './user/state';
import { ViewState } from './view/state';

export interface AppState {
  userInfo: VRCUserState;
  apiInfo: Loadable<VRCApiInfo>;
  view: ViewState;
  cookies: CookieState;
  friends: FriendInfoState;
}
