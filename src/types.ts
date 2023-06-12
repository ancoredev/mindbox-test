export interface ITodo {
  id: number,
  task: string,
  isCompleted: boolean
}

export type THandlerById = (id: number) => void;

export type TMuiClickhandler = (
  event: React.SyntheticEvent, 
  newValue: number
) => void;

export type TFilterTasks = (tasks: ITodo[], method: number) => ITodo[];

export type TTaskActions = {
  tasks: ITodo[],
  addTask: (taskValue: string) => void,
  removeTask: THandlerById,
  toggleTask: THandlerById,
  clearCompletedTasks: () => void
}