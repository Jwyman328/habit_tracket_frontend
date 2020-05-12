

import React from 'react';

async function updateActivity(activity_id) {
        // figure out which activity id i am dealing with 
        // should have a box(components) of current activities, and a box of create new activity 
        // make a put call here 
        // to 'activities/update/<int:activity_id>/<int:year>/<int:month>/<int:day>/<int:hr>/<int:minute>/'
        let now = new Date()
        let [year, month, day] = formatDateMMYYDD(now)
        let hours = now.getHours()
        let minutes = now.getMinutes()
        let seconds = now.getSeconds()
        
        let token = localStorage.getItem('token')
        let putResponse = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/activities/update/${activity_id}/${year}/${month}/${day}/${hours}/${minutes}/${seconds}/`,{method:'PUT', mode: 'cors', //body:postDataJson
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}});
        
        let jsonResponse = await putResponse.json()
        // get the habit activities for this day again because the data has changed
        get_habits_activites_for_date_selected()
    
}

export default updateActivity;