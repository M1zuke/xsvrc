import { AppThunkAction } from '../thunk';
import { api, prepare } from './prepare';

export function getTransactions(): AppThunkAction {
  return async function (dispatch, getState) {
    const result = await prepare(getState, dispatch, {
      url: api('Steam/transactions'),
    });
    if (result.type === 'entity') {
      console.log(result.result);
    } else {
      console.error(result);
    }
  };
}
