import { SIGNED_IN, SIGNED_OUT } from '../constants'

let user = {
  email: null,
  username: null,
};

export default (state = user, action) => {
  switch (action.type) {
    case SIGNED_IN:
      const { email } = action;
      user = {
        email,
      }
      return user

    case SIGNED_OUT:
      user = {}
      return user
    default:
      return state
  }
};
