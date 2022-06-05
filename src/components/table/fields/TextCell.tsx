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
      if (editable) {
        event.stopPropagation();

        if (!disabled) {
          setIsEditable(true);
        }
      }
    },
    [disabled, editable],
  );

  useEffect(() => {
    if (isEditable) {
      setTimeout(() => {
        ref.current?.focus();
      });
    }
  }, [isEditable]);

  return (
    <div
      onClick={!disabled ? makeEditable : undefined}
      ref={ref}
      className={classNames({ [styles.Editable]: editable }, className)}
      onInput={(e) => e.target}
      onBlur={onBlur}
      contentEditable={isEditable}
      suppressContentEditableWarning={isEditable}
      dangerouslySetInnerHTML={{ __html: (value ?? '').toString() }}
    />
  );
}
