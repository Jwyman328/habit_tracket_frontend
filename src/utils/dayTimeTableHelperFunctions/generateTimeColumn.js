import React from 'react';
import  parseHoursMinutes from '../../utils/dayTimeTableHelperFunctions/parseHoursMinutes';
import { Col, Row, Container, Card } from 'react-bootstrap';


const generateTimeColumn = ({
    setfirstTimedEventMinutes,
    setlastTimedEventMinutes,
    allTodaysActivities,
  }) =>{
    // only get events that have been completed, aka have a total time
    let firstTimedEventStartTime = allTodaysActivities[allTodaysActivities.length -1].start_time
    //latest timed event 
    let lastTimedEventEndTime = allTodaysActivities[0].end_time? allTodaysActivities[0].end_time: allTodaysActivities[0].start_time
    let [first_hour,first_minutes] = parseHoursMinutes(firstTimedEventStartTime)
    setfirstTimedEventMinutes(first_minutes)
    let [last_hour,last_minutes] = lastTimedEventEndTime? parseHoursMinutes(lastTimedEventEndTime): parseHoursMinutes(allTodaysActivities[0].start_time)
    setlastTimedEventMinutes(last_minutes)

    //get all hours in a list [9,10,11], aka total number of time rows to have
    let hour_array = []
    while (first_hour <= last_hour + 1){
        hour_array.push(first_hour)
        first_hour += 1
    }
    hour_array = hour_array.reverse()

    let time_rows = hour_array.map( (hour) => (
        <Row style={{height: '15.13rem'}}   >
            <Card className=" border border-info" style={{ width: '18rem', height: '7.565rem' }}  >
                <Card.Body className='timeCard' style={{padding:0  }}>
                    <Card.Text>{hour + ':00'} </Card.Text>
                </Card.Body>
            </Card>
            <Card className=" border border-info timeCard" style={{ width: '18rem', height: '7.565rem' }}  >
                <Card.Body style={{padding:0  }}>
                <Card.Text style={{padding:0  }} className="align-top justify-content-center d-flex" > {(hour - 1) + ':30'} </Card.Text>
                </Card.Body>
            </Card>
    </Row>))
    return  time_rows
}

export default generateTimeColumn;