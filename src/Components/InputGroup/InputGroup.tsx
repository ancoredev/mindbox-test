import classes from './InputGroup.module.css'
import { FC } from "react"


interface InputGroupProps {
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onClick: () => void
}

const InputGroup: FC<InputGroupProps> = ({ value, onChange, onClick }) => {
  return (
    <>
      <div className={classes["input-group"]}>
        <input 
          className={classes['input-todo']} 
          type="text" 
          value={value} 
          onChange={onChange}
          placeholder="Что нужно сделать?"
          data-testid="input"
        />
        <button 
          className={classes['add-button']} 
          onClick={onClick}
        >Добавить</button>
      </div>
    </>
  )
}

export default InputGroup