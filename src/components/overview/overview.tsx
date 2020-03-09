import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { OverviewAll } from './all/overviewAll';
import { OverviewFriends } from './friends/overviewFriends';

import './overview.scss';
import { OverviewProfile } from './profile/profile';

export const Overview: FC = () => {
  return (
    <div className="overview-component">
      <Switch>
        <Route exact path="/overview">
          <OverviewAll />
        </Route>
        <Route path="/overview/friends">
          <OverviewFriends />
        </Route>
        <Route path="/overview/favorites">
          <OverviewFriends />
        </Route>
        <Route path="/overview/avatars">
          <OverviewFriends />
        </Route>
        <Route path="/overview/profile">
          <OverviewProfile />
        </Route>
        <Route path="/overview/moderation">
          <OverviewProfile />
        </Route>
      </Switch>
    </div>
  );
};
