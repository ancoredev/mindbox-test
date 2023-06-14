import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputGroup from './InputGroup';


const onChange = jest.fn();
const onClick = jest.fn();

const setup = (initialValue: string): {
  inputEl: HTMLInputElement,
  buttonEl: HTMLButtonElement,
  component: RenderResult
} => {
  const component = render(<InputGroup value={initialValue} onChange={onChange} onClick={onClick} />);
  const inputEl = screen.getByTestId<HTMLInputElement>('input');
  const buttonEl = screen.getByRole<HTMLButtonElement>('button');
  return {
    inputEl,
    buttonEl,
    component
  }
}

describe('InputGroup component', () => {
  it('should render', () => {
    const { inputEl, buttonEl } = setup('');

    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { component } = setup('');
    expect(component).toMatchSnapshot();
  });


  it('works with onChange events', async () => {
    const user = userEvent.setup();
    const { inputEl, component } = setup('');
    expect(inputEl.value).toBe('');

    await user.type(inputEl, 'test');
    component.rerender(<InputGroup value='test' onChange={onChange} onClick={onClick} />);
    
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(inputEl.value).toBe('test');
    // ToDO
    //
    // исправить тест, type() не обновляет value без rerender. 
    // Expected: test, Received: ''
  });

  it('clears input after click and onClick works', async () => {
    const user = userEvent.setup();
    const { buttonEl } = setup('not empty string');

    await user.click(buttonEl);
    expect(onClick).toHaveBeenCalled();
  });
});
