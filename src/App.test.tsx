import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const app = render(<App />);
    expect(app).toMatchSnapshot();
  });

  it("should contain todo and input", () => {
    render(<App />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/что нужно сделать?/i)).toBeInTheDocument();
  });
});
