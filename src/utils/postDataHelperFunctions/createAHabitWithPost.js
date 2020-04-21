import React from 'react';

    /**
     * Make a post request to create a Habit model with the form data.
     * Redirect the user to the calender page after the post has been made.
     */
    const createAHabitWithPost = async (formData, navigate) => {
        let formDataJson = JSON.stringify(formData)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_habit',{method:'POST', mode: 'cors',body:formDataJson,
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}
        );
        let jsonResponse = await getResponse.json()
        // redirect once the habit is mak 
        if (jsonResponse){
            navigate.push('/calender/')
        }
    }

export default (createAHabitWithPost);