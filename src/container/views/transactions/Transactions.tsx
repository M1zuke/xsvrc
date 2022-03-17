import React, { ReactElement, useEffect } from 'react';
import { useApi } from '../../../api/use-api';
import { Content } from '../../../components/content/Content';

export function Transactions(): ReactElement {
  const { getTransactions } = useApi();

  useEffect(() => {
    getTransactions().finally();
  }, [getTransactions]);

  return <Content>Test</Content>;
}
