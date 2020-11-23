import React, { ReactElement, ReactNode } from 'react';
import { ifLoaded } from '../../api/prepare';
import { Loadable } from '../../store/reducer';
import { Loading } from '../loading/Loading';

type LoadableContentProps<T> = {
  data: Loadable<T>;
  children: (data: T) => ReactNode;
};

export function LoadableContent<T>({ data, children }: LoadableContentProps<T>): ReactElement {
  if (!ifLoaded(data)) {
    return <Loading />;
  }
  return <>{children(data)}</>;
}
