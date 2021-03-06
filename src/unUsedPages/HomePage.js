import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';


function HomePage(props) {

    return (
        <div style={{'background-color': '#ffa494', height:800}}>
            <h1>Homepage</h1>
            {props.loggedIn?null: <Redirect to='/login'/>}
            <h1> home </h1>
        </div>
    )
}

export default HomePage;
HomePage.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}
