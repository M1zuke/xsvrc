import userEvent from '@testing-library/user-event';
import pretty from 'pretty';
import React from 'react';
import { routes } from '../../common/routes';
import { render, withAuthentication } from '../../test-utils';
import { UserOverview } from '../user-overview/UserOverview';

describe('<UserOverview />', () => {
  it('renders empty on empty storage', () => {
    const customResult = render(<UserOverview />);
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('renders correctly with userInfo', () => {
    const customResult = render(<UserOverview />, { state: withAuthentication() });
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('navigates to friends', () => {
    const customResult = render(<UserOverview />, { state: withAuthentication() });
    userEvent.click(customResult.result.getByLabelText(/navigate to friends/i));
    expect(customResult.history.location.pathname).toEqual(routes.friends.path);
  });
});
