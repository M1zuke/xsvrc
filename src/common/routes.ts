export type RouteDefinition = {
  config: {
    path: string;
    exact?: boolean;
  };
  path: string;
};

export type Routes = {
  home: RouteDefinition;
  login: RouteDefinition;
  friends: RouteDefinition;
  eventList: RouteDefinition;
  notifications: RouteDefinition;
  settings: RouteDefinition;
  moderation: RouteDefinition;
  avatar: RouteDefinition;
  userSearch: RouteDefinition;
  transactions: RouteDefinition;
};

export const routes: Routes = {
  home: { path: '/', config: { path: '/', exact: true } },
  login: { path: '/login', config: { path: '/login', exact: true } },
  friends: { path: '/friends', config: { path: '/friends', exact: true } },
  eventList: { path: '/user-event-list', config: { path: '/user-event-list', exact: true } },
  notifications: { path: '/notifications', config: { path: '/notifications', exact: true } },
  settings: { path: '/settings', config: { path: '/settings', exact: true } },
  moderation: { path: '/moderation', config: { path: '/moderation', exact: true } },
  avatar: { path: '/avatar', config: { path: '/avatar', exact: true } },
  userSearch: { path: '/user-search', config: { path: '/user-search', exact: true } },
  transactions: { path: '/transactions', config: { path: '/transactions', exact: true } },
};
