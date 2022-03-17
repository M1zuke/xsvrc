import classNames from 'classnames';
import React, {
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

type Props = PropsWithChildren<{
  onCancel?: () => void;
  backdrop?: 'faded' | 'transparent';
  higherIndex?: boolean;
}>;

const ignored = (): void => undefined;

export function Modal({ onCancel = ignored, backdrop = 'faded', children, higherIndex }: Props): ReactElement {
  const target = useMemo(() => document.createElement('div'), []);
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (ref.current === event.target) {
        onCancel();
      }
    },
    [onCancel],
  );

  const escapeListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    },
    [onCancel],
  );

  useLayoutEffect(() => {
    document.body.appendChild(target);
    return () => {
      document.body.removeChild(target);
    };
  }, [target]);

  useEffect(() => {
    document.addEventListener('keydown', escapeListener);
    return () => {
      document.removeEventListener('keydown', escapeListener);
    };
  }, [escapeListener]);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={classNames(styles.modal, styles[backdrop], { [styles.HigherIndex]: higherIndex })}
      onClick={clickHandler}
    >
      {children}
    </div>,
    target,
  );
}
