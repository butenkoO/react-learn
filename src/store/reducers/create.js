import {CREATE_QUIZ_HANDLER, RESET_QUIZ_CREATOR} from '../actions/actionTypes'

const initialState = {
    quiz:[]
}

export default function create(state=initialState, action){
    switch(action.type){
        case CREATE_QUIZ_HANDLER:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATOR:
            return {
                ...state,
                quiz:[]
            }
        default :
            return state
    }
}