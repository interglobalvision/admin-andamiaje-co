/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import { reducer as toastrReducer } from 'react-redux-toastr'

import { uploadStatusReducer } from './reducers/uploadStatusReducer';

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
  uploadStatus: uploadStatusReducer,
  toastr: toastrReducer,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
