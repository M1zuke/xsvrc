export type RouteDefinition = {
  config: {
    path: string;
    exact?: boolean;
  };
  path: string;
  breadCrumbIgnore?: boolean;
};

export type Routes = {
  home: RouteDefinition;
  login: RouteDefinition;
  friends: RouteDefinition;
  friendsProfile: RouteDefinition;
};

export const routes: Routes = {
  home: { path: '/', config: { path: '/', exact: true } },
  login: { path: '/login', config: { path: '/login', exact: true } },
  friends: { path: '/friends', config: { path: '/friends', exact: true } },
  friendsProfile: { path: '/friends-profile/', config: { path: '/friends-profile/:id', exact: true } },
};
