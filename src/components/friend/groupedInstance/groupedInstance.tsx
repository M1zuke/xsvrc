import React, { FC, useState } from 'react';
import { GroupedInstance as IGroupedInstance } from '../../../services/groupedByInstance.service';
import { fetchWorldInfo, fetchWorldInstance } from '../../../services/vrc-api.service';
import { Loading } from '../../loading/loading';
import './groupedInstance.scss';
import { HightlightedText } from './hightlightedText';

interface GroupedInstanceProps {
  groupedInstance: IGroupedInstance;
}

interface GroupedInstanceState {
  worldInfo: WorldInfo | undefined;
  instanceInfo: InstanceInfo | undefined;
  lastFetch: Date;
}

export const GroupedInstance: FC<GroupedInstanceProps> = (props) => {

  const [state, setState] = useState<GroupedInstanceState>({
    worldInfo: undefined,
    instanceInfo: undefined,
    lastFetch: new Date(),
  });

  // Fetch only if lastFetch was 30 seconds ago.
  if (+new Date() - 30000 > +state.lastFetch || !state.instanceInfo) {
    if (props.groupedInstance.analysedLocation.worldId) {
      fetchWorldInfo(props.groupedInstance.analysedLocation.worldId).then((worldInfo) => {
        fetchWorldInstance(props.groupedInstance.analysedLocation).then((instanceInfo) => {
          console.log('worldInfo', worldInfo, 'instanceInfo', instanceInfo);
          setState({
            worldInfo: worldInfo,
            instanceInfo: instanceInfo,
            lastFetch: new Date(),
          });
        });
      });
    }
  }

  const allFriendsInThisInstance = props.groupedInstance.others.map((friendInfo, i) => {
    return <HightlightedText key={`short-friend-info-${i}`} friendInfo={friendInfo} />;
  });


  const worldBackground = {
    backgroundImage: `url('${state.worldInfo?.thumbnailImageUrl}')`,
  };

  return (
    <div className='grouped-instance'>
      <div className='grouped-instance-content'>
        {
          state.worldInfo && state.instanceInfo ? (
            <div className='grouped-instance-info'>
              <div className='owner-info'>
                <HightlightedText friendInfo={props.groupedInstance.owner} owner />
              </div>
              <div className='world-thumbnail' style={worldBackground} />
              <div className='world-info'>
                <div className='world-name'>
                  {state.worldInfo?.name.slice(0, 35)}
                </div>
                <div className='grouped-instance-friend-info'>
                  {allFriendsInThisInstance}
                  <br style={{clear: 'both'}} />
                </div>
              </div>
            </div>
          ) : (
            <div className='loading-container'>
              <Loading />
            </div>
          )
        }
      </div>
    </div>
  );
};
