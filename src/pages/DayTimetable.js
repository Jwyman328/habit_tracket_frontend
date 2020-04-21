import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { Col, Row, Container, Card } from "react-bootstrap";

import Calendar from "react-calendar";
import useGetDayTimeTableState from "./customHooks/useGetDayTimeTableState";

//helper functions
import fetchAllActivitiesForDateClicked from "../utils/fetchDataHelperFunctions/fetchAllActivitiesForDateClicked";
import generateHeightOfDayTimeTable from "../utils/dayTimeTableHelperFunctions/generateHeightOfDayTimetable";
import parseHoursMinutes from "../utils/dayTimeTableHelperFunctions/parseHoursMinutes";
import formatDateTimetoTime from "../utils/dayTimeTableHelperFunctions/formatDateTimeToTime";
import totalTimeToMinutes from "../utils/dayTimeTableHelperFunctions/totalTimeToMinutes";
import generateTimeColumn from "../utils/dayTimeTableHelperFunctions/generateTimeColumn";
import generateTimeEventColumn from "../utils/dayTimeTableHelperFunctions/generateTimeEventcolumn";

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
  const dayTimeTableState = useGetDayTimeTableState();
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
    today,
  } = dayTimeTableState;

  /**
   * Send the date clicked to the corresponding methods to gather the date's activity data.
   * @param {Date} dateClicked -- Date selected on the Calender widget
   */
  const click_date = (dateClicked) => {
    setDateFormated(dateClicked.toDateString());
    setDate(dateClicked);
    let dateClickedFormated = dateClicked.toDateString();
    setDateFormated(dateClickedFormated);
    // when i click on a day it should show the habits set for that day
    // so make a fetch call and get all the habits for that day
    fetchAllActivitiesForDateClicked(dateClicked, setallTodaysActivities);
    // then send that data to a component
  };

  /**
   * On mount set the date to today.
   */
  useEffect(() => {
    click_date(today);
  }, []);

  /**
   * When timed activities change, update the time column.
   */
  useEffect(() => {
    if (allTodaysActivities) {
      let NewtimeRows = generateTimeColumn(dayTimeTableState);
      setTimeRows(NewtimeRows);
    } else {
      setTimeRows(undefined);
      setEventRows(undefined);
    }
  }, [allTodaysActivities]);

  /**
   * when the time rows change, update the event column.
   */
  useEffect(() => {
    if (timeRows) {
      let event_rows = generateTimeEventColumn(dayTimeTableState);
      setEventRows(event_rows);
    }
  }, [timeRows]);

  return (
    <div className="dailyTimeTable">
      {props.loggedIn ? null : <Redirect to="/login" />}
      <div className="create-habit-title">
        <h1>Time Table</h1>
      </div>
      <Col className="my-3">
        <Calendar
          className="calender centerItem"
          value={date}
          onClickDay={click_date}
        />
      </Col>

      <Container fluid={true}>
        <Row className="justify-content-center">
          <h3>{dateFormated}</h3>
        </Row>
        <Row className="justify-content-center">
          {/* timecolumn */}
          <Col className=" col-2 justify-content-center border border-info ">
            {timeRows}
          </Col>
          {/* events column */}
          <Col
            className=" col-7 justify-content-center  border border-info"
            style={{ width: "100rem" }}
          >
            {eventRows ? eventRows : undefined}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DayTimeTable;
DayTimeTable.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
