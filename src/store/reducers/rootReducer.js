import {combineReducers} from 'redux'
import quizReducer from './quiz'
import create from './create'
import auth from './auth'

export default combineReducers ({
    quiz: quizReducer,
    create,
    auth
})