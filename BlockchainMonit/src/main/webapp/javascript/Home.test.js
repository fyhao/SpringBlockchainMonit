import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import { I18nProvider } from './i18n';

test('renders Home', () => {
  render(<I18nProvider><Home /></I18nProvider>);
  expect(screen.getByRole('home')).not.toHaveTextContent("Name")
  expect(screen.getByRole('home')).not.toHaveTextContent("Network")
  expect(screen.getByRole('home')).not.toHaveTextContent("Price")
  fireEvent.click(screen.getByRole('getStartedBtn'));
  expect(screen.getByRole('home')).toHaveTextContent("Name")
  expect(screen.getByRole('home')).toHaveTextContent("Network")
  expect(screen.getByRole('home')).toHaveTextContent("Price")
});
