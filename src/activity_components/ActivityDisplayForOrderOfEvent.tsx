import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import moment from 'moment'




function ActivityDisplayForOrderOfEvent(props) {

    const [displayStartTime, setDisplayStartTime] = useState('')
    const [displayEndTime, setDisplayEndTime] = useState('')


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
            <Card>
                <Card.Body className='checkedBackground'>
                    <Card.Title> {props.title}</Card.Title>
                    <Card.Title>StartTime {displayStartTime}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.end_time !== '' ? <p>EndTime: {displayEndTime}</p>:null } </Card.Subtitle>
                    <Card.Text>
                        total time {props.total_time}
                    </Card.Text>
                </Card.Body>
            </Card>

        </Col>
    )
}

export default  ActivityDisplayForOrderOfEvent;

ActivityDisplayForOrderOfEvent.propTypes = {
    title : PropTypes.string,
    activity_id: PropTypes.number,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    total_time: PropTypes.string,
    stop_button: PropTypes.func.isRequired,

}