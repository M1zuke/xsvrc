export const messages = {
  Application: {
    Title: 'XSVRC - Manage your VRC',
  },
  Views: {
    Settings: {
      Title: 'Settings',
    },
    WorldDetail: {
      NotFound: 'World got removed',
      InstanceId: (id: string): string => `Instance: ${id}`,
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
        invites: 'Invites',
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
      ToolTip: {
        LoggedTroughWebsite: 'Logged in through Website',
      },
    },
  },
};
