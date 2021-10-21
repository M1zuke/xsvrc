import { UpdateAvailable } from './types';

export function updateAvailable(): UpdateAvailable {
  return {
    type: 'view/update-available',
  };
}
