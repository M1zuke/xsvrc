export const UPDATE_API_CONFIG: string = 'UPDATE_API_CONFIG';

export interface UpdateApiConfigAction {
  type: typeof UPDATE_API_CONFIG;
  payload: ApiConfig;
}


export type ApiConfigActionTypes =
    | UpdateApiConfigAction;
