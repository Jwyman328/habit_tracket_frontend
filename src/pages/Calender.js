import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Calendar from "react-calendar";
import HabitCard from "../components/habit_components/HabitCard";
import useGetCaladerPageState from "./customHooks/LoginPage/useGetCaladerPageState";
import fetchDailyHabitsByDate from "../utils/fetchDailyHabitsByDate";
import fetchDateHabits from "../utils/fetchDateHabits";

/**
 * A calander to manage selecting the date for which Habits shall be displayed.
 * @param {Bool} props.loggedIn - Representing if the user is considered logged in or out.
 * @var {Date} today - the current date.
 * @var {String} todayFormated - the current date in a readable string.
 * @var {Date} date - the date selected.
 * @var {String} dateFormated - the selected date in a readable string.
 * @var {Array} habitData - habit data for all habits of the selected date.
 * @var {Array} habitDaily - habit data for all daily habits of the selected date.
 * @var {Array} habit_cards - array of habit data as readable display cards.
 * @var {String} token - user's jwt token .
 */

function CalendarContainer(props) {
  let {
    date,
    setDate,
    dateFormated,
    setDateFormated,
    habitData,
    setHabitData,
    habitDaily,
    setHabitDaily,
    habit_cards,
    token,
    setToken,
  } = useGetCaladerPageState();


  /**
   * Activate the specific date habit collecting methods by sending them the dateClicked.
   * @param {Date} dateClicked -- The date the user selected on the calender.
   */
  const click_date = (dateClicked) => {
    setDate(dateClicked);
    let dateClickedFormated = dateClicked.toDateString();
    setDateFormated(dateClickedFormated);
    //fetch_date_habits(dateClicked)
    fetchDateHabits(date, setHabitData);
    fetchDailyHabitsByDate(dateClicked, setHabitDaily);
  };

  /**
   * Create HabitCards for all existing habits for the date selected, using the gathered habitData.
   * @return {Array} -- Array of Bootstrap Columns containing BootStrap cards containing Habit Data for the selected Date.
   */
  const show_habit_cards = () => {
    console.log(habitDaily, " hb");
    habit_cards = habitDaily.map((item) => {
      for (let generalhabit in habitData) {
        if (habitData[generalhabit].id == item.habit) {
          return (
            <HabitCard
              daily_id={item.id}
              daily_timed_total={item.timed_total}
              daily_count_times_done={item.count_times_done_total}
              daily_completed={item.completed}
              date_selected={date}
              id={habitData[generalhabit].id}
              start_date={habitData[generalhabit].start_date}
              end_date={habitData[generalhabit].end_date}
              type_of_habit={habitData[generalhabit].type_of_habit}
              type_of_goal={habitData[generalhabit].type_of_goal}
              title={habitData[generalhabit].title}
              goal_amount={habitData[generalhabit].goal_amount}
              completed={habitData[generalhabit].completed}
            />
          );
        }
      }
    });
    return habit_cards;
  };

  return (
    <Container className="habitCalender">
      {props.loggedIn ? null : <Redirect to="/login" />}
      <div className="create-habit-title">
        <h1>Habit Calendar</h1>
      </div>
      <Row>
        <Col className="my-3">
          <Calendar
            className="calender centerItem "
            value={date}
            onClickDay={click_date}
          />
        </Col>
      </Row>
      <h4> Habits: {dateFormated} </h4>
      <Row> {habitDaily ? show_habit_cards() : <h1>Error</h1>} </Row>
    </Container>
  );
}

export default CalendarContainer;
CalendarContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
