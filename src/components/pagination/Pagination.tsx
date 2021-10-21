import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, {
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useMessages } from '../../i18n';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './Pagination.module.scss';

export type PaginationProps<T> = {
  data: T[];
  page?: 'first' | 'last' | number;
  pageSize: number;
  onPageChange?: (pageStart: number) => void;
  children: (data: T[]) => ReactNode;
} & {
  controlsRef?: Ref<PaginationControls<T>>;
};

export type PaginationControls<T> = {
  goToItem: (item: T) => void;
  goToPage: (page: 'first' | 'last' | number) => void;
};

function pageOf<T>(data: T[], item: T | undefined, pageSize: number): number {
  const index = item === undefined ? -1 : data.indexOf(item) + 1;
  return index !== -1 ? Math.ceil(index / pageSize) : 1;
}

export function Pagination<T>({
  data,
  pageSize,
  children,
  onPageChange,
  controlsRef,
}: PaginationProps<T>): ReactElement {
  const { Of } = useMessages().Views.Pagination;
  const [page, setPage] = useState(1);
  const pageBegin = useCallback((page: number) => pageSize * (page - 1), [pageSize]);

  const pageCount = Math.max(Math.ceil(data.length / pageSize), 1);
  const pageEnd = Math.min(pageBegin(page) + pageSize, data.length);
  const isLastPage = page >= pageCount;
  const isFirstPage = page <= 1;

  const setFirstPage = useCallback(() => {
    setPage(1);
    onPageChange && onPageChange(pageBegin(1));
  }, [onPageChange, pageBegin]);
  const setLastPage = useCallback(() => {
    setPage(pageCount);
    onPageChange && onPageChange(pageBegin(pageCount));
  }, [onPageChange, pageBegin, pageCount]);
  const prevPage = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
    onPageChange && onPageChange(pageBegin(newPage));
  }, [onPageChange, page, pageBegin]);
  const nextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    onPageChange && onPageChange(pageBegin(newPage));
  }, [onPageChange, page, pageBegin]);

  const pageElements = useMemo<T[]>(() => {
    return data.slice(pageBegin(page), pageEnd);
  }, [data, page, pageBegin, pageEnd]);

  useEffect(() => {
    if (page > pageCount - 1 && data.length > 0) {
      setLastPage();
    }
  }, [data.length, page, pageCount, setLastPage]);

  useImperativeHandle<PaginationControls<T>, PaginationControls<T>>(
    controlsRef,
    () => ({
      goToItem: (item) => setPage(pageOf(data, item, pageSize)),
      goToPage: (page) => {
        switch (page) {
          case 'first':
            setPage(1);
            break;
          case 'last':
            setPage(pageCount);
            break;
          default:
            setPage(page);
        }
      },
    }),
    [data, pageSize, pageCount],
  );

  return (
    <div className={styles.Component}>
      <div className={styles.PaginatedContent}>{children(pageElements)}</div>
      <Content className={styles.PageNavigation}>
        <Button onClick={setFirstPage} disabled={isFirstPage} aria-label="first-page" icon>
          <ChevronLeft />
          <ChevronLeft />
        </Button>
        <Button onClick={prevPage} disabled={isFirstPage} aria-label="previous-page" icon>
          <ChevronLeft />
        </Button>
        <div className={styles.PageCounter}>{page}</div>
        <div className={styles.RestOfPages}>
          {Of} {pageCount}
        </div>
        <Button onClick={nextPage} disabled={isLastPage} aria-label="next-page" icon>
          <ChevronRight />
        </Button>
        <Button onClick={setLastPage} disabled={isLastPage} aria-label="last-page" icon>
          <ChevronRight />
          <ChevronRight />
        </Button>
      </Content>
    </div>
  );
}
