import React, { useState, useEffect } from "react";
import fetchDailyHabitsByDate from "../../utils/fetchDataHelperFunctions/fetchDailyHabitsByDate";
import fetchDateHabits from "../../utils/fetchDataHelperFunctions/fetchDateHabits";

function useGetCaladerPageState(props) {
  let today = new Date();
  let todayFormated = today.toDateString();
  const [date, setDate] = useState(today);
  const [dateFormated, setDateFormated] = useState(todayFormated);
  const [habitData, setHabitData] = useState(null);
  let [habitDaily, setHabitDaily] = useState(null);
  let [token, setToken] = useState(undefined);

    /**
   * On mount call the methods to get the habit and daily habit data with the selected date.
   */
  useEffect(() => {
    //fetch_date_habits(date)
    fetchDateHabits(date, setHabitData);
    fetchDailyHabitsByDate(date, setHabitDaily);
  }, []);


  return {
    date,
    setDate,
    dateFormated,
    setDateFormated,
    habitData,
    setHabitData,
    habitDaily,
    setHabitDaily,
    token,
    setToken,
  };
}

export default useGetCaladerPageState;
