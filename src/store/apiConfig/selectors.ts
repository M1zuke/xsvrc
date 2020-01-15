import { RootState } from '../rootReducer';

export const selectApiKey = (state: RootState) => state.apiConfig.apiKey;
