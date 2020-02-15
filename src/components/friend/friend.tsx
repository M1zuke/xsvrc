import React, { FC } from 'react';

interface FriendProps {
  friendInfo: FriendInfo;
}

export const Friend: FC<FriendProps> = (props: FriendProps) => {
  const style = { backgroundImage: `url(${ props.friendInfo.currentAvatarThumbnailImageUrl })` };

  return (
      <div className="friend-entry">
        <div className="avatar-thumbnail" style={ style } />
        {
          props.friendInfo.location === 'private' ?
              (
                  <div className="is-in-private-world">
                    Private
                  </div>
              )
              : <></>
        }
        <div className="friend-username"> { props.friendInfo.displayName }</div>
      </div>
  );
};
