import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";

function useGetCreateActivityState(props) {
  let match = useRouteMatch();
  let habitID = match.params.id; // use this param to ask for this habit and create activities with it
  let habitYear = match.params.year;
  let habitMonth = match.params.month;
  let habitDay = match.params.day;

  let activityComponents = undefined;

  let [activity_data, setActivityData] = useState(undefined);
  let [habitData, setHabitData] = useState({ type_of_habit: "" });
  let [habitActivityDate, setHabitActivityDate] = useState(undefined);
  let [allowAtivityCreation, setAllowAtivityCreation] = useState(undefined); // only allow if today is same as habitActivityDate
  let [totalAccumulatedForDate, setTotalAccumulatedForDate] = useState({
    accumulated_time: undefined,
    accumulated_count: undefined,
  });

  return {
    habitID,
    habitYear,
    habitMonth,
    habitDay,
    activityComponents,
    activity_data,
    setActivityData,
    habitData,
    setHabitData,
    habitActivityDate, setHabitActivityDate,
    allowAtivityCreation, setAllowAtivityCreation,
    totalAccumulatedForDate, setTotalAccumulatedForDate
  };
}

export default useGetCreateActivityState;
