import { combineReducers } from 'redux'
import user from './user'
import weather from './weather'


export default combineReducers({
    user,
    weather
})