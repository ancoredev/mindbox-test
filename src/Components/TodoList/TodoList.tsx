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
  return (
    <div className={classes.todo}>
      <Filter 
        value={filter}
        onChange={handleFilterChange}
        onClick={handleClear}
      />
      <ul className={classes['todo-list']}>
      {
        filterTasks(items, filter).map(item => (
          <TodoItem
            key={item.id}
            removeTask={removeTask}
            toggleTask={toggleTask}
            {...item}
          />
        ))
      }
      </ul>
      <p className={classes['todo-left']}>Незавершенных задач: {tasksToComplete(items)}</p>
    </div>
  )
}

export default TodoList