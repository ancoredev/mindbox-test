import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ITodo } from '../../types';
import { FilterType } from '../../utils';

import TodoList from './TodoList';


const handleFilterChange = jest.fn();
const handleClear = jest.fn();
const toggleTask = jest.fn();
const removeTask = jest.fn();

const baseTasks: ITodo[] = [
  { id: 1, task: 'Тестовое задание', isCompleted: false },
  { id: 2, task: 'Прекрасный код', isCompleted: true },
  { id: 3, task: 'Покрытие тестами', isCompleted: false }
];

const setup = (tasks: ITodo[], filter: number): {
  ulEl: HTMLUListElement,
  pEl: HTMLParagraphElement,
  component: RenderResult
} => {
  const component = render(
    <TodoList
        items={tasks}
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleClear={handleClear}
        removeTask={removeTask}
        toggleTask={toggleTask}
    />);
  const ulEl = screen.getByRole<HTMLUListElement>('list');
  const pEl = screen.getByText<HTMLParagraphElement>(/Активных задач:/i);
  return {
    ulEl,
    pEl,
    component
  }
}

describe('TodoList component', () => {
  it('should render', () => {
    const { ulEl, pEl } = setup([], FilterType.all);

    expect(ulEl).toBeInTheDocument();
    expect(pEl).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { component } = setup([], FilterType.all);
    expect(component).toMatchSnapshot();
  });

  it('should render same list items as it passed to props', () => {
    setup(baseTasks, FilterType.all);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should render list item alert if there is no item', () => {
    setup([], FilterType.all);
    expect(screen.getByText(/Нет выбранных задач/i)).toBeInTheDocument();
  });

  it('should work with tab buttons', async () => {
    const user = userEvent.setup();
    const { component } = setup(baseTasks, FilterType.all);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    
    await user.click(screen.getByText(/активные/i, { selector: 'button' }));
    expect(handleFilterChange).toHaveBeenCalled();  

    await user.click(screen.getByText(/Завершенные/, { selector: 'button' }));
    expect(handleFilterChange).toHaveBeenCalled(); 
  });
});