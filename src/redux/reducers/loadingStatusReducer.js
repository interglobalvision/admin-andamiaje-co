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
