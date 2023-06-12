import { useState } from 'react'

import { ITodo, THandlerById, TTaskActions } from '../types';


type TUseTasks = (initialValue: ITodo[]) => TTaskActions;

export const useTasks: TUseTasks = (initialValue) => {
  const [ tasks, setTasks ] = useState<ITodo[]>(initialValue);

  const addTask = (taskValue: string): void => {
    let newTask: ITodo ={
      id: Date.now(),
      task: taskValue,
      isCompleted: false
    }
    setTasks([...tasks, newTask]);
  }

  const removeTask: THandlerById = (id) => { setTasks(tasks.filter(task => task.id !== id)) }

  const toggleTask: THandlerById = (id) => {
    setTasks(tasks.map(task => {
      if (task.id !== id) return task;
      return {
        ...task,  
        isCompleted: !task.isCompleted
      }
    }));
  }

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => task.isCompleted !== true ));
  }

  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearCompletedTasks
  }
}
