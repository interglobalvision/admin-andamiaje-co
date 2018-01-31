// This is a custom reducer used to change the state based on the file upload
// actions defined by react-redux-firebase, since natevely they don't have a
// reducer yet.
// For updates check: https://github.com/prescottprue/react-redux-firebase/issues/346

// Import constants directly from react-redux-firebase
import { constants } from 'react-redux-firebase';

// This is our initial state
const initialState = {
  uploading: false,
  percent: 0
};

// The upload reducer
export const uploadStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.actionTypes.FILE_UPLOAD_PROGRESS:
      return Object.assign({}, state, {
        uploading: true,
        percent: action.payload.percent,
      });
    case constants.actionTypes.FILE_UPLOAD_COMPLETE:
      return  initialState;
    default:
      return state
  }
}
