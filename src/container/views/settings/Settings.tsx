import React, { ReactElement } from 'react';
import { RenderJSON } from '../../../components/render-json/RenderJSON';
import { useMessages } from '../../../i18n';
import { TitleBox } from '../home/TitleBox';
import { useSettingsOptions } from './use-settings-model';

export function Settings(): ReactElement {
  const messages = useMessages();
  const settingsOptions = useSettingsOptions();

  return (
    <TitleBox title={messages.Views.Settings.Title}>
      <RenderJSON json={settingsOptions} />
    </TitleBox>
  );
}
