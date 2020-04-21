import React, { useState, useEffect } from "react";
import formatDate from "../../utils/manipulateDataHelperFunctions/formatDate";

function useGetCreateHabitPageState() {
  const startDateOriginal = new Date();
  const formFormatedOriginalDate = formatDate(startDateOriginal);
  const [startDate, setStartDate] = useState(startDateOriginal);
  const [endDate, setEndDate] = useState(startDateOriginal);
  const [formData, setFormData] = useState({
    title: "",
    start_date: formFormatedOriginalDate,
    end_date: formFormatedOriginalDate,
    type_of_habit: "",
    type_of_goal: "total",
    goal_amount: "",
  });

  /**
   * on mount set newFormData type to timed
   */
  useEffect(() => {
    let newFormData = { ...formData };
    newFormData["type_of_habit"] = "timed";
    setFormData(newFormData);
  }, []);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formData,
    setFormData,
  };
}

export default useGetCreateHabitPageState;
