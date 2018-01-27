// This is a custom reducer used to change the state based on the file upload
// actions defined by react-redux-firebase, since natevely they don't have a
// reducer yet.
// For updates check: https://github.com/prescottprue/react-redux-firebase/issues/346

// Import actionTypes directly from react-redux-firebase
// (use `RRF_ACTIONTYPES` as an alias)
import { actionTypes as RRF_ACTIONTYPES } from 'react-redux-firebase/src/constants';

// This is our initial state
const initialState = {
  uploading: false,
  percent: 0
};

// The upload reducer
export const uploadStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case RRF_ACTIONTYPES.FILE_UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        uploading: true,
        percent: action.payload.percent,
      });
    case RRF_ACTIONTYPES.FILE_UPLOAD_COMPLETE:
      return  initialState;
    default:
      return state
  }
}
