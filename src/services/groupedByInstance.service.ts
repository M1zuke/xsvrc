export interface AnalysedLocation {
  ownerId?: string;
  worldId?: string;
  worldInstanceId?: string;
  nonce?: string; // unclear what it is
  fullLocationString: string;
}

export interface GroupedInstance {
  analysedLocation: AnalysedLocation;
  owner: FriendInfo | undefined;
  others: FriendInfo[];
}

//                                            InstanceId
//  worldId                                         OwnerId                                          Unknown :thinking:
// "wrld_e9a31011-8401-4b72-af0f-0d7595328c0c:75435~hidden(usr_56ac3068-37f4-4e7d-be08-64de38886d16)~nonce(2BB9E974D9E3073E475DEECEFB504305E0AD730D13EC7276F501998DA1CAEC24)"

export class GroupedByInstanceService {
  private groupedArray: GroupedInstance[] = [];

  constructor(friendInfo: FriendInfo[]) {
    this.processFriendList(friendInfo);
  }

  public static filterOutPrivatePeople(friendInfo: FriendInfo[]): FriendInfo[] {
    return friendInfo.filter((friendInfo: FriendInfo) => friendInfo.location !== 'private');
  }

  public get(): GroupedInstance[] {
    return this.groupedArray;
  }

  private init(): void {
    this.groupedArray = [];
  }

  private current(): GroupedInstance {
    const length = this.groupedArray.length;
    return this.groupedArray[length - 1];
  }

  private analyseLocation(location: string): AnalysedLocation {

    const splitBySpecialAdditions: string[] = location.split('~');
    const [worldId, worldInstanceId] = splitBySpecialAdditions[0].split(':');

    let ownerId: string = '';
    let nonce: string = '';

    if (splitBySpecialAdditions[1]) {
      const id = splitBySpecialAdditions[1].match(/usr_(\w*)-(\w*)-(\w*)-(\w*)-(\w*)/g);
      if (id) {
        ownerId = id[0];
      } else {
        // fallback if the match does not work or the user has a very old UserId which does not match the pattern.
        // removing "hidden(...)" from string.
        ownerId = splitBySpecialAdditions[1].substr(7, splitBySpecialAdditions[1].length - 8);
      }
    }

    if (splitBySpecialAdditions[2]) {
      nonce = splitBySpecialAdditions[2].substr(6, splitBySpecialAdditions[2].length - 7);
    }


    return {
      fullLocationString: location,
      worldId,
      worldInstanceId,
      ownerId,
      nonce,
    };
  }

  private processFriendList(friendInfos: FriendInfo[]): void {
    this.init();
    const noReferenceFriendsInfo: FriendInfo[] = [...friendInfos];

    const filterOutPrivateLocations = GroupedByInstanceService.filterOutPrivatePeople(noReferenceFriendsInfo);

    this.groupByInstance(filterOutPrivateLocations, () => {
      this.groupedArray.forEach((groupedInstance: GroupedInstance) => {
        groupedInstance.analysedLocation = this.analyseLocation(groupedInstance.analysedLocation.fullLocationString);
        groupedInstance.owner = this.getOwnerInfoFromCache(groupedInstance.analysedLocation.ownerId, friendInfos);
      });
      console.log('groupedArray', this.groupedArray);
    });
  }

  private groupByInstance(friendInfos: FriendInfo[], groupingFinished: () => void): void {
    const currentUser = friendInfos.shift();
    if (currentUser) {
      const tempGroupedInstance: GroupedInstance = {
        analysedLocation: {fullLocationString: currentUser.location},
        owner: undefined,
        others: [],
      };
      const playerInSameInstance = friendInfos.filter((friendInfo: FriendInfo) => {
        return friendInfo.location === currentUser.location;
      });
      friendInfos = friendInfos.filter((friendInfos: FriendInfo) => {
        return friendInfos.location !== currentUser.location;
      });
      if (playerInSameInstance.length > 0) {
        tempGroupedInstance.others = [currentUser, ...playerInSameInstance];
        this.groupedArray.push(tempGroupedInstance);
      }
      this.groupByInstance(friendInfos, groupingFinished);
    } else {
      groupingFinished();
    }
  }

  private getOwnerInfoFromCache(userId: string | undefined, friendInfos: FriendInfo[]): FriendInfo | undefined {
    return friendInfos.find((item) => item.id === userId);
  }
}
