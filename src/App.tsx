import InputGroup from './Components/InputGroup/InputGroup';
import TodoList from './Components/TodoList/TodoList';

import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { useFilter } from './hooks/useFilter';

import { ITodo } from './types';
import { FilterType } from './utils';


const baseTasks: ITodo[] = [
  { id: 1, task: 'Тестовое задание', isCompleted: false },
  { id: 2, task: 'Прекрасный код', isCompleted: true },
  { id: 3, task: 'Покрытие тестами', isCompleted: false }
]

function App() {
  const {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    clearCompletedTasks
  } = useTasks(baseTasks);

  const { filter, toggleFilter } = useFilter(FilterType.all);

  const [ inputValue, setInputValue ] = useState('');
  const handleAddTask = () => {
    if (inputValue) {
      addTask(inputValue);
      setInputValue('');
    }
  }


  return (
    <div className="App">
      <h1>ToDo</h1>
      <InputGroup
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onClick={handleAddTask}
      />
      <TodoList
        items={tasks}
        filter={filter}
        handleFilterChange={toggleFilter}
        handleClear={clearCompletedTasks}
        removeTask={removeTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;
