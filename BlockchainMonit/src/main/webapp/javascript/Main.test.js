import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './Home';

test('renders Greeting', () => {
  render(<App />);
  //const linkElement = screen.getByLabelText(/Greeting/i);
  //expect(linkElement).toBeInTheDocument();
});
