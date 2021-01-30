import React, { ReactElement } from 'react';
import { useSettings } from '../../../common/use-settings';
import { useMessages } from '../../../i18n';
import { TitleBox } from '../home/TitleBox';

export function Settings(): ReactElement {
  const messages = useMessages();
  const settings = useSettings();
  return <TitleBox title={messages.Views.Settings.Title}>{JSON.stringify(settings)}</TitleBox>;
}
