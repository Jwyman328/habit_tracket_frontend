import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect,useRouteMatch} from 'react-router-dom';

import ActivityChecked from './ActivityCheckedCard';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import PieChart from '../general_components/ChartPie';

// has start button and stop button 
// start button posts a new activity with habit id, start time of when clicked, end_time=blank
//total_time blank 

// stop button sends a update with activity id, and stop time 

function DailyCheckCreateActivity(props) {
    let match = useRouteMatch();
    let habitID = match.params.id // use this param to ask for this habit and create activities with it 
    let habitYear = match.params.year
    let habitMonth = match.params.month 
    let habitDay = match.params.day
    let dailyHabitId = match.params.daily_id

    let activityComponents = undefined

    let [activity_data, setActivityData] = useState(undefined)
    let [habitData, setHabitData] = useState({type_of_habit:''})
    let [dailyHabitData, setDailyHabitData] = useState(null)
    let [habitActivityDate, setHabitActivityDate] = useState(undefined)
    let [allowAtivityCreation, setAllowAtivityCreation] = useState(undefined) // only allow if today is same as habitActivityDate 
    let [totalAccumulatedForDate, setTotalAccumulatedForDate] = useState({accumulated_time:undefined,accumulated_count:undefined})

    //'<int:habit_id>/<int:year>/<int:month>/<int:day>' 
    // get total amounts for this date 
    const get_daily_habit_totals = async() => {
        let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/daily_habits/${dailyHabitId}`,{
        headers:{ Authorization: `JWT ${token}`}}
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setDailyHabitData(jsonResponse)
    }

    const get_date_habit_totals = async() => {
        let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${habitID}/${habitYear}/${habitMonth}/${habitDay}`,{
        headers:{ Authorization: `JWT ${token}`}}
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setTotalAccumulatedForDate(jsonResponse)
    }

    // pass habit data 
    // go get the habit so i have its data 
    const get_individual_habit = async(id) => {
        let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${id}/`,{
        headers:{ Authorization: `JWT ${token}`}}
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setHabitData(jsonResponse)
    }
    useEffect( () => {
        get_individual_habit(habitID)
        let habitActivityDateValue = new Date(habitYear,habitMonth -1, habitDay)
        setHabitActivityDate(habitActivityDateValue)
        get_habits_activites_for_date_selected()
        get_date_habit_totals()
        get_daily_habit_totals()

        // set habit date and current date to date strings and compare if equal
        // if equal user can add activities, if not they can not 
        let today = new Date().toDateString()
        let habit_dateString = habitActivityDateValue.toDateString()

        if (today == habit_dateString){
            setAllowAtivityCreation(true)
        }else{
            setAllowAtivityCreation(false)
        }
    }, [])

    useEffect( ()=> {
        // fetch this individual habits data 
        // if habit data hasnt loaded then go get it 

        // if the habit data has loaded i can load the activity data
        get_date_habit_totals()
        get_daily_habit_totals()

    },[activity_data]) //activity_data

    const createActivity = async () => {
        // create a checked activity or start a timed activity 
        let now = new Date()
        let end_time_value = undefined
        //end time will vary depending on if it is checked or time 
        
        let post_data_formated = {habit_id:habitData.id, start_time:now, end_time:end_time_value, total_time: null} //record time it was done 
        let postDataJson = JSON.stringify(post_data_formated)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_activity',{method:'POST', body:postDataJson,
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}
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
    
        return [year, month, day];//.join('-')
    }

    function formatTimedAmountAccumulated(timeAsString){
       if (timeAsString){
        let [hours,minutes,rest] =  timeAsString.split(':')
        return[hours,minutes]
       }

    }

    const get_habits_activites_for_date_selected = async() =>{
        // in real site thise date would be whatever this
        //pages date is props.dateClicked

        // change this to be a state variable 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        
        let fetchHabitDateActivities = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${habitID}/activities/${habitYear}/${habitMonth}/${habitDay}/`,{
            headers:{ Authorization: `JWT ${token}`}})
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

        let habit_text = <h5> Today's goal: {habitData.goal_amount} times </h5>
        //show text for how much has already been completed
        return habit_text
    }
    
    return (
        <div>
            <Container>
            {props.loggedIn?null: <Redirect to='/login'/>}
                <Row>
                
                    <Col>
                        <Card  style={{ width: '100%' }}>
                            <Card.Body className={habitData && dailyHabitData? habitData.type_of_goal =='total'? habitData.completed? 'greenCard': 'redCard': dailyHabitData.completed? 'greenCard': 'redCard': null} >
                                
                                {/*make sure data loaded*/}

                                <Card.Subtitle className="mb-4  align-text-left  d-flex ">{habitData && dailyHabitData ?<h5 className={habitData.type_of_goal =='total'? habitData.completed? 'greenTitle': 'redTitle': dailyHabitData.completed? 'greenTitle': 'redTitle'}> Habit: {habitData.title}</h5>:null} {/*make sure data loaded*/}</Card.Subtitle>
                                <Card.Subtitle className="mb-4  align-text-left  d-flex"> {habitActivityDate?<h5> Date: {habitActivityDate.toDateString()} </h5>:null} </Card.Subtitle>
                                <Card.Subtitle className="mb-4  align-text-left  d-flex">{habitData? goal_information():null}</Card.Subtitle>
                                <Card.Subtitle className="mb-4  align-text-left  d-flex">{habitData? <h5> Completed: {totalAccumulatedForDate.accumulated_count}  times </h5>:null} </Card.Subtitle>
                                { allowAtivityCreation?
                                <div class='timed'> <Button style={{ width: '100%'} } className="mb-4 align-text-center centerItem  d-flex btn btn-success" onClick={createOrStartActivity}> Do Activity </Button><br></br></div>:null}
                                {/* base for a component that will store an activity for a habit of today, so i need to make a fetch call for a  get todays activities for this habit  */}
                                {/* if the activity data exists then make the activity component   */}
                                <Row>
                                    {activity_data ? create_activityComponents():null }
                                    {/*if the activity components have been made i can display the components */}
                                    {activityComponents?activityComponents: null}
                                </Row>
                            </Card.Body>
 
                        </Card>
                    </Col>
                   
                </Row>

                {totalAccumulatedForDate.accumulated_count && habitData? <PieChart title={habitData.title} completed={totalAccumulatedForDate.accumulated_count} total={habitData.goal_amount} />: null }

            </Container>

                {/* only allow access to create activity buttons if today is the same day as activity habit selected */}
        </div>
       
    )
}

export default DailyCheckCreateActivity;
DailyCheckCreateActivity.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}


