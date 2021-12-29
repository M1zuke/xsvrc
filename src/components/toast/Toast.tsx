import React, { ReactElement, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.module.scss';

type ShowToastFunction = (message: string) => void;
type Toasts = {
  message: string;
  index: number;
};

export function useToast(): [ReactElement, ShowToastFunction] {
  const target = useMemo(() => document.createElement('div'), []);
  const [rawToasts, setRawToasts] = useState<Toasts[]>([]);
  const show = useCallback((message: string) => {
    setRawToasts((prev) => [
      ...prev,
      {
        message,
        index: prev.length,
      },
    ]);
    setTimeout(() => {
      setRawToasts((prev) => {
        const prevState = [...prev];
        prevState.shift();
        return prevState;
      });
    }, 3000);
  }, []);

  const children = useMemo(() => {
    return rawToasts.map((m, index) => {
      return (
        <div key={`Toast-${m.index}-${index}`} className={styles.Toast}>
          {m.message}
        </div>
      );
    });
  }, [rawToasts]);

  useLayoutEffect(() => {
    document.body.appendChild(target);
    return () => {
      document.body.removeChild(target);
    };
  }, [target]);
  return [ReactDOM.createPortal(<div className={styles.ToastWrapper}>{children}</div>, target), show];
}
