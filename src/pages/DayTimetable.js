import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import { Col, Row, Container, Card } from 'react-bootstrap';

import Calendar from 'react-calendar';
import useGetDayTimeTableState from './customHooks/useGetDayTimeTableState';

//helper functions 
import fetchAllActivitiesForDateClicked from '../utils/fetchDataHelperFunctions/fetchAllActivitiesForDateClicked';
import generateHeightOfDayTimeTable from '../utils/dayTimeTableHelperFunctions/generateHeightOfDayTimetable'
import parseHoursMinutes from '../utils/dayTimeTableHelperFunctions/parseHoursMinutes';
import formatDateTimetoTime from '../utils/dayTimeTableHelperFunctions/formatDateTimeToTime';
import totalTimeToMinutes from '../utils/dayTimeTableHelperFunctions/totalTimeToMinutes';

/**
 * show a column of times and a corresponding column of checked and timed activities spanning their total time for a specific date.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 * @var {Date}  today - the current date.
 * @var {String} todayFormated - the current date formatted as a readable string value.
 * @var {String} dateFormated - the user selected date as a readable string value.
 * @var {Date} date - the user selected date as a Date value.
 * @var {Number} firstTimedEventMinutes - the amount of minutes from the first hour that the first timed event starts. Ej. 36, if first event time is 9:36.
 * @var {Number} lastTimedEventMinutes - the amount of minutes from the last hour to the last timed event. Ej. 24, if last event time is 9:36.
 * @var {Number} firstEventMinutes - the amount of minutes from the first hour that the first event(any type) starts. Ej. 36, if first event time is 9:36.
 * @var {Array} allTodaysActivities - Array of objects containing all timed.
 * @var {Array} timeRows - Array of cards representing 30 minutes blocks of time spaning all user activities.
 * @var {Array} eventRows - Array of cards representing an activies length of time.
 * 
 */
