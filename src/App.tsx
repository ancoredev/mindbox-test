import InputGroup from './Components/InputGroup/InputGroup';
import TodoList from './Components/TodoList/TodoList';

import { ITodo, THandlerById, TMuiClickhandler } from './types';
import { useState } from 'react';


const baseTasks: ITodo[] = [
  { id: 1, task: 'test 1', isCompleted: true },
  { id: 2, task: 'test 2', isCompleted: false }
]

enum FilterType {
  all,
  active,
  completed
}

function App() {
  const [ tasks, setTasks ] = useState<ITodo[]>(baseTasks);
  const [ inputValue, setInputValue ] = useState('');

  const [ filter, setFilter ] = useState(FilterType.all);

  const addTask = () => {
    let newTask: ITodo = {
      id: Date.now(),
      task: inputValue,
      isCompleted: false
    };
    if (inputValue) {
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
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

  const toggleFilter: TMuiClickhandler = ( event, newFilter) => { 
    setFilter(newFilter); 
  };


  

  return (
    <div className="App">
      <h1>ToDo</h1>
      <InputGroup
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onClick={addTask}
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
