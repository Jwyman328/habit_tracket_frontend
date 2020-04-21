import React from 'react'

    /**
     * Gather all the Habits for the date selected.
     * @param {Date} dateClicked -- The date the user selected on the calender.
     */
    const fetchDateHabits = async (dateClicked,setHabitData) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate()
        let token = localStorage.getItem('token')
        //token ? setToken(token) : setToken(undefined)
        // make a fetch to site 
        let fetchHabitsForDate = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${year}/${month}/${day}/`, {
            headers: { Authorization: `JWT ${token}` }
        })
        let fetchHabitsForDateJson = await fetchHabitsForDate.json()
        setHabitData(fetchHabitsForDateJson)
    }

    export default fetchDateHabits;