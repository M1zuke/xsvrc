import userEvent from '@testing-library/user-event';
import pretty from 'pretty';
import React from 'react';
import { routes } from '../../common/routes';
import { render, withAuthentication } from '../../test-utils';
import { Navigation } from '../navigation/Navigation';

describe('<Navigation />', () => {
  it('renders empty on empty storage', () => {
    const customResult = render(<Navigation />);
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('renders correctly with userInfo', () => {
    const customResult = render(<Navigation />, { state: withAuthentication() });
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('navigates to friends', () => {
    const customResult = render(<Navigation />, { state: withAuthentication() });
    userEvent.click(customResult.result.getByLabelText(/navigate to friends/i));
    expect(customResult.history.location.pathname).toEqual(routes.friends.path);
  });
});
