import React from 'react';

function fetchIndividualHabit(setHabitData, id) {
    let token = localStorage.getItem('token')
        let getResponse = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/${id}/`,{
        headers:{ Authorization: `JWT ${token}`}}
        );
        let jsonResponse = await getResponse.json()
        // set data to state 
        setHabitData(jsonResponse)
}

export default fetchIndividualHabit;