import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/actionTypes'


export function auth(email, password, isLogin){
    console.log(isLogin)
    return async dispatch=>{
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-bdul8TkSb5tKXa6Qh76jNuJRt10U9E0'
        if(isLogin){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC-bdul8TkSb5tKXa6Qh76jNuJRt10U9E0'
        }
        const res = await axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(res.data.idToken))
        dispatch(authLogout(res.data.expiresIn))
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function authLogout(time){
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        }, time*1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
 return async dispatch=>{
     const token = localStorage.getItem('token')
     if(!token){
        dispatch(logout())
     }else{
         const expirationDate = new Date(localStorage.getItem('expirationDate'))
         if(expirationDate <= new Date()){
             dispatch(logout())
         }else{
            dispatch(authSuccess(token))
            dispatch(authLogout((expirationDate.getTime()-new Date.getTime())/1000))
         }
     }
 }
}