import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

test('renders Home', () => {
  render(<Home />);
  expect(screen.getByRole('home')).not.toHaveTextContent("Name")
  expect(screen.getByRole('home')).not.toHaveTextContent("Network")
  expect(screen.getByRole('home')).not.toHaveTextContent("Price")
  fireEvent.click(screen.getByRole('getStartedBtn'));
  expect(screen.getByRole('home')).toHaveTextContent("Name")
  expect(screen.getByRole('home')).toHaveTextContent("Network")
  expect(screen.getByRole('home')).toHaveTextContent("Price")
});
