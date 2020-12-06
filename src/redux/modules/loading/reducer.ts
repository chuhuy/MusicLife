import {ENABLE_LOADING, DISABLE_LOADING} from './actions';
import {Action} from './../../../models/redux/Action';

const initState = {
  loading: false,
};

export const loadingReducer = (state: any = initState, action: Action) => {
  switch (action.type) {
    case ENABLE_LOADING: {
      return {
        loading: true,
      };
    }
    case DISABLE_LOADING: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};
