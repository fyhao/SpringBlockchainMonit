import React from 'react';
import { render } from '@testing-library/react';
import TokenGridView, { TokenGridView as RawTokenGridView } from './TokenGridView';
import { I18nProvider } from './i18n';

beforeEach(() => {
  global.WebSocket = class {
    close() {}
  };
});

test('renders TokenGridView', () => {
  const view = render(<I18nProvider><TokenGridView /></I18nProvider>);
  view.unmount();
});

test('adds every token in a multi-item websocket message', () => {
  const component = new RawTokenGridView({ i18n: { t: key => key } });
  component.setState = update => { component.state = { ...component.state, ...update }; };
  component.updateAndBroadcast({ items: [
    { name: 'ETH', network: 'Ethereum', price: 'USD 1' },
    { name: 'USDC', network: 'Ethereum', price: 'USD 1' }
  ]});
  expect(component.state.listviewdata).toHaveLength(2);
});
