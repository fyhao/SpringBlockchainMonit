import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nProvider, useI18n } from './i18n';
import '@testing-library/jest-dom/extend-expect';

function Fixture() {
  const { locale, setLocale, t } = useI18n();
  return <div><span>{locale}:{t('getStarted')}</span><button onClick={() => setLocale('zh-SG')}>switch</button></div>;
}

test('switches locale and persists the selection', () => {
  window.localStorage.clear();
  render(<I18nProvider><Fixture /></I18nProvider>);
  fireEvent.click(screen.getByText('switch'));
  expect(screen.getByText('zh-SG:开始使用')).toBeInTheDocument();
  expect(window.localStorage.getItem('locale')).toBe('zh-SG');
});
