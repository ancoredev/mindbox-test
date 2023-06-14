import classes from './TodoList.module.css'

import { FC } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import Filter from '../Filter/Filter'

import { ITodo, THandlerById, TMuiClickhandler } from '../../types'
import { filterTasks, tasksToComplete } from '../../utils'


interface TodoListProps {
  items: ITodo[],
  filter: number,
  handleFilterChange: TMuiClickhandler,
  handleClear: () => void,
  toggleTask: THandlerById,
  removeTask: THandlerById
}
 
const TodoList: FC<TodoListProps> = ({ 
  items, 
  filter, 
  handleFilterChange, 
  handleClear,
  removeTask, 
  toggleTask 
}) => {
  const filteredTasks = filterTasks(items, filter);
  return (
    <div className={classes.todo}>
      <Filter 
        value={filter}
        onChange={handleFilterChange}
        onClick={handleClear}
      />
      <ul className={classes['todo-list']}>
      {
        filteredTasks.length !== 0 
        ? filteredTasks.map(item => (
            <TodoItem
              key={item.id}
              removeTask={removeTask}
              toggleTask={toggleTask}
              {...item}
            />
          ))
        : <li className={classes['tasks-not-found']}>Нет выбранных задач</li>
      }
      </ul>
      <p className={classes['todo-left']}>Активных задач: {tasksToComplete(items)}</p>
    </div>
  )
}

export default TodoList