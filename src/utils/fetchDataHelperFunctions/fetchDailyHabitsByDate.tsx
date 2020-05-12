import React from 'react';
import { setOfDailyHabitModels } from '../../models/habitCalenderModels/fetchDailyHabitsByDateModel';

    /**
     * Gather all the daily habits for the date clicked.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
async function fetchDailyHabitsByDate(dateClicked:Date, setHabitDaily:any) {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate()
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchDailyHabitsForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/daily_habits/${year}/${month}/${day}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchDailyHabitsForDateJson:setOfDailyHabitModels = await fetchDailyHabitsForDate.json()
        setHabitDaily(fetchDailyHabitsForDateJson)
    }


export default fetchDailyHabitsByDate;