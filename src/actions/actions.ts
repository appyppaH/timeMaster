export const LOGIN = 'LOGIN'


export function login(token: String) {
    return {
        type: LOGIN,
        payload: token
    }
}
