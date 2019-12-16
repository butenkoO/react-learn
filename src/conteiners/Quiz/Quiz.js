import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/activeQuiz/activeQuiz'
import FinishQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryHandler} from '../../store/actions/quiz'

class Quiz extends React.Component{

    componentDidMount() {
          this.props.fetchQuizById(this.props.match.params.id)
          }

    componentWillUnmount(){
      this.props.retryHandler()
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Вікторина</h1>
                    {
                      this.props.loading || !this.props.quiz
                      ? <Loader />
                      : this.props.isFinished
                        ? <FinishQuiz
                          results={this.props.results}
                          quiz={this.props.quiz}
                          onRetry={this.props.retryHandler}
                        />
                        : <ActiveQuiz
                          answers={this.props.quiz[this.props.activeQuestion].answers}
                          question={this.props.quiz[this.props.activeQuestion].question}
                          onAnswerClick={this.props.quizAnswerClick}
                          quizLength={this.props.quiz.length}
                          answerNumber={this.props.activeQuestion + 1}
                          state={this.props.answerState}
                        />
                   }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch){
  return {
     fetchQuizById : id => dispatch(fetchQuizById(id)),
     quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
     retryHandler: ()=> dispatch(retryHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)