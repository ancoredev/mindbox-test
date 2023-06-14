import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ITodo } from '../../types';

import TodoItem from './TodoItem';


const taskExample: ITodo = { id: 2, task: 'Прекрасный код', isCompleted: true }

const toggleTask = jest.fn();
const removeTask = jest.fn();

const setup = ({
  id, 
  task, 
  isCompleted,
  }: ITodo): {
    liEl: HTMLLIElement,
    component: RenderResult
} => {
  const component = render(
    <TodoItem
      id={id}
      task={task}
      isCompleted={isCompleted}
      removeTask={removeTask}
      toggleTask={toggleTask}
    />); 
  const liEl = screen.getByRole<HTMLLIElement>('listitem');
  return {
    liEl,
    component
  }
}


describe('TodoItem component', () => {
  it('should render', () => {
    const { liEl} = setup(taskExample);

    expect(liEl).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { component } = setup(taskExample);
    expect(component).toMatchSnapshot();
  });

  it('should display correct task passed by prop', () => {
    setup({
      id: 1,
      task: 'test',
      isCompleted: false
    });

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('test', { selector: 'p' })).toBeInTheDocument();
  });

  it('should correct call onChange and onClick events', async () => {
    const user = userEvent.setup();
    setup({
      id: 1,
      task: 'test',
      isCompleted: false
    });

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    
    await user.click(screen.getByRole('checkbox'));
    expect(toggleTask).toHaveBeenCalled();

    await user.click(screen.getByRole('button'));
    expect(removeTask).toHaveBeenCalled();
  });
});