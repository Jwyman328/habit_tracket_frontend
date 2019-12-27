import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import { Col, Row, Container, Card } from 'react-bootstrap';

import Calendar from 'react-calendar';

/**
 * show a column of times and a corresponding column of checked and timed activities spanning their total time for a specific date.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out. 
 */
function DayTimeTable(props) {
    let today = new Date()
    let todayFormated = today.toDateString();
    const [dateFormated, setDateFormated] = useState(todayFormated)
    const [date, setDate] = useState(today);
    let [firstTimedEventMinutes, setfirstTimedEventMinutes] = useState(undefined)
    let [lastTimedEventMinutes, setlastTimedEventMinutes] = useState(undefined)
    let [firstCheckedEventMinutes, setfirstCheckedEventMinutes] = useState(undefined)
    let [lastCheckedEventMinutes, setlastCheckedEventMinutes] = useState(undefined)
    let [firstEventMinutes, setfirstEventMinutes] = useState(undefined)
    let [allTodaysTimedActivities, setAllTodaysTimedActivities] = useState(undefined)
    let [timeRows, setTimeRows] = useState(undefined)
    let [eventRows, setEventRows] = useState(undefined)

    /**
     * Get all activities for the Date selected.
     * @param {Date} dateClicked -- Date selected on the Calender widget
     */
    const get_all_activities_for_today = async (dateClicked) => {
        let year = dateClicked.getFullYear()
        let month = dateClicked.getMonth() + 1 //js getMonth starts at 0
        let day = dateClicked.getDate() 
        let token = localStorage.getItem('token')
        // make a fetch to site 
        let fetchActivitiesForDate = await fetch(`http://shrouded-ravine-06737.herokuapp.com/habits/activities/${year}/${month}/${day}/`,{
            headers:{ Authorization: `JWT ${token}`}})
        let fetchActivitiesForDateJson = await fetchActivitiesForDate.json()
        fetchActivitiesForDateJson = fetchActivitiesForDateJson.length === 0? undefined: fetchActivitiesForDateJson
        setAllTodaysTimedActivities(fetchActivitiesForDateJson)
    }

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
        get_all_activities_for_today(dateClicked)
         // then send that data to a component 
    }

    /**
     * Take in minutes and return a rem total with each minute equal to .25rem
     * @param {Number} minutes -- Minutes for an activities total_time, AKA start_time - end_time.
     * @return {String} the rem height total that represents the amount of minutes of this activity.
     */
    const generate_height = (minutes) => {
        //take in minutes, return rem
        let totalRem = minutes * .25
        //totalRem = Math.round(totalRem)
        totalRem = `${totalRem}rem`
        return totalRem
    }

    /**
     * Take in a stringTime and return an array of only the hours, and minutes.
     * @param {String} stringTime -- a string representation of a date
     * @return -- return an array of the hour, and minutes of the stringTime passed.
     */
    const get_hours_minutes = (stringTime) => {
        const[dates,times] = stringTime.split('T')
        let [hour,minutes, seconds] =  times.split(':')
        hour = parseInt(hour)
        minutes = parseInt(minutes)
        return [hour,minutes]
    }

    /**
     * Generate rows of columns representing 30 minute blocks for activity columns to pair next to.
     * @return {Array} -- Array of rows containing columns representing 30 minute blocks.
     */
    const generate_time_column = () =>{
        // only get events that have been completed, aka have a total time
        let firstTimedEventStartTime = allTodaysTimedActivities[allTodaysTimedActivities.length -1].start_time
        //latest timed event 
        let lastTimedEventEndTime = allTodaysTimedActivities[0].end_time? allTodaysTimedActivities[0].end_time: allTodaysTimedActivities[0].start_time
        let [first_hour,first_minutes] = get_hours_minutes(firstTimedEventStartTime)
        setfirstTimedEventMinutes(first_minutes)
        let [last_hour,last_minutes] = lastTimedEventEndTime? get_hours_minutes(lastTimedEventEndTime): get_hours_minutes(allTodaysTimedActivities[0].start_time)
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
        let first_row_height = generate_height(firstEventMinutes + 60)

        // last row will be last activity's minutes - 60
        let last_event_minutes_in_the_hour = 60 - lastTimedEventMinutes
        let last_row_height = generate_height(last_event_minutes_in_the_hour)

        /**
         * Strip a string datetime and put it in a string that only shows hours and minutes.
         * @param {Date} dateTime -- a string containing information of a date
         * @return {String} -- Return a string only containing the hours and minutes of the dateTime.
         */
        const formatDateTimetoTime = (dateTime) => {
            if (dateTime){
                let [date, time] = dateTime.split('T')
                let [hours,minutes,seconds] = time.split(':')
                let formatedTime = `${hours}:${minutes}`
                return formatedTime }
             else{
                return dateTime
            }
        }
        /**
         * Return an integer of minutes from a string containing hours and minutes.
         * @param {String} total_time -- A string containing hours and minutes
         * @return {Int} -- return an integer of the minutes from the hours/minutes passed.
         */
        const total_time_to_minutes = (total_time) => {
            let [hours,minutes,seconds] = total_time.split(':')
            let hoursToMinutes = parseInt(hours) * 60
            minutes = parseInt(minutes) + hoursToMinutes
            return minutes
        }

        let row_heights = allTodaysTimedActivities.map((activity, index) => {
            let activityData = [{activityHeight:undefined,activityStartTime:formatDateTimetoTime(activity.start_time),
                activityEndTime:formatDateTimetoTime(activity.end_time), activityTitle:activity.title, activityTypeOfHabit: activity.type_of_habit }];
                // use to create height rem, if a checked activity set it to ten minutes 
                let minutes = total_time_to_minutes(activity.total_time)
                // set activity height
                activityData[0].activityHeight = generate_height(minutes)
                // get this item start time
                let start_time = activity.start_time
                let previous_end_time = allTodaysTimedActivities[index + 1]? allTodaysTimedActivities[index + 1].end_time: undefined

                if (previous_end_time) {
                    let endMiliSeconds = Date.parse(previous_end_time)
                    let startMiliSeconds = Date.parse(start_time)
    
                    let totalMilisecond = endMiliSeconds - startMiliSeconds
                    let totalMinutes = totalMilisecond * -1.6667e-5
                    activityData.push(generate_height(totalMinutes))
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
        if (allTodaysTimedActivities){
            let NewtimeRows = generate_time_column()
            setTimeRows(NewtimeRows)
        }else{
            setTimeRows(undefined)
            setEventRows(undefined)
        }
    },[allTodaysTimedActivities])

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
        <div>
        {props.loggedIn?null: <Redirect to='/login'/>}
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
