import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GroupedByInstanceService } from '../../../services/groupedByInstance.service';
import { containsBeginningChar, containsChar, sort } from '../../../services/utils.service';
import { fetchAllOnlineFriends } from '../../../services/vrc-api.service';
import { updateFriendInfos } from '../../../store/friends/actions';
import {
  selectFriendInfo,
  selectFriendInfoFetched,
  selectFriendInfoLastFetched,
} from '../../../store/friends/selectors';
import { BackButton } from '../../common/backButton';
import { GroupedInstance } from '../../friend/groupedInstance/groupedInstance';
import { TextInput } from '../../utils/inputs/textInput';

import './overviewFriends.scss';

interface OverviewFriendsState {
  friendsFetching: boolean;
  selectedFilter: string | undefined;
  specialFilters: string[];
  sorted: boolean;
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
    specialFilters: [],
    sorted: false,
  });

  let filteredInfos: FriendInfo[] = friendInfos;

  if (!state.sorted) {
    filteredInfos = sort(friendInfos, 'displayName');
    setState(prevState => ({
      ...prevState,
      sorted: true,
    }));
  }

  if (state.selectedFilter) {
    filteredInfos = friendInfos.filter((item) => containsChar(state.selectedFilter!, item.displayName[0]));
  }

  const getFriends = useCallback(() => {
    fetchAllOnlineFriends((friendInfo: FriendInfo[]) => {
      dispatch(updateFriendInfos(friendInfo));
      setState(current => ({
        ...current,
        friendsFetching: false,
        sorted: false,
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

  if (!state.friendsFetching && (!friendInfoFetched || +new Date() - 30000) > +lastFetched) {
    setState(current => ({
      ...current,
      friendsFetching: true,
    }));
    getFriends();
  }

  const service = new GroupedByInstanceService(friendInfos);
  const groupedArray = service.get();

  const smallFriendInfo = (friendInfos: FriendInfo[]) => {
    return friendInfos.map((friendInfo, i) => {
      return (
        <div key={`smallFriendInfo-${i}`} className='small-friend-info'>
          {friendInfo.displayName}
        </div>
      );
    });
  };

  const groupedFriendList = () => {
    if (groupedArray.length > 0) {
      return groupedArray.map((groupedInstance, i) => {
        return <GroupedInstance key={`grouped-instance-overview-${i}`} groupedInstance={groupedInstance} />;
      });
    }
    return (
      <div className='no-friends-in-public-together'>
        There are no friends of yours together in one instance. At least not in a public lobby.
      </div>
    );

  };

  const friendList = () => {
    return filteredInfos.map((friendInfo: FriendInfo, index: number) => {
      return (
        <div key={index} className='friend-entry'>
          <div className='avatar-thumbnail'
               style={{backgroundImage: `url(${friendInfo.currentAvatarThumbnailImageUrl})`}} />


          <div className='top-right-info'>
            {friendInfo.status === 'ask me' && friendInfo.location === 'private' ?
              <div className='is-on-ask-me'>Ask me</div> : <></>
            }
            {friendInfo.location === 'private' && friendInfo.status === 'active' ? (
              <div className="is-in-private-world">Private</div>
            ) : <></>}
          </div>


          <div className='friend-username'>{friendInfo.displayName}</div>
        </div>
      );
    });
  };

  const filterButtons = () => {
    const mappedFriendsDisplayNames: string[] = friendInfos.map((fi) => fi.displayName);
    return charArray.map((key: string) => {
      const selected: boolean = state.selectedFilter === key;

      if (containsBeginningChar(key, mappedFriendsDisplayNames)) {
        return (
          <div key={`filterBtn-${key}`}
               className={`filter-btn ${selected ? 'selected' : ''}`}
               onClick={() => selectFilter(key)}
               title={`Show only beginning with \'${key}\'`}>
            {key}
          </div>
        );
      }
      return (
        <div key={`filterBtn-${key}`}
             id={key}
             className='filter-btn disabled'>
          {key}
        </div>
      );
    });
  };

  const onUsernameFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //setState()
  }, []);

  return (
    <div className="overview-friends-component">
      <BackButton />
      <div className="online-friend-list-title">
        <h2>Online friends: {friendInfos.length} online</h2>
      </div>
      <div className="online-friends-list-wrapper">
        <div className="specialFilters">
          <div className='filter-btn tooltip'
               title='Group by online instance'
               onClick={() => selectFilter('groupedByInstance')}>
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>
          <div className='search-for-name'>
            <TextInput placeholder='Search by username..' onchange={onUsernameFilterChange} />
          </div>
        </div>
        <div className='filter-container'>
          <div key={`filterBtn-all`}
               className={`filter-btn tooltip ${state.selectedFilter === undefined ? 'selected' : ''}`}
               title='Show all online players'
               onClick={() => selectFilter('All')}>
            All
          </div>
          {filterButtons()}
        </div>
        <div className="online-friends-list">

          {
            state.selectedFilter !== 'groupedByInstance' ?
              (
                <div className="friend-list-padded scrollable-content">
                  {friendList()}
                </div>
              ) :
              (
                <div className='grouped-list-padded scrollable-content'>
                  {groupedFriendList()}
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};
