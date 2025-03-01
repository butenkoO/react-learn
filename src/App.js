import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect} from 'react-router-dom'
import Quiz from './conteiners/Quiz/Quiz';
import QuizCreator from './conteiners/QuizCreator/QuizCreator';
import Auth from './conteiners/Auth/Auth';
import QuizList from './conteiners/QuizList/QuizList';
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout';
import {autoLogin} from './store/actions/auth'

class App extends React.Component{

  componentDidMount(){
    this.props.autoLogin()
  }

  render(){
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to={'/'} />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to={'/'} />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }

}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.auth.token
  }
}

function mapDespatchProps(dispatch){
  return{
    autoLogin: ()=>dispatch(autoLogin())
  }
}
export default connect(mapStateToProps,mapDespatchProps)(App);
