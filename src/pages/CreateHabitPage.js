import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';


import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

//helper functions 
import formatDate from '../utils/manipulateDataHelperFunctions/formatDate';
import createAHabitWithPost from '../utils/postDataHelperFunctions/createAHabitWithPost';
import handleInputChange from '../utils/handleFormInput/handleInputChange';

//custom hook
import useGetCreateHabitPageState from './customHooks/useGetCreateHabitPageState';


/**
 * Form for creating a Habit.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 */
function CreateHabit(props) {
    const   {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        formData,
        setFormData,
      } = useGetCreateHabitPageState();

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
     * Stop the default form submit action and call createAHabit when a form is submitted.
     * @param {Object} e -- Form submit event
     */
    const handleCreateAHabit = (e) => {
        e.preventDefault();
        createAHabitWithPost(formData, props.history)
    }

    return (
        <div className='createHabit'>
            <h1 className='create-habit-title'>Create Habit</h1>
            {props.loggedIn?null: <Redirect to='/login'/>}
            <Form className='form-style'  onSubmit={handleCreateAHabit}>
                <Form.Group className='form-group'>
                    <Form.Label>Habit Activity Name  </Form.Label>
                    <Form.Control  onChange={(e) => handleInputChange(e,setFormData, formData)} name='title' type="text" placeholder="ex. run, walk, eat a salad" />
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label>Start Date &nbsp; </Form.Label>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} />
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label>End Date &nbsp; </Form.Label>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                </Form.Group>

                <Form.Group className='form-group'>
                    <Form.Label> Habit Type</Form.Label>
                    <Form.Control name='type_of_habit' as="select" onChange={(e) => handleInputChange(e,setFormData, formData)}>
                        <option value='timed'>Timed</option>
                        <option value='checked'>Checked</option>
    
                    </Form.Control>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label> Goal Type</Form.Label>
                    <Form.Control name='type_of_goal' as="select" onChange={(e) => handleInputChange(e,setFormData, formData)}>
                        <option value='total'>Total length of Dates Selected</option>
                        <option value='daily'>Daily</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Form.Label>Goal Amount </Form.Label>
                    <Form.Control onChange={(e) => handleInputChange(e,setFormData, formData)} name='goal_amount' type="number" min="0" step="1" placeholder="timed = hrs, checked=# of times done" />
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