import React, { ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AvatarInfo } from '../../../api/types';
import { useApi } from '../../../api/use-api';
import { Content } from '../../../components/content/Content';
import { LoadableContent } from '../../../components/loadable-content/LoadableContent';
import { ScrollableContent } from '../../../components/scrollable-content/ScrollableContent';
import { selectAvatars } from '../../../store/user/selectors';
import { TitleBox } from '../home/TitleBox';
import { AvatarItem } from './AvatarItem';
import styles from './Avatars.module.scss';

type AvatarsInnerProps = {
  avatars: AvatarInfo[];
};

function AvatarsInner({ avatars }: AvatarsInnerProps): ReactElement {
  const elements = useMemo(() => {
    return avatars.map((item) => <AvatarItem key={`AvatarItem-${item.id}`} avatarInfo={item} />);
  }, [avatars]);

  return <ScrollableContent innerClassName={styles.AvatarList}>{elements}</ScrollableContent>;
}

export function Avatars(): ReactElement {
  const avatars = useSelector(selectAvatars);
  const { getAllAvatars } = useApi();

  useEffect(() => {
    getAllAvatars().finally();
  }, [getAllAvatars]);

  return (
    <Content translucent noPadding className={styles.Avatars}>
      <TitleBox title="Avatars" />
      <LoadableContent data={avatars}>{(data) => <AvatarsInner avatars={data} />}</LoadableContent>
    </Content>
  );
}
