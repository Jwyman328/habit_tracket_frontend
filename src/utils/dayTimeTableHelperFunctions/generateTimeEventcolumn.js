import React from 'react'
import generateHeightOfDayTimeTable from './generateHeightOfDayTimetable'  
import formatDateTimetoTime from './formatDateTimeToTime';
import totalTimeToMinutes from './totalTimeToMinutes';
import { Col, Row, Container, Card } from 'react-bootstrap';

    /**
     * Generate an Array of rows. The rows will either represent the total time of an event or the 
        * time spend between two events, aka time while no event was happening.
     * @return {Array} -- Return Array of rows, with each row representing an activity with the height depending on total time.
     */
    const generateTimeEventColumn = ({
        lastTimedEventMinutes,
        firstEventMinutes,
        allTodaysActivities,
      }) => {
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

export default generateTimeEventColumn;