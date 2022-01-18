import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './utils/test-utils';
import LoginDrawer from "./components/login-drawer/login-drawer";
import App from "./components/app/app";

test('App has body', () => {
  render(<App />);
  // const body = querySelector('body');
  // expect(linkElement).toBeInTheDocument();
});
