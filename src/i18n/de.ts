import { SettingsState } from '../store/persisted/state';

const Type = {
  hidden: 'Freunde +',
  public: 'Öffentlich',
  friends: 'Nur Freunde',
  'private-plus': 'Privat+',
  private: 'Privat',
  unknown: '',
};

const Format = {
  FullDate:
    (settings: SettingsState) =>
    (value?: number | string): string => {
      console.log(value);
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
    Header: 'Zu einer deiner Gruppen hinzufügen',
    Content: 'Gruppe:',
    Footer: {
      Confirm: 'Bestätigen',
      Cancel: 'Abbrechen',
    },
  },
  EditAvatarDialog: {
    Save: 'Speichern',
    Cancel: 'Abbrechen',
  },
  ConfirmDialog: {
    Confirm: 'Bestätigen',
    Cancel: 'Abbrechen',
  },
  Application: {
    UpdateAvailable: 'Updaten',
    Title: 'XSVRC - Verwalte dein VRC',
  },
  Views: {
    Moderations: {
      ConfirmBlockTitle: (username: string) => `Benutzer ${username} blocken?`,
      ConfirmBodyMessage: (username: string): string => `Möchtest du wirklich den Benutzer "${username}" blocken?`,
    },
    UserCard: {
      ConfirmMessages: {
        ConfirmRemoveFavorite: {
          Title: (name: string): string => `${name} aus den Favoriten entfernen?`,
          Body: (name: string, group: string): string =>
            `Willst du wirklich ${name} aus deiner Gruppe "${group}" entfernen?`,
        },
        ConfirmUnfriend: {
          Title: (name: string): string => `Freundschaft mit ${name} zerstören?`,
          Body: 'Möchtest du wirklich diese Person als Freund verlieren?',
        },
      },
      Rank: 'Benutzerrank:',
      UserInteractions: {
        Befriend: 'Freundschaftsanfrage senden',
        Unfriend: 'Freundschaft zerstören',
      },
    },
    UserEventList: {
      Title: 'Event-list',
      SearchUsername: 'Nach Usernamen suchen',
    },
    Settings: {
      Title: 'Einstellungen',
      Localization: 'Lokalisierung',
      Label: {
        localization: 'Sprache:',
        use12hours: '12 Stunden Uhr benutzen:',
      } as Record<keyof SettingsState, string>,
    },
    WorldDetail: {
      NotFound: 'Die Welt wurde entfernt',
      InstanceId: (id: string): string => `Instanz: ${id}`,
      PeopleInInstance: (n_user: number): string =>
        n_user === 0 ? '1 Person in dieser Instanz' : `${n_user} Personen in dieser Instanz`,
      InstanceCapacity: (n_user: number, capacity: number): string => `${n_user}/${capacity}`,
      Type,
      lastPlatform: {
        standalonewindows: 'PC',
        android: 'Oculus',
      },
    },
    Notifications: {
      Message: {
        Invite: 'hat dich eingeladen zu',
        RequestInvite: 'möchte dir beitreten',
        FriendRequest: 'möchte dein Freund sein',
      },
      Filter: {
        All: 'Alle',
        Invites: 'Einladungen',
        FriendRequests: 'Freundschaftsanfragen',
        RequestInvites: 'Einladung angefragt',
      },
    },
    Dashboard: {
      Friends: {
        Online: 'Freunde online',
        FriendRequests: 'Freundschaftsanfragen',
        Invites: 'Einladungen',
      },
    },
    Pagination: {
      Of: 'von',
    },
    Error: {
      NoData: 'Keine Einträge gefunden',
    },
    Login: {
      Title: 'Einloggen',
      View: {
        Login: 'Einloggen',
        Username: 'Benutzername',
        Password: 'Passwort',
      },
    },
    Friends: {
      ShowPrivate: 'Zeige Private',
      ShowOffline: 'Zeige Offline',
      ShowPeopleOnlineInWebsite: 'Zeige Personen Online Über der Website',
      Title: 'Freunde',
      FriendsOnline: 'Freunde Online',
    },
    FriendsProfile: {
      Tabs: {
        Overview: 'Übersicht',
        Instance: (amount: number): string => `Instanz (${amount})`,
        History: 'Verlauf',
        JSON: 'JSON',
      },
      NotFound: 'Benutzer nicht gefunden',
      ShortInfo: {
        UserId: 'Benutzer-Nr.:',
        LastLogin: 'Letzer Login:',
      },
      Actions: {
        AddFriend: 'Freundschaftsanfrage senden',
        Unfriend: 'Freundschaft zerstören',
      },
    },
    FriendsOverview: {
      LoggedTroughWebsite: 'Logged in through Website',
    },
    SameInstance: {
      LoggedTroughWebsite: 'Logged in through Website',
      PeopleInSameInstance: (value: number): string =>
        value === 1 ? '1 friend in this instance' : `${value} friends in this instance`,
    },
  },
};
