/**
 * Combine All Reducers
 */

import { combineReducers } from 'redux'
// import user from './reducer_user.js'
// import messages from './reducer_messages.js'


const appReducer = combineReducers({
})

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
}

export default rootReducer;
