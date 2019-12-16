import React from 'react'
import classes from './QuizCreato.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validator, validateForm} from '../../form/form'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { connect } from 'react-redux'
import {createQuizHandler, finishCreateQuiz} from '../../store/actions/create'

function createOptions(num){
    return createControl({
        label: `Варіант ${num}`,
        errorMessage: 'Поле не можу бути порожнім',
        id: num
    },{required: true})
}

function createFormControls(){
    return {
        question: createControl({
            label: 'Введіть запитання',
            errorMessage: 'Поле не можу бути порожнім'
        }, {required: true}),
        option1: createOptions(1),
        option2: createOptions(2),
        option3: createOptions(3),
        option4: createOptions(4),
    }
}

class QuizCreator extends React.Component {
    state={
        rightAnswerID: 1,
        isFormValid: false,
        formControls:createFormControls()
    }

    submitHandler = event =>{
        event.preventDefault()
    }
    addQuestionHandler = event =>{
        event.preventDefault()
        const questionItem = {
            question: this.state.formControls.question.value,
            id: this.props.quiz.length + 1,
            rightAnswerID: this.state.rightAnswerID,
            answers: [
                {text: this.state.formControls.option1.value, id: this.state.formControls.option1.id},
                {text: this.state.formControls.option2.value, id: this.state.formControls.option2.id},
                {text: this.state.formControls.option3.value, id: this.state.formControls.option3.id},
                {text: this.state.formControls.option4.value, id: this.state.formControls.option4.id}
            ]
        }
        this.props.createQuizHandler(questionItem)
        this.setState({
            rightAnswerID: 1,
            isFormValid: false,
            formControls:createFormControls()
        })
    }
    createQuizHandler = event =>{
        event.preventDefault()
            this.setState({
                rightAnswerID: 1,
                isFormValid: false,
                formControls:createFormControls()
            })
            this.props.finishCreateQuiz()
    }

    selectChangeHandler = event =>{
        this.setState({
            rightAnswerID: +event.target.value
        })
    }
    onChangeHandler(value, controlName){
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = value
        control.touched = true
        control.valid = validator(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
          })
    }

    renderInput(){
        return Object.keys(this.state.formControls).map((name, index)=>{
            const control = this.state.formControls[name]
            return(
                <Input
                    key={name + index}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event.target.value, name)}
                />
            )
        })
    }

    render(){
        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Створити тест</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInput()}
                        <Select
                            label='Правильна відповідь'
                            value={this.state.rightAnswerID}
                            onChange={this.selectChangeHandler}
                            options={[
                                {text: 1, value:1},
                                {text: 2, value:2},
                                {text: 3, value:3},
                                {text: 4, value:4}
                            ]}
                        />
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавити питання
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Створити тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        quiz: state.create.quiz
    }
}
function mapDispatchToProps(dispatch){
    return {
        createQuizHandler : item => dispatch(createQuizHandler(item)),
        finishCreateQuiz : () => dispatch(finishCreateQuiz())
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)