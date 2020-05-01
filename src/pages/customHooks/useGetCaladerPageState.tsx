import React, { useState, useEffect } from "react";
import fetchDailyHabitsByDate from "../../utils/fetchDataHelperFunctions/fetchDailyHabitsByDate";
import fetchDateHabits from "../../utils/fetchDataHelperFunctions/fetchDateHabits";

type HabitData = {
  id: string;
  start_date: Date;
  end_date: Date;
  type_of_habit: string;
  type_of_goal: string;
  title: string;
  goal_amount: string;
  completed: boolean;
};

type HabitDaily = {
  id: string;
  habit: {};
  timed_total: string;
  completed: boolean;
  count_times_done_total: string;
};

type UseGetCaladerPageReturnState = {
  
    date: Date;
    setDate: Function;
    dateFormated:string;
    setDateFormated:Function;
    habitData:HabitData[];
    setHabitData: Function;
    habitDaily: HabitDaily[];
    setHabitDaily: Function;
    token: string | undefined;
    setToken: Function;
  
}

function useGetCaladerPageState<UseGetCaladerPageReturnState>() {
  let today = new Date();
  let todayFormated = today.toDateString();
  const [date, setDate] = useState<Date>(today);
  const [dateFormated, setDateFormated] = useState<string>(todayFormated);
  const [habitData, setHabitData] = useState<HabitData[]>([]);
  let [habitDaily, setHabitDaily] = useState<HabitDaily[]>([]);
  let [token, setToken] = useState<string|undefined>(undefined);

    /**
   * On mount call the methods to get the habit and daily habit data with the selected date.
   */
  useEffect(() => {
    //fetch_date_habits(date)
    fetchDateHabits(date, setHabitData);
    fetchDailyHabitsByDate(date, setHabitDaily);
  },[]);


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
