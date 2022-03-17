import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { Button } from '../button/Button';
import styles from './Tabs.module.scss';

export type TabsConfig<T extends string> = {
  label: string;
  key: T;
  disabled?: boolean;
};

type TabsProps<T extends string> = {
  config: TabsConfig<T>[];
  children: (key: T) => ReactNode;
};

export function Tabs<T extends string>({ config, children }: TabsProps<T>): ReactElement {
  const [key, setKey] = useState(config[0]?.key ?? '');

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
      <div className={styles.Content}>{children(key)}</div>
    </div>
  );
}
