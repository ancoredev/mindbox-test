import { TFilterTasks, ITodo } from "./types";

export enum FilterType {
  all,
  active,
  completed
}

export const filterTasks: TFilterTasks = (tasks, method) => {
  if (method === FilterType.active) 
    return tasks.filter((item: ITodo): boolean => item.isCompleted === false);
  if (method === FilterType.completed) 
    return tasks.filter((item: ITodo): boolean => item.isCompleted === true);
  return tasks;
}

export const tasksToComplete = (tasks: ITodo[]): number => {
  return tasks.filter((item: ITodo): boolean => item.isCompleted === false).length;
}