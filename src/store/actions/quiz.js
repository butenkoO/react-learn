import axios from 'axios'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS ,FETCH_QUIZES_ERROR, RETRY_HANDLER, QUIZ_NEXT_QUESTION, FETCH_QUIZ_SUCCESS,QUIZ_SET_STATE,FINISH_QUIZ} from '../actions/actionTypes'

export function fetchQuizes(){
    return async dispatch =>{
        dispatch(fetchQuizesStart())
        try{
          const response = await axios.get('https://learn-react-b2f3f.firebaseio.com/quizes.json')
          const quizes=[]
          Object.keys(response.data).forEach((key, index)=>{
            quizes.push({
                id:key,
                name: `TEST #${index+1}`
            })
          })
        dispatch(fetchQuizesSuccess(quizes))
        }catch(err){dispatch(fetchQuizesError(err))}
    }
}

export function fetchQuizesStart(){
    return{
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizSuccess(quiz){
    return{
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesError(err){
    return{
        type: FETCH_QUIZES_ERROR,
        error: err
    }
}

export function quizSetState(answerState, results){
    return{
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}
export function finishQuiz(){
    return{
        type: FINISH_QUIZ
    }
}

export function retryHandler(){
    return{
        type: RETRY_HANDLER
    }
}
export function quizNextQuestion(num){
    return{
        type: QUIZ_NEXT_QUESTION,
        num
    }
}

export function fetchQuizById(id){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`https://learn-react-b2f3f.firebaseio.com/quizes/${id}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        }catch(err){dispatch(fetchQuizesError(err))}
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
            return
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerID === answerId) {
            if (!results[question.id]) {
            results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 200)
            } else {
                results[question.id] = 'error'
                dispatch(quizSetState({[answerId]: 'error'}, results))
            }
    }
}

function isQuizFinished(state){
    return state.activeQuestion + 1 === state.quiz.length
}
