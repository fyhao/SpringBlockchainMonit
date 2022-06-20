import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

test('renders Home', () => {
  render(<Home />);
  expect(screen.getByRole('home')).toHaveTextContent("Home")
  expect(screen.getByRole('home')).toHaveTextContent("Name")
  expect(screen.getByRole('home')).toHaveTextContent("Network")
  expect(screen.getByRole('home')).toHaveTextContent("Price")
});
