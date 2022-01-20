import { Close, Download, Fullscreen, Minimize } from '@mui/icons-material';
import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useIpcRenderer } from '../../common/electron-controls';
import { useAutoUpdater } from '../../electron/use-auto-updater';
import { useMessages } from '../../i18n';
import { IsUpdateAvailable } from '../../store/view/selectors';
import { Button } from '../button/Button';
import { Content } from '../content/Content';
import styles from './Header.module.scss';
import appLogo from '../../images/xsvrc-logo.png';

type ApplicationCommands = 'close' | 'minimize' | 'maximize' | 'unmaximize';

export function Header(): ReactElement {
  const ipcRenderer = useIpcRenderer();
  const messages = useMessages();
  const runElectronCmd = useCallback((cmd: ApplicationCommands) => ipcRenderer.invoke('run', cmd), [ipcRenderer]);
  const isUpdateAvailable = useSelector(IsUpdateAvailable);
  const updateApplication = useAutoUpdater();

  return (
    <>
      <Content className={styles.Component}>
        <img alt="" src={appLogo} />
        <div className={styles.ApplicationTitle}>
          {messages.Application.Title} - {process.env['REACT_APP_VERSION']}
        </div>
        <div className={styles.WrapperRight}>
          {isUpdateAvailable && (
            <Button
              headerIcon
              onClick={updateApplication}
              disabled={!isUpdateAvailable}
              className={styles.UpdateAvailable}
            >
              <Download />
            </Button>
          )}

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
        </div>
      </Content>
    </>
  );
}
