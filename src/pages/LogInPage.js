import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { Button } from 'react-bootstrap';
//import '../App.css';


/**
 * Allow a current user to login, by sending username, password and jwt token to DRF for authentication.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 * @param {Func} props.logIn - Turns loggedIn to true, allowing user to access logged in only services. 
 * 
 */
function LoginPage(props) {
    const [usernamePassword, setUsernamePassword] = useState({username: '', password: ''})
    const inputChangeHandler = (e)=> {
        let name = e.target.name
        let value = e.target.value 

        let newUsernamePassword = {...usernamePassword}
        newUsernamePassword[name] = value
        setUsernamePassword(newUsernamePassword)
    }

    /**
     * Send request to sign_in page and recieve a jwt token in order to log in.
     * 
     * Once the jwt token is reviece then the user may be logged in.
     */
    const fetchLogin = async() => {
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/sign_in',{method:'POST', mode: 'cors',
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
        <div className='loginPage' >
            <br></br>
            <h1>Login</h1>
            <br></br>
            <h4 >Guest User Access</h4>
            <h5>username: test123456 </h5>
            <h5>password: test123</h5>
         
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Username <input onChange={inputChangeHandler} type='text' name='username'/> </label>
                <br></br>
                <label>Password <input onChange={inputChangeHandler}  type='password' name='password'/> </label>
                <br></br>
                <Button onClick={handleSubmit}> Log In </Button>
            </form>
            {props.loggedIn?<Redirect to='/calender/' />:null}
        </div>
    )
}

export default LoginPage;

LoginPage.propTypes = {
    logIn: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}
