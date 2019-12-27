import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { withRouter} from 'react-router-dom';



/**
 * Bootstrap Col containing Bootstrap card containing Habit and daily habit data.
 * @param {number} props.id                     -- Habit model id
 * @param {Date} props.start_date               -- Habit start date
 * @param {Date} props.end_date                 -- Habit end date 
 * @param {Number} props.goal_amount            -- Habit goal amount
 * @param {string} props.type_of_habit          -- Habit type either timed or checked
 * @param {string} props.type_of_goal           -- Habit goal type either daily or total
 * @param {string} props.title                  -- Habit title
 * @param {Boolean} props.completed             -- Habit completed pending if habit totals Greather than goal
 * @param {Number} props.daily_id               -- Daily_Habit id
 * @param {Date} props.date_selected            -- Date selected by the user on the Calender widget
 * @param {any} props.daily_timed_total         -- Total time of all activities for Habit
 * @param {Number} props.daily_count_times_done -- Total amount of activities this Habit had done for date selected
 * @param {Boolean} props.daily_completed       -- Daily Habit completed if daily habit totals greater than habit goal
 */
function HabitCard(props) {

    /**
     * Go to the page that shows all activities for the Daily Habit selected.
     * Send important data to the page through the page's url.
     */
    const activitiesForHabitForDate = () => {
        // on click go to this habits activity page 
        //<Route path='/habits/:id/activities'> <CreateActivity /> </Route>
        let date_selected = props.date_selected.toLocaleDateString()
        let habitTypeUrl = props.type_of_goal  + props.type_of_habit 
        let custom_url = '/habits/' + props.id + '/activities/' + props.daily_id + '/' + habitTypeUrl + '/' + date_selected
        props.history.push(custom_url)
    }

    /**
     * @return -- return the correct metric, depending on the type of habit (timed or checked)
     */
    const goal_amount_metric = () => {
        let metric = props.type_of_habit == 'timed'? 'hr': 'times'
        return metric
    }

    return(
        <Col>
            <Card >
                <Card.Body className={props.type_of_goal =='total'? props.completed? 'greenCard': 'redCard': props.daily_completed? 'greenCard': 'redCard'}>
                    <Card.Title className={props.type_of_goal =='total'? props.completed? 'greenTitle': 'redTitle': props.daily_completed? 'greenTitle': 'redTitle'}> {props.title}</Card.Title>
                    <Card.Subtitle className="mb-2  cardText"> <p> start: {props.start_date}</p>  </Card.Subtitle>
                    <Card.Subtitle className="mb-2  cardText"> <p> end: {props.end_date}</p>  </Card.Subtitle>
                    <Card.Text className="mb-2 "> <p>{props.type_of_goal} Goal: {props.goal_amount} {goal_amount_metric()}</p>  </Card.Text>
                    <Card.Text>
                        {props.type_of_habit == 'timed'? <p> Today's total time: {props.daily_timed_total} </p>: <p> Today's Count: {props.daily_count_times_done} </p>}
                        <Button className='btn btn-info' onClick={activitiesForHabitForDate}> See Activities </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default withRouter(HabitCard);

HabitCard.propTypes = {
    id: PropTypes.number,
    start_date: PropTypes.instanceOf(Date),
    end_date: PropTypes.instanceOf(Date),
    goal_amount: PropTypes.string,
    type_of_habit:PropTypes.string,
    type_of_goal:PropTypes.string,
    title:PropTypes.string,
    completed:PropTypes.bool,
    daily_id:PropTypes.number,
    date_selected:PropTypes.instanceOf(Date),
    daily_timed_total:PropTypes.any,
    daily_count_times_done: PropTypes.number,
    daily_completed: PropTypes.bool,
}