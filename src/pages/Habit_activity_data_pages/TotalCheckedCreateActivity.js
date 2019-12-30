import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useRouteMatch } from 'react-router-dom';

import ActivityChecked from '../../activity_components/ActivityCheckedCard';
import ActivityTimed from '../../activity_components/ActivityTimedCard';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import PieChart from '../../general_components/ChartPie';

// has start button and stop button 
// start button posts a new activity with habit id, start time of when clicked, end_time=blank
//total_time blank 

// stop button sends a update with activity id, and stop time 
/**
 * 
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out.
 * @var {Array} activityComponents - Array of cards displaying each individual activity and its data.
 * @var {Array} activity_data - Array of objects containing data for all the activities for the selected habit.
 * @var {Object} habitData - Object containing data for the selected habit.
 * @var {Date} habitActivityDate - Date of the selected habit.
 * @var {Bool} allowAtivityCreation - Boolean representing if the habit activity date is set in order to start displaying data.
 */
function TotalCheckedCreateActivity(props) {
    let match = useRouteMatch();
    let habitID = match.params.id // use this param to ask for this habit and create activities with it 
    let habitYear = match.params.year
    let habitMonth = match.params.month
    let habitDay = match.params.day

    let activityComponents = undefined

    let [activity_data, setActivityData] = useState(undefined)
    let [habitData, setHabitData] = useState({ type_of_habit: '' })
    let [habitActivityDate, setHabitActivityDate] = useState(undefined)
    let [allowAtivityCreation, setAllowAtivityCreation] = useState(undefined) // only allow if today is same as habitActivityDate 
    //'<int:habit_id>/<int:year>/<int:month>/<int:day>' 
    // get total amounts for this date 

    // pass habit data 
    // go get the habit so i have its data 
    const get_individual_habit = async (id) => {
        let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${id}/`, {
            headers: { Authorization: `JWT ${token}` }
        }
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setHabitData(jsonResponse)
    }
    useEffect(() => {
        get_individual_habit(habitID)
        let habitActivityDateValue = new Date(habitYear, habitMonth - 1, habitDay)
        setHabitActivityDate(habitActivityDateValue)
        get_habits_activites_for_date_selected()

        // set habit date and current date to date strings and compare if equal
        // if equal user can add activities, if not they can not 
        let today = new Date().toDateString()
        let habit_dateString = habitActivityDateValue.toDateString()

        if (today == habit_dateString) {
            setAllowAtivityCreation(true)
        } else {
            setAllowAtivityCreation(false)
        }
    }, [])

    useEffect(() => {
        // fetch this individual habits data 
        // if habit data hasnt loaded then go get it 

        // if the habit data has loaded i can load the activity data
        get_individual_habit(habitID)
        //get_habits_activites_for_date_selected() // maybe too 

    }, [activity_data]) //activity_data

    const createActivity = async () => {
        // create a checked activity or start a timed activity 
        let now = new Date()
        let end_time_value = undefined
        //end time will vary depending on if it is checked or time 

        let post_data_formated = { habit_id: habitData.id, start_time: now, end_time: end_time_value, total_time: null } //record time it was done 
        let postDataJson = JSON.stringify(post_data_formated)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_activity', {
            method: 'POST', mode: 'cors', body: postDataJson,
            headers: { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' }
        }
        );
        let jsonResponse = await getResponse.json()
        // since the activities were changed, rerender the data 
        get_habits_activites_for_date_selected()

    }

    const createOrStartActivity = () => {
        createActivity()
        // create activity here 
    }

    function formatDateMMYYDD(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day];
    }

    function formatTimedAmountAccumulated(timeAsString) {
        if (timeAsString) {
            let [hours, minutes, rest] = timeAsString.split(':')
            return [hours, minutes]
        }

    }

    const get_habits_activites_for_date_selected = async () => {
        // in real site thise date would be whatever this
        //pages date is props.dateClicked

        // change this to be a state variable 
        let token = localStorage.getItem('token')
        // make a fetch to site 

        let fetchHabitDateActivities = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${habitID}/activities/${habitYear}/${habitMonth}/${habitDay}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchHabitDateActivitiesJson = await fetchHabitDateActivities.json()
        setActivityData(fetchHabitDateActivitiesJson)

        // map the activities into a component 

    }

    const create_activityComponents = () => {
        activityComponents = activity_data.map((item) => <ActivityChecked start_time={item.start_time} end_time={item.end_time} total_time={item.total_time} activity_id={item.id} />)
    }

    const goal_information = () => {
        // display total goal and say Total goal, and as well add up how close you are to that goal
        // for daily goal, show daily goal amount and then how much is currently acomplished 
        // the goal text 
        let habit_text = <h5> Total Goal: {habitData.goal_amount} times </h5>
        //show text for how much has already been completed
        return habit_text
    }

    return (
        <div>
            <Container>
                {props.loggedIn ? null : <Redirect to='/login' />}
                <Row>

                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Body className={habitData ? habitData.completed ? 'greenCard' : 'redCard' : null}>
                                {/*make sure data loaded*/}

                                <Card.Subtitle className="mb-4 align-text-left  d-flex "> {habitData ? <h5 className={habitData.completed ? 'greenTitle' : 'redTitle'}>Habit:{habitData.title}</h5> : null}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-left  d-flex"> {habitActivityDate ? <h5> Date: {habitActivityDate.toDateString()} </h5> : null} </Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-left  d-flex"> {habitData ? goal_information() : null}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-left  d-flex">{habitData ? <h5> Completed: {habitData.current_times_activity_done} times </h5> : null} </Card.Subtitle>
                                {allowAtivityCreation ?
                                    <div class='timed'> <Button style={{ width: '100%' }} className="mb-4 align-text-left  d-flex btn btn-success" onClick={createOrStartActivity}> Do Activity </Button><br></br></div> : null}
                                {/* base for a component that will store an activity for a habit of today, so i need to make a fetch call for a  get todays activities for this habit  */}
                                {/* if the activity data exists then make the activity component   */}
                                <Row>
                                    {activity_data ? create_activityComponents() : null}
                                    {/*if the activity components have been made i can display the components */}
                                    {activityComponents ? activityComponents : null}
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>

                </Row>
                {habitData.current_times_activity_done && habitData.goal_amount ? <PieChart title={habitData.title} completed={habitData.current_times_activity_done} total={habitData.goal_amount} /> : null}

            </Container>
        </div>

    )
}

export default TotalCheckedCreateActivity;
TotalCheckedCreateActivity.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}

