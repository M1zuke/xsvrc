import React, { ReactElement, useMemo } from 'react';
import styles from './RenderJSON.module.scss';

type RenderJSONProps<T> = {
  json: T;
};
export function RenderJSON<T>({ json }: RenderJSONProps<T>): ReactElement {
  const renderedJson = useMemo(
    () =>
      Object.keys(json).map((key, index) => {
        return (
          <>
            <div key={`rendered-json-key-${index}`} className={styles.Key}>
              {key}:
            </div>
            <div key={`rendered-json-value-${index}`} className={styles.Value}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
              {/* @ts-ignore*/}
              {JSON.stringify(json[key])}
            </div>
          </>
        );
      }),
    [json],
  );

  return <div className={styles.Component}>{renderedJson}</div>;
}
