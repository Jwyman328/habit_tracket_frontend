import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';




function ActivityTimed(props) {

    const handleStop = () => {
        props.stop_button(props.activity_id)
        
        
        let toDateEnd = new Date()
        let timeTotal = props.start_time - toDateEnd        
        const displayDateEnd = toDateEnd.toTimeString()
        const [timeWantedEnd, unwantedEnd] = displayDateEnd.split('G')
        setDisplayEndTime(timeWantedEnd)

    }

    const [totalTime, setTotalTime] = useState(null)
    const [startTimeFormated, setStartTimeFormated] = useState(null)

    const [displayStartTime, setDisplayStartTime] = useState(undefined)
    const [displayEndTime, setDisplayEndTime] = useState(undefined)




    useEffect(() => {
        let toDate = new Date(props.start_time)
        const displayDate = toDate.toTimeString()
        const [timeWanted, unwanted] = displayDate.split('G')
        setDisplayStartTime(timeWanted)

        //end time format 
        if (props.end_time){
            let toDateEnd = new Date(props.end_time)
            const displayDateEnd = toDateEnd.toTimeString()
            const [timeWantedEnd, unwantedEnd] = displayDateEnd.split('G')
            setDisplayEndTime(timeWantedEnd)
        }


    },[])

    return(
        <Col>
            <Card >
                <Card.Body className='checkedBackground'>
                    <Card.Subtitle className="mb-2 align-text-left  d-flex">Start Time: {displayStartTime}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 align-text-left  d-flex">{props.end_time ? <p>End Time: {displayEndTime}</p>:<Button className="btn btn-danger" onClick={handleStop}>Stop</Button> } </Card.Subtitle>
                    <Card.Subtitle className="mb-2 align-text-left  d-flex">
                    {props.total_time? <p>Total Time: {props.total_time} </p> : null }
                    </Card.Subtitle>
                </Card.Body>
            </Card>

        </Col>
    )
}

export default ActivityTimed;

ActivityTimed.propTypes = {
    activity_id: PropTypes.number,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    total_time: PropTypes.string,
    stop_button: PropTypes.func.isRequired,

}