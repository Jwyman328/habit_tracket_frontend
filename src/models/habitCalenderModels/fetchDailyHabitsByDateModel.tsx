interface individualDailyHabitModel {
  completed: boolean;
  count_times_done_total: number;
  date: string;
  habit: number;
  id: number;
  timed_total: string;
}

type setOfDailyHabitModels = individualDailyHabitModel[] | [];

export type {individualDailyHabitModel, setOfDailyHabitModels} 
