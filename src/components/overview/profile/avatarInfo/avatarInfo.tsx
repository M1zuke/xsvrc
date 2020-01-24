import React, { FC, useCallback } from 'react';

import './avatarInfo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvatarThumbnailImageUrl, selectCurrentAvatar } from '../../../../store/user/selectors';
import { Table, TableConfig } from '../../../utils/table/table';
import { selectAvatarInfo, selectAvatarState } from '../../../../store/avatar/selectors';
import { setAvatarFetching, setAvatarNotFoundError, updateAvatarInfo } from '../../../../store/avatar/actions';
import { Loading } from '../../../loading/loading';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import { IconButton } from '../../../utils/buttons/iconButton';
import { getAvatarInfo } from '../../../../services/vrc-api.service';


export const AvatarInfo: FC = () => {

  const currentAvatar: string = useSelector(selectCurrentAvatar);
  const { avatarId, avatarInfoFetching, avatarNotFoundError } = useSelector(selectAvatarState);
  const { authorName, name, description, version, releaseStatus } = useSelector(selectAvatarInfo);
  const backgroundUrl: string | undefined = useSelector(selectAvatarThumbnailImageUrl);
  const dispatch = useDispatch();

  console.log('avatarInfoFetching', avatarInfoFetching);

  const fetchInfo = useCallback(() => {
    console.log('fetching');
    dispatch(setAvatarFetching());
    getAvatarInfo(currentAvatar).then((avatarInfo: AvatarInfo) => {
      dispatch(updateAvatarInfo(avatarInfo));
    }).catch(() => {
      dispatch(setAvatarNotFoundError(currentAvatar));
    });
  }, [dispatch, currentAvatar]);

  if (currentAvatar && (avatarId !== currentAvatar) && !avatarInfoFetching) {
    fetchInfo();
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
        <div className="avatar-info-title">
          <h2>Avatar Info</h2>
          <IconButton value={ faSyncAlt } onclick={ fetchInfo } rounded />
        </div>
        <div className="avatar-image" style={ { backgroundImage: `url('${ backgroundUrl }')` } } />
        <div className="avatar-info">
          <div className={ `loading-overlay ${ !avatarInfoFetching ? 'hidden' : '' }` }>
            <Loading />
            Fetching avatar info..
          </div>
          <div className={ `loading-overlay not-found-overlay ${ !avatarNotFoundError ? 'hidden' : '' }` }>
            <h3>The selected avatar was not found.</h3>
            The avatar probably got deleted from the owner.
          </div>
          <Table config={ tableConfig } />
        </div>
      </div>
  );
};
