import React, {useState, useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';

import ActivityChecked from './ActivityCheckedCard';
import ActivityTimed from './ActivityTimedCard';
 

import { Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


// has start button and stop button 
// start button posts a new activity with habit id, start time of when clicked, end_time=blank
//total_time blank 

// stop button sends a update with activity id, and stop time 

function CreateActivity(props) {
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
    let [totalAccumulatedForDate, setTotalAccumulatedForDate] = useState({accumulated_time:undefined,accumulated_count:undefined})
    //'<int:habit_id>/<int:year>/<int:month>/<int:day>' 
    // get total amounts for this date 
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

    useEffect( ()=> {
        // fetch this individual habits data 
        // if habit data hasnt loaded then go get it 
        if (habitData.id && activity_data===undefined){

            get_habits_activites_for_date_selected()
            get_date_habit_totals()
        }else{
                
            // no habit data therefore go get it 
            get_individual_habit(habitID)
            // set habit activity date 
            let habitActivityDateValue = new Date(habitYear,habitMonth -1, habitDay)
            setHabitActivityDate(habitActivityDateValue)

            // set habit date and current date to date strings and compare if equal
            // if equal user can add activities, if not they can not 
            let today = new Date().toDateString()
            let habit_dateString = habitActivityDateValue.toDateString()
            

            if (today == habit_dateString){
                setAllowAtivityCreation(true)
            }else{
                setAllowAtivityCreation(false)
            }
            
                //
            

        }
        // if the habit data has loaded i can load the activity data
    },[habitData]) //activity_data

    

    const createActivity = async () => {
        // create a checked activity or start a timed activity 
        let now = new Date()
        let end_time_value = undefined
        //end time will vary depending on if it is checked or time 
        if (habitData.type_of_habit === 'checked'){
            let end_time_value = now 
        }else{
            let end_time_value = null
        }
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
        if (habitData.type_of_habit === 'timed'){
            activityComponents = activity_data.map((item) => <ActivityTimed updateHabitData={null} habit_data={habitData} start_time={item.start_time} end_time={item.end_time} total_time={item.total_time} activity_id={item.id} stop_button={finishTimedActivity} />)
        }else{
            activityComponents = activity_data.map((item) => <ActivityChecked start_time={item.start_time} end_time={item.end_time} total_time={item.total_time} activity_id={item.id} />)
        }
    }

    const goal_information = () => {
        // display total goal and say Total goal, and as well add up how close you are to that goal
        // for daily goal, show daily goal amount and then how much is currently acomplished 
        // the goal text 
        let habit_goal_quantity = habitData.type_of_habit == 'timed'? ' hours': ' times'
        let habit_text = habitData.type_of_goal == 'daily'? <h3> Today's goal: {habitData.goal_amount}{ habit_goal_quantity} </h3>: <h3> Total Habit Goal: {habitData.goal_amount} {habit_goal_quantity} </h3>
        //show text for how much has already been completed
        return habit_text
    }
    const current_goal_amount_data = () => {

        let time_total = habitData.type_of_goal =='total'? habitData.current_completed_timed_amount: totalAccumulatedForDate.accumulated_time
        let count_total = habitData.type_of_goal =='total'? habitData.current_times_activity_done: totalAccumulatedForDate.accumulated_count
        // return total habit information
        if (habitData.type_of_goal =='total'){
            const[hours, minutes] = habitData.current_completed_timed_amount? formatTimedAmountAccumulated(habitData.current_completed_timed_amount):[0,0]
        
            let current_total_goal_amount_accumulated = habitData.type_of_habit == 'timed'?<h1> Hrs: {hours} Minutes: {minutes}</h1>:  <h1> Current amount completed  {habitData.current_times_activity_done} </h1>
            
            return current_total_goal_amount_accumulated    
        }else{
            if(totalAccumulatedForDate.accumulated_count){
                const[hours, minutes] =  habitData.current_completed_timed_amount? formatTimedAmountAccumulated( habitData.current_completed_timed_amount):[0,0]
        
                let current_total_goal_amount_accumulated = habitData.type_of_habit == 'timed'?<h1> Hrs: {hours} Minutes: {minutes}</h1>:  <h1> Current amount completed  {totalAccumulatedForDate.accumulated_count} </h1>
                return current_total_goal_amount_accumulated
            }else{
                //
            }

        }

    }

    
    return (
        <div>
            {habitData?<h3>Habit Activity: {habitData.title}</h3>:null} {/*make sure data loaded*/}

            {habitData?<h3>Type: {habitData.type_of_habit}</h3>:null} {/*make sure data loaded*/}
            {habitData? goal_information():null}
            {habitData?current_goal_amount_data():null}

            {/* only allow access to create activity buttons if today is the same day as activity habit selected */}
           { allowAtivityCreation?
                habitData.type_of_habit === 'timed'?
                <div class='timed'> <Button onClick={createOrStartActivity}> Start New Activity </Button><br></br></div>:
                <div class='checked'> <Button onClick={createOrStartActivity}> Activity Done </Button> </div> : null
                
                } 

        <div>
            
           {habitActivityDate?<h1> Current and completed activities for {habitActivityDate.toDateString()} </h1>:null}
            {/* base for a component that will store an activity for a habit of today, so i need to make a fetch call for a  get todays activities for this habit  */}
            
                

            {/* if the activity data exists then make the activity component   */}
            <Container>
                <Row>
                {activity_data ? create_activityComponents():null }
                {/*if the activity components have been made i can display the components */}
                {activityComponents?activityComponents: null}
                </Row>
            </Container>
        
        </div>

        </div>

    )
}

export default CreateActivity;

