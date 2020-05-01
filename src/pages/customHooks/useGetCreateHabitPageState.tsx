import React, { useState, useEffect } from "react";
import formatDate from "../../utils/manipulateDataHelperFunctions/formatDate";
type FormData = {
  title:string;
  start_date: string;
  end_date: string;
  type_of_habit: string;
  type_of_goal: string;
  goal_amount: string;
}
function useGetCreateHabitPageState() {
  const startDateOriginal : Date = new Date();
  const formFormatedOriginalDate = formatDate(startDateOriginal);
  const [startDate, setStartDate] = useState<Date>(startDateOriginal);
  const [endDate, setEndDate] = useState<Date>(startDateOriginal);
  const [formData, setFormData] = useState<FormData>({
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
