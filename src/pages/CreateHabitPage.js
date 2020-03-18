import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';


import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


/**
 * Form for creating a Habit.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 */
function CreateHabit(props) {
    const startDateOriginal = new Date();
    const formFormatedOriginalDate = formatDate(startDateOriginal)
    const [startDate, setStartDate ] = useState(startDateOriginal)
    const [endDate, setEndDate ] = useState(startDateOriginal)
    const [formData, setFormData] = useState({title: '', start_date:formFormatedOriginalDate, end_date:formFormatedOriginalDate, type_of_habit:'',type_of_goal:'total', goal_amount:''})

    /**
     * on mount set newFormData type to timed 
     */
    useEffect(() => {
        let newFormData = {...formData}
        newFormData['type_of_habit'] = 'timed'
        setFormData(newFormData)
    },[])
    
    /**
     * Return the date selected into a more readable YYYY-MM-DD format.
     * @param {Date} date -- Date selected on the form
     * @return            -- return a YYYY-MM-DD string of the date param
     */
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }

    /**
     * set start date state variables for the habit for the selected start date.
     * @param {Date} date -- Start Date selected on the form
     */
    let handleStartDateChange = (date) => {
        let YYYYMMDD_date = formatDate(date)
        let newFormData = {...formData}
        newFormData['start_date'] = YYYYMMDD_date
        setFormData(newFormData)
        setStartDate(date)
    }
    /**
     * set end date state variables for the habit for the selected end date.
     * @param {Date} date -- End Date selected on the form
     */
    let handleEndDateChange = (date) => {
        let YYYYMMDD_date = formatDate(date)
        let newFormData = {...formData}
        newFormData['end_date'] = YYYYMMDD_date
        setFormData(newFormData)
        setEndDate(date)
    }

    /**
     * Set the form data to the newFormData state object when form data is changed.
     * @param {Object} e -- event for when form input is changed
     */
    const inputChangeHandler = (e)=> {
        let name = e.target.name
        let value = e.target.value 
        let newFormData = {...formData}
        newFormData[name] = value
        setFormData(newFormData)
    }

    /**
     * Make a post request to create a Habit model with the form data.
     * Redirect the user to the calender page after the post has been made.
     */
    const createAHabit = async () => {
        let formDataJson = JSON.stringify(formData)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_habit',{method:'POST', mode: 'cors',body:formDataJson,
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}
        );
        let jsonResponse = await getResponse.json()
        // redirect once the habit is mak 
        if (jsonResponse){
            props.history.push('/calender/')
        }
    }

    /**
     * Stop the default form submit action and call createAHabit when a form is submitted.
     * @param {Object} e -- Form submit event
     */
    const handleCreateAHabit = (e) => {
        e.preventDefault();
        createAHabit()
    }

    return (
        <div className='backgroundFill'>
            <h1>Create Habit</h1>
            {props.loggedIn?null: <Redirect to='/login'/>}
            <Form onSubmit={handleCreateAHabit}>
                <Form.Group>
                    <Form.Label>Habit Activity Name  </Form.Label>
                    <Form.Control onChange={inputChangeHandler} name='title' type="text" placeholder="ex. run, walk, eat a salad" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start Date &nbsp; </Form.Label>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End Date &nbsp; </Form.Label>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Habit Type</Form.Label>
                    <Form.Control name='type_of_habit' as="select" onChange={inputChangeHandler}>
                        <option value='timed'>Timed</option>
                        <option value='checked'>Checked</option>
    
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Goal Type</Form.Label>
                    <Form.Control name='type_of_goal' as="select" onChange={inputChangeHandler}>
                        <option value='total'>Total length of Dates Selected</option>
                        <option value='daily'>Daily</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Goal Amount </Form.Label>
                    <Form.Control onChange={inputChangeHandler} name='goal_amount' type="number" min="0" step="1" placeholder="timed = hrs, checked=# of times done" />
                </Form.Group>
                <Button className='btn btn-info' onClick={handleCreateAHabit}> Create Habit </Button>
            </Form>
        </div>
    )
}

export default withRouter(CreateHabit);
CreateHabit.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}