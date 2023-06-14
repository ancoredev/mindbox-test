import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Filter from './Filter';
import { FilterType } from '../../utils';


const onChange = jest.fn();
const onClick = jest.fn();

const setup = (value: number): {
  tabsEl: HTMLElement,
  buttonEl: HTMLButtonElement
  component: RenderResult
} => {
  const component = render(
    <Filter 
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ); 
  const tabsEl = screen.getByTestId('tab-container');
  const buttonEl = screen.getByText<HTMLButtonElement>(
    /удалить завершенные/i,
    { selector: 'button' } 
  );
  return {
    tabsEl,
    buttonEl,
    component
  }
}

describe('Filter component', () => {
  it('should render', () => {
    const { tabsEl, buttonEl } = setup(FilterType.all);

    expect(tabsEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { component } = setup(FilterType.all);
    expect(component).toMatchSnapshot();
  });

  it('should correct call onClick event', async () => {
    const user = userEvent.setup();
    const { buttonEl } = setup(FilterType.all);
    
    await user.click(buttonEl);
    expect(onClick).toHaveBeenCalled();
  });

  it('should correct call onChange event', async () => {
    const user = userEvent.setup();
    setup(FilterType.all);
    
    await user.click(screen.getByText(
      /активные/i,
      { selector: 'button' } 
    ));
    expect(onChange).toHaveBeenCalled();

    await user.click(screen.getByText(
      /Завершенные/,
      { selector: 'button' } 
    ));
    expect(onChange).toHaveBeenCalled();
  });

  it('should select correct tab', () => {
    setup(FilterType.active);

    expect(screen.getByText(
      /активные/i,
      { selector: 'button' } 
    )).toHaveAttribute('aria-selected','true');
  })
});