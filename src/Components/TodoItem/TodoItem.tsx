import classes from './TodoItem.module.css'

import { FC } from 'react'
import { ITodo, THandlerById } from '../../types'

import { Checkbox } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'


interface TodoItemProps extends ITodo {
  removeTask: THandlerById,
  toggleTask: THandlerById
}

const TodoItem: FC<TodoItemProps> = ({ id, task, isCompleted, removeTask, toggleTask }) => {
  return (
    <li className={classes['list-item']}>
      <Checkbox 
        checked={isCompleted}
        onChange={() => toggleTask(id)}
      />
      <p>{task}</p>
      <button
        onClick={() => removeTask(id)}
      ><ClearIcon/></button>
    </li>
  )
}

export default TodoItem