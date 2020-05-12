

interface individualDateHabitModel {
    completed: boolean
    current_completed_timed_amount: string
    current_times_activity_done: number
    end_date: string
    goal_amount: number
    id: number
    start_date: string
    title: string
    type_of_goal: string
    type_of_habit: string
    user: number
}

type setOfDateHabitsModel = individualDateHabitModel[];

export type {setOfDateHabitsModel,individualDateHabitModel }