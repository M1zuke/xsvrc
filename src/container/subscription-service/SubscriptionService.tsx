import React, { ReactElement, useCallback, useRef } from 'react';
import styles from './SubscriptionService.module.scss';

export type SubscribeFunction<P extends string = string> = (
  func: (param: P) => void,
  id: P,
  timeInSeconds?: number,
) => void;
export type UnsubscribeFunction<P extends string = string> = (id: P) => void;

export type PropsWithSubscription<T, P extends string = string> = T & {
  subscribe: SubscribeFunction<P>;
  unsubscribe: UnsubscribeFunction<P>;
};

type Subscriptions = {
  [id: string]: NodeJS.Timer;
};

type SubscriptionServiceProps = {
  children: (subscribe: SubscribeFunction, unsubscribe: UnsubscribeFunction) => ReactElement;
};

export function SubscriptionService({ children }: SubscriptionServiceProps): ReactElement {
  const subscriptions = useRef<Subscriptions>({});

  const subscribe: SubscribeFunction = useCallback(
    (func, id, timeInSeconds) => {
      const findSubscription = subscriptions.current[id];
      if (!findSubscription) {
        const interval = setInterval(() => {
          func(id);
        }, (timeInSeconds || 60) * 1000);

        subscriptions.current = {
          ...subscriptions.current,
          [id]: interval,
        };
      }
    },
    [subscriptions],
  );
  const unsubscribe: UnsubscribeFunction = useCallback(
    (id: string) => {
      const findSubscription = subscriptions.current[id];
      if (findSubscription) {
        clearInterval(findSubscription);
        const newState = subscriptions.current;
        delete newState[id];
        subscriptions.current = newState;
      }
    },
    [subscriptions],
  );

  return <div className={styles.SubscriptionService}>{children(subscribe, unsubscribe)}</div>;
}
