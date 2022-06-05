import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { Button } from '../button/Button';
import styles from './Tabs.module.scss';

export type TabsConfig<D extends object, T extends string> = {
  label: string;
  key: T;
  disabled?: boolean;
  content: (data: D) => ReactNode;
};

type TabsProps<D extends object, T extends string> = {
  config: TabsConfig<D, T>[];
  entryKey: T;
  data: D;
};

export function Tabs<T extends string, D extends object>({ config, entryKey, data }: TabsProps<D, T>): ReactElement {
  const [key, setKey] = useState(entryKey);

  const tabs = useMemo(
    () =>
      config.map((c, index) => {
        return (
          <Button
            active={c.key === key}
            key={`${c.label}-${index}`}
            onClick={() => setKey(c.key)}
            disabled={c.disabled}
          >
            {c.label}
          </Button>
        );
      }),
    [config, key],
  );

  const content = useMemo(() => config.find((c) => c.key === key)?.content, [config, key]);

  useEffect(() => {
    const configForKey = config.find((c) => c.key === key);
    if (configForKey?.disabled) {
      const nonDisabledConfig = config.find((c) => !c.disabled);
      setKey(nonDisabledConfig?.key ?? ('' as T));
    }
  }, [config, key]);

  return (
    <div className={styles.Component}>
      <div className={styles.Tabs}>
        <div className={styles.TabsInner}>{tabs}</div>
      </div>
      <div className={styles.Content}>{content?.(data)}</div>
    </div>
  );
}
