import { render, screen } from '@testing-library/react';
import App from '../../src/app/App';

describe('App', () => {
  it('renders the getting started heading', () => {
    render(<App />);
    expect(
      screen.getByText(/get started by editing/i),
    ).toBeInTheDocument();
  });

  it('renders the stack description', () => {
    render(<App />);
    expect(
      screen.getByText(/react \+ vite \+ typescript \+ tailwind css template/i),
    ).toBeInTheDocument();
  });
});
