import React, { ReactElement, useMemo } from 'react';
import ReactJson from 'react-json-view';

type PossibleJSONTypes = string | number | boolean | (string | number)[];
type RenderJSONProps<T extends Record<string, PossibleJSONTypes>> = {
  json: T;
};

export function RenderJSON<T extends Record<string, PossibleJSONTypes>>({ json }: RenderJSONProps<T>): ReactElement {
  const style = useMemo(
    () => ({
      backgroundColor: 'transparent',
    }),
    [],
  );
  return <ReactJson src={json} theme="twilight" enableClipboard={false} displayDataTypes={false} style={style} />;
}
