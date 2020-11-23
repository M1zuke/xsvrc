import pretty from 'pretty';
import React from 'react';
import { render } from '../../../test-utils';
import { Home } from '../home/Home';

describe('<Home /> Component', () => {
  it('renders correctly', () => {
    const customResult = render(<Home />);
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });
});
