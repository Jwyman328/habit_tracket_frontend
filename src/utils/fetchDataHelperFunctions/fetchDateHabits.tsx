import React from 'react'
import { setOfDateHabitsModel } from '../../models/habitCalenderModels/fetchDateHabitsModels'

    /**
     * Gather all the Habits for the date selected.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
    const fetchDateHabits = async (dateClicked:Date,setHabitData) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate()
        let token = localStorage.getItem('token')

        let fetchHabitsForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/${year}/${month}/${day}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchHabitsForDateJson:setOfDateHabitsModel = await fetchHabitsForDate.json()
        setHabitData(fetchHabitsForDateJson)
    }

    export default fetchDateHabits;