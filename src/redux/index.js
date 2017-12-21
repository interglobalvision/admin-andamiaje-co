/**
 * Combine All Reducers
 */

import { combineReducers } from 'redux'

import user from './user/reducer'
import forms from './forms/reducer'
// import messages from './reducer_messages.js'

const appReducer = combineReducers({
  user,
  forms,
  // messages,
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
