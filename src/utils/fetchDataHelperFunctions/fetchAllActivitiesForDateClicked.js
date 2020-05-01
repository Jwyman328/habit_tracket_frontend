
import React from 'react'

    /**
     * Get all activities for the Date selected.
     * @param {Date} dateClicked -- Date selected on the Calender widget
     */
    const fetchAllActivitiesForDateClicked = async (dateClicked,setallTodaysActivities ) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchActivitiesForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/activities/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchActivitiesForDateJson = await fetchActivitiesForDate.json()
        fetchActivitiesForDateJson = fetchActivitiesForDateJson.length === 0? undefined: fetchActivitiesForDateJson
        setallTodaysActivities(fetchActivitiesForDateJson)
    }

export default fetchAllActivitiesForDateClicked;