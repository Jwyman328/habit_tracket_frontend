import React, { useState } from "react";

function useGetCaladerPageState(props) {
  let today = new Date();
  let todayFormated = today.toDateString();
  const [date, setDate] = useState(today);
  const [dateFormated, setDateFormated] = useState(todayFormated);
  const [habitData, setHabitData] = useState(null);
  let [habitDaily, setHabitDaily] = useState(null);
  let habit_cards = undefined;
  let [token, setToken] = useState(undefined);

  return {
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
  };
}

export default useGetCaladerPageState;
