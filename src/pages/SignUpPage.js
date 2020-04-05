import React,{useState}  from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import stopWatchLogo from '../images/stopwatch-outline.svg'
import barChartLogo from '../images/checkbox-outline.svg'


/**
 * Allow someone to create a new user, by sending a new username, and password to recieve a JWT token.
 * Log in the user after new user is created.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 * @param {Func} props.logIn - Turns loggedIn to true, allowing user to access logged in only services. 
 * 
 */
function SignUpPage(props) {
    const [usernamePassword, setUsernamePassword] = useState({username: '', password: ''})
    const inputChangeHandler = (e)=> {
        let name = e.target.name
        let value = e.target.value 
        let newUsernamePassword = {...usernamePassword}
        newUsernamePassword[name] = value
        setUsernamePassword(newUsernamePassword)
    }

    /**
     * Send a post request with the entered username and password to create a new user.
     * 
     * When the username/password is accepted set the jwt token to local storage
     * allowing the user to enter into the app.
     */
    const fetchLogin = async() => {
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/sign_up',{method:'POST', mode: 'cors',
            body:jsonUsername, headers: {'Content-Type': 'application/json'}
        }); 
        let jsonResponse = await loginResponse.json()
        //add token to local storage and use for requests
        const token = jsonResponse.token
        localStorage.setItem('token', token)
        if (token){
            props.logIn();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchLogin()
    }
    return (
        <div className='loginPage'>
            <br></br>
            <div className='login-card'>
            <img className='stopWatchLogo-left' src={stopWatchLogo} />
            <img className='checkBox-right' src={barChartLogo} />
            <h1 className='create-habit-title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Username <input onChange={inputChangeHandler} type='text' name='username'/> </label>
                <br></br>
                <label>Password <input onChange={inputChangeHandler}  type='password' name='password'/> </label>
                <br></br>
                <button className='custom-button' onClick={handleSubmit}> Sign up </button>
            </form>
            </div>
            {props.loggedIn?<Redirect to='/home' />:null}
        </div>
    )
}
export default SignUpPage;

SignUpPage.propTypes = {
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}
