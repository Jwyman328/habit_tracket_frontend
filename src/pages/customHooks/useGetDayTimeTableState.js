import React, { useState } from "react";

function useGetDayTimeTableState(props) {
  let today = new Date();
  let todayFormated = today.toDateString();
  const [dateFormated, setDateFormated] = useState(todayFormated);
  const [date, setDate] = useState(today);
  let [firstTimedEventMinutes, setfirstTimedEventMinutes] = useState(undefined);
  let [lastTimedEventMinutes, setlastTimedEventMinutes] = useState(undefined);
  let [firstEventMinutes, setfirstEventMinutes] = useState(undefined);
  let [allTodaysActivities, setallTodaysActivities] = useState(undefined);
  let [timeRows, setTimeRows] = useState(undefined);
  let [eventRows, setEventRows] = useState(undefined);

  return {
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
  };
}

export default useGetDayTimeTableState;
