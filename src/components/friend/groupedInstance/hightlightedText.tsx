import React, { FC } from 'react';
import './highlightedText.scss';

interface ShortFriendInfoProps {
  friendInfo?: FriendInfo;
  owner?: boolean;
}

export const HightlightedText: FC<ShortFriendInfoProps> = (props) => {
  return (
    <>
      {props.friendInfo ? (
        <div className={`highlighted-text ${props.owner ? 'important' : ''}`}>
          {props.friendInfo.displayName}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
