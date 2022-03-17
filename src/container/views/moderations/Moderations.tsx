import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { HardModerationTypes, Moderation, ModerationTypes } from '../../../api/types';
import { useApi } from '../../../api/use-api';
import { Button } from '../../../components/button/Button';
import { Content } from '../../../components/content/Content';
import { Pagination } from '../../../components/pagination/Pagination';
import { GetModerations, mapModerations } from '../../../store/user/selectors';
import { TitleBox } from '../home/TitleBox';
import { ModerationItem } from './moderation-item/ModerationItem';
import styles from './Moderations.module.scss';

const PageSize = 50;

type FilterTypes = Moderation['type'] | 'all';

export function Moderations(): ReactElement {
  const allModerations = useSelector(GetModerations);
  const { getAllModerations } = useApi();
  const [typeFilter, setTypeFilter] = useState<FilterTypes>('all');

  const renderedFilters = useMemo(() => {
    return ['all', ...ModerationTypes, ...HardModerationTypes].map((type) => {
      return (
        <Button
          key={`rendered-filter-button-${type}`}
          onClick={() => setTypeFilter(type as FilterTypes)}
          active={type === typeFilter}
        >
          {type}
        </Button>
      );
    });
  }, [typeFilter]);

  const renderedModerations = useMemo(() => {
    const filteredModerations =
      typeFilter === 'all' ? allModerations : allModerations.filter((m) => m.type === typeFilter);
    const mappedModerations = mapModerations(filteredModerations);
    return mappedModerations.map((moderation) => (
      <ModerationItem key={`moderation-item-${moderation.targetUserId}`} moderation={moderation} />
    ));
  }, [allModerations, typeFilter]);

  const gridStyle = useCallback(
    (data) => ({
      gridTemplateRows: `repeat(${data.length}, minmax(min-content, max-content))`,
    }),
    [],
  );

  useEffect(() => {
    getAllModerations().finally();
  }, [getAllModerations]);

  return (
    <Content translucent noPadding className={styles.Moderations}>
      <TitleBox title="Moderations">
        <div className={styles.Filter}>
          <div className={styles.Title}>{`${renderedModerations.length} moderations`}</div>
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
        {(data) => (
          <div className={styles.ModerationItems} style={gridStyle(data)}>
            {data}
          </div>
        )}
      </Pagination>
    </Content>
  );
}
