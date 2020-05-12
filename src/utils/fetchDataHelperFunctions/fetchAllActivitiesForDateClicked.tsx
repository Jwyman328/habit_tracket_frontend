
import React, { Dispatch } from 'react'
import { tokenModel } from '../../models/authModels/tokenModel'
import { timeTableHttpResponseDataModel } from '../../models/authModels/timeTableModels/timeTableHttpResponseDataModel'

    /**
     * Get all activities for the Date selected.
     * @param {Date} dateClicked -- Date selected on the Calender widget
     */
    const fetchAllActivitiesForDateClicked = async (dateClicked:Date,setallTodaysActivities) => {
        console.log(dateClicked,setallTodaysActivities, 'meat')
        let year:number = dateClicked.getFullYear()
        let month:number = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day:number = dateClicked.getDate() 
        let token:tokenModel = localStorage.getItem('token')
        // make a fetch to site 
        let fetchActivitiesForDate = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/activities/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchActivitiesForDateJson:timeTableHttpResponseDataModel = await fetchActivitiesForDate.json()
        fetchActivitiesForDateJson = fetchActivitiesForDateJson.length === 0? []: fetchActivitiesForDateJson
        setallTodaysActivities(fetchActivitiesForDateJson)
    }

export default fetchAllActivitiesForDateClicked;