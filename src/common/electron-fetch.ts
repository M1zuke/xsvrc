import { IpcRenderer } from '../index';

export type ElectronFetchArgs

export function electronFetch<T>(): Promise<T> {
  return IpcRenderer.invoke('fetch', (e,args: ElectronFetchArgs) => {

  })
}
