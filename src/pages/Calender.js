import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Calendar from 'react-calendar';
import HabitCard from '../components/habit_components/HabitCard';
import useGetCaladerPageState from '../pages/customHooks/useGetCaladerPageState'
import fetch_date_habits from '../utils/fetchDataHelperFunctions/fetchDateHabits';
import fetch_daily_habits from '../utils/fetchDataHelperFunctions/fetchDailyHabitsByDate';
import show_habit_cards from '../utils/createComponentsHelperFunctions/createHabitCards';
/**
 * A calander to manage selecting the date for which Habits shall be displayed.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 * @var {Date} today - the current date.
 * @var {String} todayFormated - the current date in a readable string.
 * @var {Date} date - the date selected.
 * @var {String} dateFormated - the selected date in a readable string.
 * @var {Array} habitData - habit data for all habits of the selected date.
 * @var {Array} habitDaily - habit data for all daily habits of the selected date.
 * @var {Array} habit_cards - array of habit data as readable display cards.
 * @var {String} token - user's jwt token .
 */

function CalendarContainer(props) {

let {
  date,
  setDate,
  dateFormated,
  setDateFormated,
  habitData,
  setHabitData,
  habitDaily,
  setHabitDaily,
  token,
  setToken,
  habit_cards,
} = useGetCaladerPageState();

    /**
     * Activate the specific date habit collecting methods by sending them the dateClicked.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
    const click_date = (dateClicked) => {
        setDate(dateClicked)
        let dateClickedFormated = dateClicked.toDateString()
        setDateFormated(dateClickedFormated)
        // when i click on a day it should show the habits set for that day 
        // so make a fetch call and get all the habits for that day 
        fetch_date_habits(dateClicked,setHabitData)
        fetch_daily_habits(dateClicked,setHabitDaily)
        // then send that data to a component 
    }


    return (
        <Container className='habitCalender'>
            {props.loggedIn ? null : <Redirect to='/login' />}
            <div className='create-habit-title'>
                <h1>
                    Habit Calendar
                </h1>
            </div>
            <Row>
                <Col className='my-3'>
                    <Calendar className='calender centerItem ' value={date} onClickDay={click_date} />
                </Col>
            </Row>
            <h4> Habits: {dateFormated} </h4>
            <Row> {habitDaily ? show_habit_cards(habitDaily,habitData, date) : <h1>Error</h1>} </Row>

        </Container>

    )
}

export default CalendarContainer;
CalendarContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}