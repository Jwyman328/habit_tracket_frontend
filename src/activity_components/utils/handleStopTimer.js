import React from 'react';

function handleStopTimer(props,setDisplayEndTime) {
   
        props.stop_button(props.activity_id);
        let toDateEnd = new Date();
        let timeTotal = props.start_time - toDateEnd;
        const displayDateEnd = toDateEnd.toTimeString();
        const [timeWantedEnd, unwantedEnd] = displayDateEnd.split("G");
        setDisplayEndTime(timeWantedEnd);
};

export default handleStopTimer;