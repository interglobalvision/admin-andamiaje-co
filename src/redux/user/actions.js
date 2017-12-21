import { SIGNED_IN, SIGNED_OUT } from '../constants'

export function logUser(email, username) {
  const action = {
    type: SIGNED_IN,
    email,
  }

  return action
}

export function logOutUser() {
  const action = {
    type: SIGNED_OUT,
  }

  return action
}
