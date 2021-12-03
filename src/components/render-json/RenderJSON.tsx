import React, { CSSProperties, ReactElement, useMemo } from 'react';
import ReactJson from 'react-json-view';

type RenderJSONProps = {
  json: Record<string, unknown>;
};

export function RenderJSON({ json }: RenderJSONProps): ReactElement {
  const style = useMemo<CSSProperties>(
    () => ({
      backgroundColor: 'transparent',
      fontSize: '14px',
      textAlign: 'left',
    }),
    [],
  );
  return (
    <ReactJson src={json} theme="twilight" enableClipboard={false} displayDataTypes={false} style={style} sortKeys />
  );
}
