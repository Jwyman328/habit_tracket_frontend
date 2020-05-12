import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import useGetActivityTimedCardState from "./customHooks/useGetActivityTimedCardState";
import handleStopTimer from './utils/handleStopTimer';

function ActivityTimed(props) {
  const {
    totalTime,
    setTotalTime,
    startTimeFormated,
    setStartTimeFormated,
    displayStartTime,
    setDisplayStartTime,
    displayEndTime,
    setDisplayEndTime,
  } = useGetActivityTimedCardState(props);


  return (
    <Col>
      <Card>
        <Card.Body className="checkedBackground">
          <Card.Subtitle className="mb-2 align-text-left  d-flex">
            Start Time: {displayStartTime}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 align-text-left  d-flex">
            {props.end_time ? (
              <p>End Time: {displayEndTime}</p>
            ) : (
              <Button className="btn btn-danger" onClick={() => handleStopTimer(props,setDisplayEndTime)}>
                Stop
              </Button>
            )}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 align-text-left  d-flex">
            {props.total_time ? <p>Total Time: {props.total_time} </p> : null}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ActivityTimed;

ActivityTimed.propTypes = {
  activity_id: PropTypes.number,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  total_time: PropTypes.string,
  stop_button: PropTypes.func.isRequired,
};
