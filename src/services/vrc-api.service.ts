import { store } from '../store/store';
import { StoredCookie } from '../store/user/reducer';
import { AnalysedLocation } from './groupedByInstance.service';
import { electronFetch, RequestConfig } from './utils.service';


export const apiFetch = <T>(config: RequestConfig): Promise<T> => {
  config = ensureApiKey({...config});
  return electronFetch<T>(config);
};

export const ensureApiKey = (config: RequestConfig): RequestConfig => {
  const apiKey = store.getState().apiConfig.apiKey;
  if (apiKey) {
    if (!config.params) {
      config.params = [];
    }
    config.params.push({key: 'apiKey', value: apiKey});
  }
  return config;
};

export const loginUser = (username: string, password: string, storedCookies?: StoredCookie[]): Promise<UserInfo> => {
  return apiFetch<UserInfo>({
    storedCookies: storedCookies,
    url: 'https://api.vrchat.cloud/api/1/auth/user',
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    },
  });
};

export const getAvatarInfo = (id: string): Promise<AvatarInfo> => {
  return apiFetch<AvatarInfo>({
    url: `https://api.vrchat.cloud/api/1/avatars/${id}`,
    method: 'GET',
  });
};

export const fetchAllOnlineFriends = async (successCallback: (friendInfo: FriendInfo[]) => void, offset: number = 0, lastPageSize: number = 0, fetchedFriendInfo: FriendInfo[] = []) => {
  const fetchedInfo = await fetchOnlineFriends(offset);
  fetchedFriendInfo = [...fetchedFriendInfo, ...fetchedInfo];
  offset += 100;
  lastPageSize = fetchedInfo.length;
  if (lastPageSize === 100) {
    fetchAllOnlineFriends(successCallback, offset, lastPageSize, fetchedFriendInfo);
  } else {
    successCallback(fetchedFriendInfo);
  }
};

const fetchOnlineFriends = async (offset: number = 0) => {
  return await apiFetch<FriendInfo[]>({
    params: [
      {key: 'offset', value: offset.toString()},
      {key: 'n', value: '100'},
    ],
    url: 'https://api.vrchat.cloud/api/1/auth/user/friends',
    method: 'GET',
  });
};

export const fetchWorldInstance = async (analysedLocation: AnalysedLocation) => {
  return await apiFetch<InstanceInfo>({
    method: 'GET',
    url: `https://api.vrchat.cloud/api/1/worlds/${analysedLocation.worldId}/${analysedLocation.worldInstanceId}`,
  });
};

export const fetchWorldInfo = async (worldId: string) => {
  return await apiFetch<WorldInfo>({
    method: 'GET',
    url: `https://api.vrchat.cloud/api/1/worlds/${worldId}`,
  });
};
