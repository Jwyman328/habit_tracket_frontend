import React, { useState } from "react";

function useGetDayTimeTableState() {
  let today = new Date();
  let todayFormated = today.toDateString();
  const [dateFormated, setDateFormated] = useState<string>(todayFormated);
  const [date, setDate] = useState<Date>(today);
  let [firstTimedEventMinutes, setfirstTimedEventMinutes] = useState(undefined);
  let [lastTimedEventMinutes, setlastTimedEventMinutes] = useState(undefined);
  let [firstEventMinutes, setfirstEventMinutes] = useState(undefined);
  let [allTodaysActivities, setallTodaysActivities] = useState(undefined);
  let [timeRows, setTimeRows] = useState<any>(undefined);
  let [eventRows, setEventRows] = useState<any>(undefined);

  

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
