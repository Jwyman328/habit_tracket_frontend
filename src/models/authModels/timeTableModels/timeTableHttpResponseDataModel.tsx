
 interface individualTimeTableHabitModel {
  daily_habit: null;
  end_time: string;
  habit: number;
  id: number;
  start_time: string;
  title: string;
  total_time: string;
  type_of_habit: string;
}

type timeTableHttpResponseDataModel = individualTimeTableHabitModel[] | [];

export type {individualTimeTableHabitModel,timeTableHttpResponseDataModel }
