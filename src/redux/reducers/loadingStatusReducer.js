// This is a custom reducer used to change the state based on the loading
// actions defined by react-redux-firebase, since natively they don't have a
// reducer yet.
// For updates check: https://github.com/prescottprue/react-redux-firebase/issues/346

// Import constants directly from react-redux-firebase
import { constants } from 'react-redux-firebase';

// This is our initial state
const initialState = {
  loading: false
};

// The loading reducer
export const loadingStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return Object.assign({}, state, {
        loading: true,
      });
    case 'IS_LOADED':
      return  initialState;
    default:
      return state
  }
}
