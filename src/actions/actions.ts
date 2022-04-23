export const LOGIN = 'LOGIN'
export const SETWEATHER = 'SETWEATHER'

export function login(Authorization: String) {
    return {
        type: LOGIN,
        payload: Authorization
    }
}
export function setWeather(WeacherData: Object) {
    return {
        type: SETWEATHER,
        payload: WeacherData
    }
}