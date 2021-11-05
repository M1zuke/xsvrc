import React, { ReactElement, useMemo } from 'react';
import { Checkbox } from '../../../components/checkbox/Checkbox';
import { Content } from '../../../components/content/Content';
import { DropDown } from '../../../components/drop-down/DropDown';
import { useMessages } from '../../../i18n';
import { SettingsState } from '../../../store/persisted/state';
import { TitleBox } from '../home/TitleBox';
import styles from './Settings.module.scss';
import { useSettingsOptions } from './use-settings-model';

export function Settings(): ReactElement {
  const messages = useMessages();
  const settingsOptions = useSettingsOptions();
  const renderedSettings = useMemo<Record<keyof SettingsState, JSX.Element>>(() => {
    return Object.assign(
      {},
      ...Object.keys(settingsOptions).map((k) => {
        const key = k as keyof SettingsState;
        const so = settingsOptions[key];
        switch (so.type) {
          case 'dropdown': {
            return {
              [key]: (
                <div className={styles.RenderedSetting}>
                  <div className={styles.Label}>{messages.Views.Settings.Label[key]}</div>
                  <DropDown options={so.options} onChange={so.changeHandler} value={so.value} />
                </div>
              ),
            };
          }
          case 'checkbox': {
            return {
              [key]: (
                <div className={styles.RenderedSetting}>
                  <div className={styles.Label}>{messages.Views.Settings.Label[key]}</div>
                  <Checkbox onChange={so.changeHandler} value={so.value} />
                </div>
              ),
            };
          }
        }
        return { [key]: <>{key}: Not Implemented Yet</> };
      }),
    );
  }, [messages.Views.Settings.Label, settingsOptions]);

  return (
    <Content translucent className={styles.Settings}>
      <TitleBox title={messages.Views.Settings.Title} />
      <TitleBox title={messages.Views.Settings.Localization} className={styles.ColumnGap}>
        {renderedSettings.localization} {renderedSettings.use12hours}
      </TitleBox>
    </Content>
  );
}
