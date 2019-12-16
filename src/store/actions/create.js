import axios from 'axios'
import {CREATE_QUIZ_HANDLER, RESET_QUIZ_CREATOR} from '../actions/actionTypes'


export function createQuizHandler(item){
    return{
        type: CREATE_QUIZ_HANDLER,
        item
    }
}
export function resetQuizCreation(){
    return{
        type: RESET_QUIZ_CREATOR
    }
}


export function finishCreateQuiz(){
    return async (dispatch, getState) =>{
        axios.post('https://learn-react-b2f3f.firebaseio.com/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}
