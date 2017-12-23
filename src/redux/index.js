/**
 * Combine All Reducers
 */
import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'

const appReducer = combineReducers({
  firebase: firebaseStateReducer,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
