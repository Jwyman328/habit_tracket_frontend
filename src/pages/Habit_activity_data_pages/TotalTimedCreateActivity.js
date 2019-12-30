import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Redirect,useRouteMatch} from 'react-router-dom';

import ActivityChecked from '../../activity_components/ActivityCheckedCard';
import ActivityTimed from '../../activity_components/ActivityTimedCard';


import {  Container, Row, Col } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';

import PieChart from '../../general_components/ChartPie';


function DailyTimedCreateActivity(props) {
    let match = useRouteMatch();
    let habitID = match.params.id // use this param to ask for this habit and create activities with it 
    let habitYear = match.params.year
    let habitMonth = match.params.month 
    let habitDay = match.params.day
    let activityComponents = undefined
    let [activity_data, setActivityData] = useState(undefined)
    let [habitData, setHabitData] = useState({type_of_habit:''})
    let [habitActivityDate, setHabitActivityDate] = useState(undefined)
    let [allowAtivityCreation, setAllowAtivityCreation] = useState(undefined) // only allow if today is same as habitActivityDate 
    let [totalAccumulatedTimeHours, setTotalAccumulatedTimeHours] = useState(0)
    let [totalAccumulatedTimeMinutes, setTotalAccumulatedTimeMinutes] = useState(0)

    //'<int:habit_id>/<int:year>/<int:month>/<int:day>' 
    // get total amounts for this date 

    // get habit data
    const get_individual_habit = async(id) => {
        let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${id}/`,{
        headers:{ Authorization: `JWT ${token}`}}
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setHabitData(jsonResponse)
        const[hours, minutes] =  jsonResponse.current_completed_timed_amount ? formatTimedAmountAccumulated( jsonResponse.current_completed_timed_amount ):[0,0]
        setTotalAccumulatedTimeHours(hours)
        setTotalAccumulatedTimeMinutes(minutes)
    }
    useEffect( () => {
        get_individual_habit(habitID)
        let habitActivityDateValue = new Date(habitYear,habitMonth -1, habitDay)
        setHabitActivityDate(habitActivityDateValue)
        get_habits_activites_for_date_selected()

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
        get_individual_habit(habitID)
        //get_date_habit_totals()

    },[activity_data]) //activity_data

    const createActivity = async () => {
        // create a checked activity or start a timed activity 
        let now = new Date()
        let end_time_value = undefined
        //end time will vary depending on if it is checked or time 
        
        let post_data_formated = {habit_id:habitData.id, start_time:now, end_time:end_time_value, total_time: null} //record time it was done 
        let postDataJson = JSON.stringify(post_data_formated)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_activity',{method:'POST', mode: 'cors',body:postDataJson,
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

    const updateActivity = async(activity_id) =>{
        // figure out which activity id i am dealing with 
        // should have a box(components) of current activities, and a box of create new activity 
        // make a put call here 
        // to 'activities/update/<int:activity_id>/<int:year>/<int:month>/<int:day>/<int:hr>/<int:minute>/'
        let now = new Date()
        let [year, month, day] = formatDateMMYYDD(now)
        let hours = now.getHours()
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        

        //let post_data_formated = {habit_id:habitData.id, start_time:now, end_time:end_time_value, total_time: null} //record time it was done 
        //let postDataJson = JSON.stringify(post_data_formated)
        let token = localStorage.getItem('token')
        let putResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/activities/update/${activity_id}/${year}/${month}/${day}/${hours}/${minutes}/${seconds}/`,{method:'PUT', mode: 'cors', //body:postDataJson
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}});
        
        let jsonResponse = await putResponse.json()
        // get the habit activities for this day again because the data has changed
        get_habits_activites_for_date_selected()
    }

    const finishTimedActivity = (activity_id) => {
        // call a method that updates an existing activity
        updateActivity(activity_id)
        // every time you update the activity you need to update the activity components
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
            activityComponents = activity_data.map((item) => <ActivityTimed updateHabitData={null} habit_data={habitData} start_time={item.start_time} end_time={item.end_time} total_time={item.total_time} activity_id={item.id} stop_button={finishTimedActivity} />)
            activityComponents.reverse()
        }

    const goal_information = () => {
        // display total goal and say Total goal, and as well add up how close you are to that goal
        // for daily goal, show daily goal amount and then how much is currently acomplished 
        // the goal text 

        let habit_text = <h5> Total Goal: {habitData.goal_amount} hours </h5>
        //show text for how much has already been completed
        return habit_text
    }
    
    return (
        <div>
            <Container>
            {props.loggedIn?null: <Redirect to='/login'/>}

                <Row>
                
                    <Col>
                        <Card style={{ width: '100%' }}>
                            <Card.Body className={habitData? habitData.completed?'greenCard': 'redCard': null}>
                                <Card.Subtitle className="mb-4 align-text-center  d-flex ">{habitData?<h5 className={ habitData.completed? 'greenTitle': 'redTitle'}>Habit: {habitData.title}</h5>:null} {/*make sure data loaded*/}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-center  d-flex"> {habitActivityDate?<h5> Date: {habitActivityDate.toDateString()} </h5>:null} </Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-center  d-flex">{habitData? goal_information():null}{/*make sure data loaded*/}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 align-text-left d-flex"> {habitData? <h5>Total: Hrs: {totalAccumulatedTimeHours} Minutes: {totalAccumulatedTimeMinutes} </h5>:null}  </Card.Subtitle>
                                {/* only allow access to create activity buttons if today is the same day as activity habit selected */}
                                { allowAtivityCreation?
                                <div class='timed'> <Button style={{ width: '100%'} } className="mb-4 align-text-center  d-flex btn btn-success" onClick={createOrStartActivity}> Start New Activity </Button><br></br></div>:null}
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
                { totalAccumulatedTimeMinutes && habitData? <PieChart title={habitData.title} completed={(parseFloat(totalAccumulatedTimeHours) * 60) + parseFloat(totalAccumulatedTimeMinutes)} total={habitData.goal_amount * 60} />: null  }
            </Container>
        </div>
       
    )
}

export default DailyTimedCreateActivity;
DailyTimedCreateActivity.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}
