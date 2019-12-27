import React, {useState, useEffect} from 'react';
import { Col,Row,Container } from 'react-bootstrap';

import Calendar from 'react-calendar';
import HabitCard from '../habit_components/HabitCard';

import ActivityDisplayForOrderOfEvent from '../activity_components/ActivityDisplayForOrderOfEvent'

function TodaysActivitiesInOrder(){
    let today = new Date()
    let todayFormated = today.toDateString();
    const [date, setDate] = useState(today);
    const [dateFormated, setDateFormated] = useState(todayFormated)
    const [habitData, setHabitData] = useState(null);
    let [habitDailyAndTotalData, setHabitDailyAndTotalData] = useState(null)
    let [habitDaily, setHabitDaily] = useState(null)
    let [habitGeneral, setHabitGeneral] = useState([])
    let [allTodaysActivities, setAllTodaysActivities] = useState(null)
    let habit_cards = undefined;
    let new_habit_cards = undefined

    useEffect( () => {
        // on mount get and display the habits for today 
        fetch_date_habits(date)
        fetch_daily_habits(date)
        get_all_activities_for_today(date)

    },[])

    const get_all_activities_for_today = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchActivitiesForDate = await fetch(`http://127.0.0.1:8000/habits/activities/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchActivitiesForDateJson = await fetchActivitiesForDate.json()
        setAllTodaysActivities(fetchActivitiesForDateJson)
    }

    const fetch_date_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchHabitsForDate = await fetch(`http://127.0.0.1:8000/habits/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchHabitsForDateJson = await fetchHabitsForDate.json()
        setHabitData(fetchHabitsForDateJson)
    }

    const fetch_daily_habits = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchDailyHabitsForDate = await fetch(`http://127.0.0.1:8000/habits/daily_habits/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchDailyHabitsForDateJson = await fetchDailyHabitsForDate.json()
        //setHabitDailyAndTotalData(fetchDailyHabitsForDateJson)
        setHabitDaily(fetchDailyHabitsForDateJson)
    }

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
            <Row> { /*habitDaily?  show_new_habit_cards(): <h1>doesnt exist</h1> */} </Row>
            <Row><Col>{allTodaysActivities? show_activity_cards(): null} </Col> </Row>
        </Container>

    )
}

export default TodaysActivitiesInOrder;