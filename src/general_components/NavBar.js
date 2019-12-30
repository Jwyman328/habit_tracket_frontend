import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, Navbar, Nav } from 'react-bootstrap';




/**
 * A NavBar containing all Available page links.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out.
 * @param {Func} props.logOut - Make loggedIn False
 */
function NavBar(props) {

    const handleClick = () => {
        props.logOut();
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Habit Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    {/*props.loggedIn?<Link to='/home' className="nav-link"> Home </Link>: null*/} 
                    {props.loggedIn? undefined : <Link to='/login' className="nav-link"> <li> Login</li> </Link>}
                    {props.loggedIn? undefined: <Link to='/signup' className="nav-link"> <li> SignUp</li> </Link>}
                    {props.loggedIn?<Link to='/create_habit' className="nav-link"> <li> Create Habit</li> </Link>: null}
                    {props.loggedIn?<Link to='/calender/' className="nav-link"> <li>Habit Calender</li></Link>: null}
                    {props.loggedIn?<Link to='/DayTimeTable/' className="nav-link"> <li>Daily-TimeTable</li></Link>: null}
                    {props.loggedIn?<Button className='btn btn-info' onClick={handleClick}>Log Out </Button>: null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default NavBar;
NavBar.propTypes = {
    logOut: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}
