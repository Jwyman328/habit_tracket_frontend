import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';


function ActivityChecked(props) {
    const [displayStartTime, setDisplayStartTime] = useState(undefined)
    const [displayEndTime, setDisplayEndTime] = useState(undefined)

    useEffect(() => {
        //start time format 
        let toDate = new Date(props.start_time)
        const displayDate = toDate.toTimeString()
        const [timeWanted, unwanted] = displayDate.split('G')
        setDisplayStartTime(timeWanted)

        //end time format 
        let toDateEnd = new Date(props.end_time)
        const displayDateEnd = toDateEnd.toTimeString()
        const [timeWantedEnd, unwantedEnd] = displayDateEnd.split('G')
        setDisplayEndTime(timeWantedEnd)

    },[])
    return(
        <div>
            <Card  style={{ width: '100%' }}>
                <Card.Body className='checkedBackground'>
                    <Card.Title>Completed at {displayStartTime}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ActivityChecked;

ActivityChecked.propTypes = {
    activity_id: PropTypes.number,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    total_time: PropTypes.string
}