
export const LOGIN = 'LOGIN';

export function userLogin(userName) {
  return {
    type: LOGIN,
    payload: userName
  };
}
