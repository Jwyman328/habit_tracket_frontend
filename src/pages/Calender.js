import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Calendar from 'react-calendar';
import HabitCard from '../habit_components/HabitCard';

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
 */
function CalendarContainer(props) {
    let today = new Date()
    let todayFormated = today.toDateString();
    const [date, setDate] = useState(today);
    const [dateFormated, setDateFormated] = useState(todayFormated)
    const [habitData, setHabitData] = useState(null);
    let [habitDaily, setHabitDaily] = useState(null)
    let habit_cards = undefined

    let [token, setToken] = useState(undefined)

    /**
     * On mount call the methods to get the habit and daily habit data with the selected date.
     */
    useEffect(() => {
        fetch_date_habits(date)
        fetch_daily_habits(date)

    }, [])

    /**
     * Gather all the Habits for the date selected.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
    const fetch_date_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate()
        let token = localStorage.getItem('token')
        token ? setToken(token) : setToken(undefined)
        // make a fetch to site 
        let fetchHabitsForDate = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${year}/${month}/${day}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchHabitsForDateJson = await fetchHabitsForDate.json()
        setHabitData(fetchHabitsForDateJson)
    }

    /**
     * Gather all the daily habits for the date clicked.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
    const fetch_daily_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate()
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchDailyHabitsForDate = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/daily_habits/${year}/${month}/${day}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchDailyHabitsForDateJson = await fetchDailyHabitsForDate.json()
        setHabitDaily(fetchDailyHabitsForDateJson)
    }

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
        fetch_date_habits(dateClicked)
        fetch_daily_habits(dateClicked)
        // then send that data to a component 
    }

    /**
     * Create HabitCards for all existing habits for the date selected, using the gathered habitData.
     * @return {Array} -- Array of Bootstrap Columns containing BootStrap cards containing Habit Data for the selected Date.
     */
    const show_habit_cards = () => {
        habit_cards = habitDaily.map((item) => {

            for (let generalhabit in habitData) {
                if (habitData[generalhabit].id == item.habit) {
                    return <HabitCard daily_id={item.id} daily_timed_total={item.timed_total}
                        daily_count_times_done={item.count_times_done_total}
                        daily_completed={item.completed} date_selected={date} id={habitData[generalhabit].id}
                        start_date={habitData[generalhabit].start_date}
                        end_date={habitData[generalhabit].end_date} type_of_habit={habitData[generalhabit].type_of_habit}
                        type_of_goal={habitData[generalhabit].type_of_goal} title={habitData[generalhabit].title}
                        goal_amount={habitData[generalhabit].goal_amount} completed={habitData[generalhabit].completed} />
                }
            }
        })
        return habit_cards
    }


    return (
        <Container>
            {props.loggedIn ? null : <Redirect to='/login' />}
            <Row>
                <Col className='my-3'>
                    <Calendar className='calender centerItem ' value={date} onClickDay={click_date} />
                </Col>
            </Row>
            <h4> Habits: {dateFormated} </h4>
            <Row> {habitDaily ? show_habit_cards() : <h1>Error</h1>} </Row>

        </Container>

    )
}

export default CalendarContainer;
CalendarContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}
