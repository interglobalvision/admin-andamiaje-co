/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import { reducer as toastrReducer } from 'react-redux-toastr'

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
  toastr: toastrReducer,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
