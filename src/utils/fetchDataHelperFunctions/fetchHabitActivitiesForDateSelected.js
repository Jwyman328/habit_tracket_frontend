import React from 'react';

async function fetchHabitActivitiesForDateSelected({
    habitID,
    habitYear,
    habitMonth,
    habitDay,
    activityComponents,
    activity_data,
    setActivityData,
    habitData,
    setHabitData,
    habitActivityDate, setHabitActivityDate,
    allowAtivityCreation, setAllowAtivityCreation,
    totalAccumulatedForDate, setTotalAccumulatedForDate
  }) {
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

export default fetchHabitActivitiesForDateSelected;