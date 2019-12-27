import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function CreateActivityButton(props) {



    const createActivity = async () => {
        // create a checked activity or start a timed activity 
        let now = new Date()
        let end_time_value = undefined
        //end time will vary depending on if it is checked or time 
        if (habitData.type_of_habit ==== 'checked'){
            let end_time_value = now 
        }else{
            let end_time_value = null
        }
        let post_data_formated = {habit_id:habitData.id, start_time:now, end_time:end_time_value, total_time: null} //record time it was done 
        let postDataJson = JSON.stringify(post_data_formated)
        let token = localStorage.getItem('token')
        let getResponse = await fetch('http://shrouded-ravine-06737.herokuapp.com/habits/create_activity',{method:'POST', mode: 'no-cors',body:postDataJson,
        headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}}
        );
        let jsonResponse = await getResponse.json()
        // since the activities were changed, rerender the data 
        get_habits_activites_for_today()

    }

    const createOrStartActivity = () => {
        createActivity()
        // create activity here 
    }

    return (
        <div>
                <div > <Button onClick={createOrStartActivity}> {props.buttonTitle} </Button><br></br></div>: {/*Activity Done  Start New Activity */}

        </div>
    )
}

export default CreateActivityButton;

CreateActivityButton.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    habitData: PropTypes.object,
    end_time_value: PropTypes.string, 
    end_time_value_change: PropTypes.func, // end time value change set function 

}