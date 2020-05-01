import React, {useState, useEffect} from 'react';
import { Col,Row,Container } from 'react-bootstrap';

import Calendar from 'react-calendar';
import HabitCard from '../habit_components/HabitCard.tsx';

import ActivityDisplayForOrderOfEvent from '../activity_components/ActivityDisplayForOrderOfEvent'

/**
 * 
 * @var {Date} today the current date the user is on the app.
 * @var {String} todayFormated the today variable in string form.
 * @var {Date} date the date selected by the user, set to today's date to start.
 * @var {String} dateFormated the selected date in string format.
 * @var {Array} habitData all of the habits for the selected date.
 * @var {Array} allTodaysActivities all of the activities done on the selected date.
 * @var {}
 */
function TodaysActivitiesInOrder(){
    let today = new Date()
    let todayFormated = today.toDateString();
    const [date, setDate] = useState(today);
    const [dateFormated, setDateFormated] = useState(todayFormated)
    const [habitData, setHabitData] = useState(null);
    let [habitDaily, setHabitDaily] = useState(null)
    let [allTodaysActivities, setAllTodaysActivities] = useState(null)
    let new_habit_cards = undefined

    /**
     * On mount fetch today's habit, and activity data.
     */
    useEffect( () => {
        // on mount get and display the habits for today 
        fetch_date_habits(date)
        fetch_daily_habits(date)
        get_all_activities_for_today(date)

    },[])

    /**
     * Set AllTodaysActivities for the selected date.
     * 
     */
    const get_all_activities_for_today = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchActivitiesForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/activities/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchActivitiesForDateJson = await fetchActivitiesForDate.json()
        setAllTodaysActivities(fetchActivitiesForDateJson)
    }

    /**
     * Set the ongoing habits for the current date. 
     */
    const fetch_date_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchHabitsForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchHabitsForDateJson = await fetchHabitsForDate.json()
        setHabitData(fetchHabitsForDateJson)
    }

    /**
     * Set the on going 
     * @param {Date} dateClicked  the date clicked by the user.
     */
    const fetch_daily_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchDailyHabitsForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/daily_habits/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchDailyHabitsForDateJson = await fetchDailyHabitsForDate.json()
        setHabitDaily(fetchDailyHabitsForDateJson)
    }

    /**
     * Fetch all data related to the new date, when a new date is clicked.
     * @param {Date} dateClicked  the date clicked by the user.
     * 
     */
    const click_date = (dateClicked)=> {
        setDate(dateClicked)
        let dateClickedFormated = dateClicked.toDateString()
        setDateFormated(dateClickedFormated)
        // when i click on a day it should show the habits set for that day 
        // so make a fetch call and get all the habits for that day 
        fetch_date_habits(dateClicked)
        fetch_daily_habits(dateClicked)
        get_all_activities_for_today(dateClicked)
         // then send that data to a component 
    }
    
    /**
     * Create a card representing each current habit for the selected date.
     */
    const show_new_habit_cards = () => {
            new_habit_cards = habitDaily.map((item) => {

            for (let generalhabit in habitData){
                if (habitData[generalhabit].id == item.habit){
                    return <HabitCard daily_id={item.id} daily_timed_total={item.timed_total} daily_count_times_done={item.count_times_done_total} daily_completed={item.completed} date_selected={date} id={habitData[generalhabit].id} start_date={habitData[generalhabit].start_date} 
                    end_date={habitData[generalhabit].end_date} type_of_habit={habitData[generalhabit].type_of_habit} type_of_goal={habitData[generalhabit].type_of_goal} title={habitData[generalhabit].title} goal_amount={habitData[generalhabit].goal_amount} completed={habitData[generalhabit].completed} />
                }
        } }
            
            )
            return new_habit_cards
        }
    const show_activity_cards = () => {
        let activityCards = allTodaysActivities.map((item) => {
            return <ActivityDisplayForOrderOfEvent start_time = {item.start_time} end_time = {item.end_time} title = {item.title} />
        })
        return activityCards
    }


    return (
        <Container>
            <Row>
                <Col className = 'my-3'>
                    <Calendar className='calender centerItem' value={date} onClickDay={click_date}  /> 
                </Col>
            </Row>
            <h1> Habits for {dateFormated} </h1>
            <Row><Col>{allTodaysActivities? show_activity_cards(): null} </Col> </Row>
        </Container>

    )
}

export default TodaysActivitiesInOrder;