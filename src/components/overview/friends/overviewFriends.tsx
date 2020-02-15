import { sortBy } from 'lodash';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { containsBeginningChar, containsChar } from '../../../services/utils.service';
import { fetchAllOnlineFriends } from '../../../services/vrc-api.service';
import { updateFriendInfos } from '../../../store/friends/actions';
import { selectFriendInfo, selectFriendInfoFetched, selectFriendInfoLastFetched } from '../../../store/friends/selectors';
import { BackButton } from '../../common/backButton';

import './overviewFriends.scss';
import { Friend } from '../../friend/friend';
import { GroupedByInstanceService } from '../../../services/groupedByInstance.service';

interface OverviewFriendsState {
  friendsFetching: boolean;
  selectedFilter: string | undefined;
}

const charArray: string[] = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const OverviewFriends: FC = () => {

      const dispatch = useDispatch();
      const friendInfos: FriendInfo[] = useSelector(selectFriendInfo);
      const friendInfoFetched: boolean = useSelector(selectFriendInfoFetched);
      const lastFetched: Date = useSelector(selectFriendInfoLastFetched);
      const [state, setState] = useState<OverviewFriendsState>({
        friendsFetching: false,
        selectedFilter: undefined,
      });


      let filteredInfos = friendInfos;

      if (state.selectedFilter) {
        filteredInfos = friendInfos.filter((item) => {
          return containsChar(state.selectedFilter!, item.displayName[0]);
        });
        filteredInfos = sortBy(filteredInfos, (o) => o.displayName);
      } else {
      }

      const getFriends = useCallback(() => {
        fetchAllOnlineFriends((friendInfo: FriendInfo[]) => {
          dispatch(updateFriendInfos(friendInfo));
          setState(current => ({
            ...current,
            friendsFetching: false,
          }));
        });
      }, [dispatch]);

      const selectFilter = useCallback((filterItem: string | undefined) => {
        console.log(filterItem);
        if (filterItem === 'All') {
          filterItem = undefined;
        }
        setState(current => ({
          ...current,
          selectedFilter: filterItem,
        }));
      }, []);

      if (!state.friendsFetching && (!friendInfoFetched || +new Date() - 60000) > +lastFetched) {
        setState(current => ({
          ...current,
          friendsFetching: true,
        }));
        getFriends();
      }

      const friendList = () => {
        return filteredInfos.map((friendInfo: FriendInfo, index: number) => <Friend key={ `renderedFriend-${ index }` } friendInfo={ friendInfo } />);
      };


      const service = new GroupedByInstanceService(friendInfos);

      const filterButtons = () => {
        const mappedFriendsDisplayNames: string[] = friendInfos.map((fi) => fi.displayName);
        return charArray.map((key: string) => {
          if (containsBeginningChar(key, mappedFriendsDisplayNames)) {
            return (
                <div key={ `filterBtn-${ key }` }
                     className="filter-btn"
                     onClick={ () => selectFilter(key) }>
                  { key }
                </div>
            );
          }
          return (
              <div key={ `filterBtn-${ key }` }
                   id={ key }
                   className="filter-btn disabled">
                { key }
              </div>
          );
        });
      };

      return (
          <div className="overview-friends-component">
            <BackButton />
            <div className="online-friend-list-title">
              <h2>Online friends</h2>
            </div>
            <div className="online-friends-list-wrapper">
              <div className="filter-container">
                <div key={ `filterBtn-all` } className="filter-btn" onClick={ () => selectFilter('All') }>All</div>
                { filterButtons() }
              </div>
              <div className="online-friends-list scrollable-content">
                { friendList() }
              </div>
            </div>
          </div>
      );
    }
;
