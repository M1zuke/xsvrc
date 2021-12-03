import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { HardModerationTypes, Moderation, ModerationTypes } from '../../../api/types';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { Content } from '../../../components/content/Content';
import { Pagination } from '../../../components/pagination/Pagination';
import { GetSortedModerations } from '../../../store/user/selectors';
import { TitleBox } from '../home/TitleBox';
import { ModerationItem } from './moderation-item/ModerationItem';
import styles from './Moderations.module.scss';

const PageSize = 50;

type FilterTypes = Moderation['type'] | 'all';

export function Moderations(): ReactElement {
  const allModerations = useSelector(GetSortedModerations);
  const { getAllModerations } = useApi();
  const [typeFilter, setTypeFilter] = useState<FilterTypes>('all');

  const renderedFilters = useMemo(() => {
    return ['all', ...ModerationTypes, ...HardModerationTypes].map((type) => {
      return (
        <Button
          key={`rendered-filter-button-${type}`}
          onClick={() => setTypeFilter(type as FilterTypes)}
          active={type === typeFilter}
          disabled={true}
        >
          {type}
        </Button>
      );
    });
  }, [typeFilter]);

  const renderedModerations = useMemo(
    () =>
      Object.keys(allModerations).map((id) => (
        <ModerationItem key={`moderation-item-${id}`} moderations={allModerations[id]} />
      )),
    [allModerations],
  );
  // const handleShowOnlyHardModerationsSwap = useCallback(
  //   (value: boolean) => {
  //     if (
  //       value &&
  //       typeFilter !== 'all' &&
  //       (typeFilter === 'showAvatar' || typeFilter === 'unmute' || typeFilter === 'unblock')
  //     ) {
  //       setTypeFilter('all');
  //     }
  //   },
  //   [typeFilter],
  // );

  useEffect(() => {
    getAllModerations().finally();
  }, [getAllModerations]);

  return (
    <Content translucent noPadding className={styles.Moderations}>
      <TitleBox title="Moderations">
        <div className={styles.Filter}>
          <div className={styles.Title}>{`${allModerations.length} moderations`}</div>
          <div className={styles.TypeFilter}>{renderedFilters}</div>
          <div />
          <div className={styles.SpecialFilter}>
            {/*<Checkbox*/}
            {/*  onChange={handleShowOnlyHardModerationsSwap}*/}
            {/*  label="show only hard moderations"*/}
            {/*  value={showOnlyHardModerations}*/}
            {/*/>*/}
          </div>
        </div>
      </TitleBox>
      <Pagination data={renderedModerations} pageSize={PageSize}>
        {(data) => data}
      </Pagination>
    </Content>
  );
}
