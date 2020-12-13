import { Action } from './../../../models/redux/Action';
import { TOGGLE_CONNECTION } from './action';

const initState = false;

export const networkReducer = (state: any = initState, action: Action) => {
  switch (action.type) {
    case TOGGLE_CONNECTION:
      console.log('toggle connect')
      if (state !== action.payload) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};
