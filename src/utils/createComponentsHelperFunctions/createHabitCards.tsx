import React from "react";
import HabitCard from "../../components/habit_components/HabitCard";

/**
 * Create HabitCards for all existing habits for the date selected, using the gathered habitData.
 * @return {Array} -- Array of Bootstrap Columns containing BootStrap cards containing Habit Data for the selected Date.
 */
type HabitDaily = {
  id: string;
  habit: {};
  timed_total: string;
  completed: boolean;
  count_times_done_total: string;
};

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

type HabitCardProps = {
  daily_completed: boolean;
  date_selected: Date;
  start_date: string;
  end_date: string;
  type_of_habit: string;
  type_of_goal: string;
  title: string;
  goal_amount: string;
};

const createHabitCards = (habitDaily: HabitDaily[], habitData:HabitData[], date:Date) => {
  let habit_cards = habitDaily.map((item) => {
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

export default createHabitCards;
