import { TFilterTasks, ITodo } from "./types";

export const filterTasks: TFilterTasks = (tasks, method) => {
  if (method === 1) return tasks.filter((item): item is ITodo => item.isCompleted === false);
  if (method === 2) return tasks.filter((item): item is ITodo => item.isCompleted === true);
  return tasks;
}

export const tasksToComplete = (tasks: ITodo[]): number => {
  return tasks.filter((item: ITodo): boolean => item.isCompleted === false).length;
}