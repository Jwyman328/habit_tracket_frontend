 import React from 'react'
 
 // get total amounts for this date 
 const fetchDateHabitTotals = async(habitID,habitYear,habitMonth,habitDay, setTotalAccumulatedForDate) => {
    let token = localStorage.getItem('token')
    let getResponse = await fetch(`https://shrouded-ravine-06737.herokuapp.com/habits/${habitID}/${habitYear}/${habitMonth}/${habitDay}`,{
    headers:{ Authorization: `JWT ${token}`}}
    );
    let jsonResponse = await getResponse.json()
    // set data to state 
    setTotalAccumulatedForDate(jsonResponse)
}

export default fetchDateHabitTotals;