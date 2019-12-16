import React from 'react'
import classes from './activeQuiz.css'
import AnswersList from '../answersList/answersList'

const ActiveQuiz = props =>(
    <div className={classes.ActiveQuiz}>
        <p className={classes.Questions}>
            <span>
                <strong>1. </strong>
                {props.question}
            </span>
            <small>{props.answerNumber} from {props.quizLength}</small>
        </p>
        <AnswersList
            state = {props.state}
            answers = {props.answers}
            onAnswerClick = {props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz