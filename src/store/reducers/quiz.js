import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, RETRY_HANDLER, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, FINISH_QUIZ} from '../actions/actionTypes'

const initialState = {
    quizes:[],
    loading:true,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state=initialState, action){
    switch(action.type){
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false , error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false , error: action.error, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
                return {
                    ...state, activeQuestion: action.num ,answerState: null
                }
            case RETRY_HANDLER:
                    return {
                        ...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}
                    }
    default:
            return state
    }
}