import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../test-utils';
import { TextInput } from '../input/TextInput';
import pretty from 'pretty';

describe('<TextInput /> Component', () => {
  const noOp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls noOp onChange', () => {
    const customResult = render(<TextInput aria-label="text-input" onChange={noOp} />);

    userEvent.type(customResult.result.getByLabelText(/text-input/i), 'hallo');
    expect(noOp).toHaveBeenCalledTimes(5);

    expect(pretty(customResult.result.container.innerHTML)).toMatchSnapshot();
  });
});
