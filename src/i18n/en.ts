import { SettingsState } from '../store/persisted/state';

const Type = {
  hidden: 'Friends +',
  public: 'Public',
  friends: 'Friends Only',
  'private-plus': 'Invite+',
  private: 'Private',
  unknown: '',
};

const Format = {
  FullDate:
    (settings: SettingsState) =>
    (value?: number | string): string => {
      if (value) {
        const date = new Date(value);

        return Intl.DateTimeFormat(settings.localization, {
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hourCycle: settings.use12hours ? 'h12' : 'h23',
        }).format(date);
      }
      return '';
    },
};

export const messages = {
  Format,
  AssignToFavoriteDialog: {
    Header: 'Assign to one of your Groups',
    Content: 'Group:',
    Footer: {
      Confirm: 'Confirm',
      Cancel: 'Cancel',
    },
  },
  EditAvatarDialog: {
    Save: 'Save',
    Cancel: 'Cancel',
  },
  ConfirmDialog: {
    Confirm: 'Confirm',
    Cancel: 'Cancel',
  },
  Application: {
    UpdateAvailable: 'Update',
    Title: 'XSVRC - Manage your VRC',
  },
  Views: {
    Moderations: {
      ConfirmBlockTitle: (username: string) => `Block user ${username}?`,
      ConfirmBodyMessage: (username: string): string => `Do you really wanna block the user "${username}"?`,
    },
    UserCard: {
      ConfirmMessages: {
        ConfirmRemoveFavorite: {
          Title: (name: string): string => `Remove favorite of ${name}?`,
          Body: (name: string, group: string): string =>
            `Do you really want to remove ${name} from the group "${group}"?`,
        },
        ConfirmUnfriend: {
          Title: (name: string): string => `Unfriend ${name}?`,
          Body: 'Do you really want to unfriend this person?',
        },
      },
      Rank: 'User rank:',
      UserInteractions: {
        Befriend: 'Send friend request',
        Unfriend: 'Remove friend',
      },
    },
    UserEventList: {
      Title: 'Event-list',
      SearchUsername: 'Search Username',
    },
    Settings: {
      Title: 'Settings',
      Localization: 'Localization',
      Label: {
        localization: 'Language:',
        use12hours: 'Use 12 hours clock:',
      } as Record<keyof SettingsState, string>,
    },
    WorldDetail: {
      NotFound: 'World got removed',
      InstanceId: (id: string): string => `Instance: ${id}`,
      PeopleInInstance: (n_user: number): string =>
        n_user === 0 ? '1 person in this instance' : `${n_user} persons in this instance`,
      InstanceCapacity: (n_user: number, capacity: number): string => `${n_user}/${capacity}`,
      Type,
      lastPlatform: {
        standalonewindows: 'PC',
        android: 'Oculus',
      },
    },
    Notifications: {
      Message: {
        Invite: 'invited you to',
        RequestInvite: 'wants to join you',
        FriendRequest: 'wants to be your friend',
      },
      Filter: {
        All: 'All',
        Invites: 'Invites',
        FriendRequests: 'Friend requests',
        RequestInvites: 'Requested invites',
      },
    },
    Dashboard: {
      Friends: {
        Online: 'Friends online',
        FriendRequests: 'Friend requests',
        Invites: 'Invites',
      },
    },
    Pagination: {
      Of: 'Of',
    },
    Error: {
      NoData: 'No Entry Found',
    },
    Login: {
      Title: 'Login',
      View: {
        Login: 'Login',
        Username: 'Username',
        Password: 'Password',
      },
    },
    Friends: {
      ShowPrivate: 'Show Private',
      ShowOffline: 'Show Offline',
      ShowPeopleOnlineInWebsite: 'Show people online over website',
      Title: 'Friends',
      FriendsOnline: 'Friends online',
    },
    FriendsProfile: {
      Tabs: {
        Overview: 'Overview',
        Instance: (amount: number): string => `Instance (${amount})`,
        History: 'History',
        JSON: 'JSON',
      },
      NotFound: 'User not Found',
      ShortInfo: {
        UserId: 'User ID:',
        LastLogin: 'Last Login:',
      },
      Actions: {
        AddFriend: 'Add Friend',
        Unfriend: 'Unfriend',
      },
    },
    FriendsOverview: {
      LoggedTroughWebsite: 'Logged in through Website',
    },
    SameInstance: {
      PeopleInSameInstance: (value: number): string =>
        value === 1 ? '1 friend in this instance' : `${value} friends in this instance`,
    },
  },
};
