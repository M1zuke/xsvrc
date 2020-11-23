export type RouteDefinition<T = undefined> = {
  path: string;
  exact?: boolean;
  breadCrumbIgnore?: boolean;
};

export type Routes = {
  home: RouteDefinition;
  login: RouteDefinition;
  friends: RouteDefinition;
};

export const routes: Routes = {
  home: { path: '/', exact: true },
  login: { path: '/login', exact: true },
  friends: { path: '/friends', exact: true },
};