function DayTimeTable(props) {
    const {
        dateFormated,
        setDateFormated,
        date,
        setDate,
        firstTimedEventMinutes,
        setfirstTimedEventMinutes,
        lastTimedEventMinutes,
        setlastTimedEventMinutes,
        firstEventMinutes,
        setfirstEventMinutes,
        allTodaysActivities,
        setallTodaysActivities,
        timeRows,
        setTimeRows,
        eventRows,
        setEventRows,
        today
      } = useGetDayTimeTableState();


    /**
     * Send the date clicked to the corresponding methods to gather the date's activity data.
     * @param {Date} dateClicked -- Date selected on the Calender widget
     */
    const click_date = (dateClicked)=> {
        setDateFormated(dateClicked.toDateString())
        setDate(dateClicked)
        let dateClickedFormated = dateClicked.toDateString()
        setDateFormated(dateClickedFormated)
        // when i click on a day it should show the habits set for that day 
        // so make a fetch call and get all the habits for that day 
        fetchAllActivitiesForDateClicked(dateClicked,setallTodaysActivities)
         // then send that data to a component 
    }

    /**
     * Generate rows of columns representing 30 minute blocks for activity columns to pair next to.
     * @return {Array} -- Array of rows containing columns representing 30 minute blocks.
     */
    const generate_time_column = () =>{
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

    /**
     * Generate an Array of rows. The rows will either represent the total time of an event or the 
        * time spend between two events, aka time while no event was happening.
     * @return {Array} -- Return Array of rows, with each row representing an activity with the height depending on total time.
     */
    const generate_timed_event_column = () => {
        // the minutes of the start time of the first activity + 60 will be the height of the first block
        let first_row_height = generateHeightOfDayTimeTable(firstEventMinutes + 60)

        // last row will be last activity's minutes - 60
        let last_event_minutes_in_the_hour = 60 - lastTimedEventMinutes
        let last_row_height = generateHeightOfDayTimeTable(last_event_minutes_in_the_hour)

        let row_heights = allTodaysActivities.map((activity, index) => {
            let activityData = [{activityHeight:undefined,activityStartTime:formatDateTimetoTime(activity.start_time),
                activityEndTime:formatDateTimetoTime(activity.end_time), activityTitle:activity.title, activityTypeOfHabit: activity.type_of_habit }];
                // use to create height rem, if a checked activity set it to ten minutes 
                let minutes = totalTimeToMinutes(activity.total_time)
                // set activity height
                activityData[0].activityHeight = generateHeightOfDayTimeTable(minutes)
                // get this item start time
                let start_time = activity.start_time
                let previous_end_time = allTodaysActivities[index + 1]? allTodaysActivities[index + 1].end_time: undefined

                if (previous_end_time) {
                    let endMiliSeconds = Date.parse(previous_end_time)
                    let startMiliSeconds = Date.parse(start_time)
    
                    let totalMilisecond = endMiliSeconds - startMiliSeconds
                    let totalMinutes = totalMilisecond * -1.6667e-5
                    activityData.push(generateHeightOfDayTimeTable(totalMinutes))
                }else{
                    //pass
                }
            return activityData
        })

        let event_Rows = row_heights.map(activityData => {
            if (activityData.length == 2){

                //activity row
                let bothRows = <div><Row  style={{ height: activityData[0].activityHeight }} >
                    <Card className=" border border-info "  style={{ width: '300rem', height: activityData[0].activityHeight}}> 
                        <Card.Body className={activityData[0].activityTypeOfHabit == 'timed'? 'timedBackground': 'checkedBackground' } style={{padding:0  }} >
                            <Card.Text   >{activityData[0].activityTitle}: {activityData[0].activityStartTime}  {activityData[0].activityTypeOfHabit == 'timed'? '- ' + activityData[0].activityEndTime : undefined } </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row  style={{ height: activityData[1] }} ></Row>
                </div>
                return bothRows

            }else{
                return <Row  style={{ height: activityData[0].activityHeight }} >
                    <Card className=" border border-info" style={{ width: '300rem', height: activityData[0].activityHeight}}>
                        <Card.Body className={activityData[0].activityTypeOfHabit == 'timed'? 'timedBackground': 'checkedBackground' }  style={{padding:0  }}>
                            <Card.Text >{activityData[0].activityTitle}: {activityData[0].activityStartTime}  {activityData[0].activityTypeOfHabit == 'timed'? '- ' + activityData[0].activityEndTime : undefined }  </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            }
        }) 
        //make first row that contain the time from the first hour to the first event
        let first_row =  <Row  style={{ height: first_row_height }} ></Row>
        event_Rows.push(first_row)
        //make row for the spacing of the last hour to the last event
        let last_row = <Row  style={{ height: last_row_height }} ></Row>
        event_Rows.unshift(last_row)
        return(event_Rows)
    }

    /**
     * On mount set the date to today.
     */
    useEffect(() =>{
        click_date(today)
    },[])
  
    /**
     * When timed activities change, update the time column.
     */
    useEffect(() => {
        if (allTodaysActivities){
            let NewtimeRows = generate_time_column()
            setTimeRows(NewtimeRows)
        }else{
            setTimeRows(undefined)
            setEventRows(undefined)
        }
    },[allTodaysActivities])

    /**
     * when the time rows change, update the event column.
     */
    useEffect(() => {
        if (timeRows){
            let event_rows = generate_timed_event_column()
            setEventRows(event_rows)
        }
    }, [timeRows])

    return (
        <div className='dailyTimeTable'>
        {props.loggedIn?null: <Redirect to='/login'/>}
        <div className='create-habit-title'>
                <h1>
                    Time Table
                </h1>
            </div>
            <Col className = 'my-3'>
                <Calendar className='calender centerItem' value={date} onClickDay={click_date}  />
            </Col>

            <Container fluid={true}>
                <Row className='justify-content-center' ><h3>{dateFormated}</h3></Row>
                <Row className='justify-content-center' >
                     {/* timecolumn */} 
                    <Col className=" col-2 justify-content-center border border-info ">
                        {timeRows}
                    </Col>
                    {/* events column */}  
                    <Col className=" col-7 justify-content-center  border border-info" style={{ width: '100rem'}}>
                        {eventRows? eventRows: undefined }
                    </Col>
                </Row>
            </Container>
        </div>   
    )
}

export default DayTimeTable;
DayTimeTable.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}
