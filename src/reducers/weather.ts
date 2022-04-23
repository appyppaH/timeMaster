import { SETWEATHER } from "../actions/actions";

const INITIAL_STATE = {
    weatherData: {}
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETWEATHER:
            return Object.assign({}, state, { 'weatherData': action.payload })
        default:
            return { state }
    }
}