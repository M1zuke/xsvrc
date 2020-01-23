import React, { FC, useState } from 'react';

import './avatarInfo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvatarThumbnailImageUrl, selectUserInfo } from '../../../../store/user/selectors';
import { Table, TableConfig } from '../../../utils/table/table';
import { selectAvatarId, selectAvatarInfo } from '../../../../store/avatar/selectors';
import { getAvatarInfo } from '../../../../services/vrc-api.service';
import { updateAvatarInfo } from '../../../../store/avatar/actions';
import { Loading } from '../../../loading/loading';

interface AvatarInfoState {
  avatarInfoFetched: boolean;
}


export const AvatarInfo: FC = () => {

  const { currentAvatar } = useSelector(selectUserInfo);
  const avatarId = useSelector(selectAvatarId);

  const [state, setState] = useState<AvatarInfoState>({
    avatarInfoFetched: currentAvatar === avatarId,
  });
  const backgroundUrl: string | undefined = useSelector(selectAvatarThumbnailImageUrl);

  const dispatch = useDispatch();
  const { authorName, name, description, version, releaseStatus } = useSelector(selectAvatarInfo);

  console.log(avatarId);

  if (currentAvatar && avatarId !== currentAvatar) {
    getAvatarInfo(currentAvatar).then((avatarInfo: AvatarInfo) => {
      dispatch(updateAvatarInfo(avatarInfo));
      console.log(avatarInfo);
      setState({ avatarInfoFetched: true });
    });
  }

  const tableConfig: TableConfig = {
    header: [],
    data: [
      {
        name: 'Avatar ID',
        value: currentAvatar,
        actions: [],
        separate: true,
      },
      {
        name: 'Name',
        value: name,
        actions: [],
      },
      {
        name: 'Author',
        value: authorName,
        actions: [],
      },
      {
        name: 'Description',
        value: description,
        actions: [],
      },
      {
        name: 'Availability',
        value: releaseStatus,
        actions: [],
        separate: true,
      },
      {
        name: 'Avatar version',
        value: `${ version }`, // conversion to string
        actions: [],
      },
    ],
  };

  return (
      <div className="avatar-info-component">
        <h2 className="avatar-info-title">Avatar Info</h2>
        <div className="avatar-image" style={ { backgroundImage: `url('${ backgroundUrl }')` } } />
        <div className="avatar-info">
          <div className={ `loading-overlay ${ state.avatarInfoFetched ? 'hidden' : '' }` }>
            <Loading />
            Fetching avatar info..
          </div>
          <Table config={ tableConfig } />
        </div>
      </div>
  );
};
