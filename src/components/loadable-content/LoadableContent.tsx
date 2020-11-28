import React, { ReactElement, ReactNode, useMemo } from 'react';
import { isLoaded } from '../../api/prepare';
import { messages } from '../../i18n/en';
import { Loadable } from '../../store/reducer';
import { Loading } from '../loading/Loading';
import styles from './LoadableContent.module.scss';

type LoadableContentProps<T> = {
  data: Loadable<T>;
  children: (data: T) => ReactNode;
  rows?: number;
  columns?: number;
  loading?: boolean;
};

export function LoadableContent<T>({ data, children, rows, columns, loading }: LoadableContentProps<T>): ReactElement {
  const style = useMemo(() => {
    const gridRowEnd = rows ? { gridRowEnd: `span ${rows}` } : {};
    const gridColumnEnd = columns ? { gridColumnEnd: `span ${columns}` } : {};
    return { ...gridRowEnd, ...gridColumnEnd };
  }, [columns, rows]);

  if (data === 'loading' || loading) {
    return (
      <div className={styles.Loading} style={style}>
        <Loading />
      </div>
    );
  }

  if (!isLoaded(data)) {
    return (
      <div className={styles.Loading} style={style}>
        {messages.Views.Error.NoData}
      </div>
    );
  }
  return <>{children(data)}</>;
}
