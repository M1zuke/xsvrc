import classNames from 'classnames';
import React, { FocusEvent, MouseEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { TextCellOptions } from '../Table';
import styles from './Cell.module.scss';

export function TextCell({ value, className, editable, onChange, disabled }: TextCellOptions): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  const onBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const parsedValue = event.target.textContent;

      if (onChange && parsedValue) {
        onChange(parsedValue);
      }
      setIsEditable(false);
    },
    [onChange],
  );

  const makeEditable = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (editable && !disabled) {
        setIsEditable(true);
      }
    },
    [disabled, editable],
  );

  useEffect(() => {
    if (isEditable) {
      setTimeout(
        /* istanbul ignore next : I don't know how to test this */ () => {
          ref.current?.focus();
        },
      );
    }
  }, [isEditable]);

  return (
    <div className={styles.Cell} onClick={makeEditable}>
      <div
        ref={ref}
        className={classNames({ [styles.Editable]: isEditable }, className)}
        onInput={(e) => e.target}
        onBlur={onBlur}
        contentEditable={isEditable}
        suppressContentEditableWarning={isEditable}
        dangerouslySetInnerHTML={{ __html: (value ?? '').toString() }}
      />
    </div>
  );
}
