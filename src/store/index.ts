import { VRCApiInfo } from './api-info/state';
import { FriendInfoState } from './friends/state';
import { HistoryState } from './history/state';
import { PersistedState } from './persisted/state';
import { Loadable } from './reducer';
import { UserEventState } from './user-events/state';
import { UserState } from './user/state';
import { ViewState } from './view/state';
import { WorldsState } from './worlds/state';

export interface AppState {
  user: UserState;
  apiInfo: Loadable<VRCApiInfo>;
  view: ViewState;
  persisted: PersistedState;
  friends: FriendInfoState;
  userEvents: UserEventState;
  worlds: WorldsState;
  history: HistoryState;
}
