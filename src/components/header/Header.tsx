import { Close, Fullscreen, Minimize } from '@material-ui/icons';
import React, { ReactElement, useCallback } from 'react';
import { useIpcRenderer } from '../../common/electron-controls';
import { useMessages } from '../../i18n';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './Header.module.scss';

type ApplicationCommands = 'close' | 'minimize' | 'maximize' | 'unmaximize';

export function Header(): ReactElement {
  const ipcRenderer = useIpcRenderer();
  const messages = useMessages();
  const runElectronCmd = useCallback((cmd: ApplicationCommands) => ipcRenderer.invoke('run', cmd), [ipcRenderer]);

  return (
    <Content className={styles.Component}>
      <div className={styles.ApplicationTitle}>
        {messages.Application.Title} - {process.env['REACT_APP_VERSION']}
      </div>
      <div className={styles.ApplicationControls}>
        <Button onClick={() => runElectronCmd('minimize')} aria-label="minimize application" headerIcon dark>
          <Minimize />
        </Button>
        <Button onClick={() => runElectronCmd('maximize')} aria-label="maximize application" headerIcon dark>
          <Fullscreen />
        </Button>
        <Button
          onClick={() => runElectronCmd('close')}
          aria-label="close application"
          headerIcon
          className={styles.HeaderButton}
          dark
        >
          <Close />
        </Button>
      </div>
    </Content>
  );
}
