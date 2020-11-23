import pretty from 'pretty';
import React from 'react';
import { render, withAuthentication } from '../../test-utils';
import { Secured } from '../secured/Secured';

describe('<Secured /> Component', () => {
  it('renders Login if not logged in', () => {
    const customResult = render(
      <Secured>
        <div data-testid="test-content" />
      </Secured>,
    );
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });

  it('renders children if logged in', () => {
    const customResult = render(
      <Secured>
        <div data-testid="test-content" />
      </Secured>,
      {
        state: withAuthentication(),
      },
    );
    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });
});
