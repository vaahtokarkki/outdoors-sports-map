import React from 'react';

import { mount } from '../../enzymeHelpers';
import JumpLink from '../JumpLink';
import { MAIN_CONTENT_ID } from '../Page';

const getWrapper = (props) => mount(<JumpLink {...props} />);

describe('<JumpLink />', () => {
  it('should render an anchor with id of MAIN_CONTENT_ID', async () => {
    const wrapper = await getWrapper();

    expect(wrapper.find(`a[href="#${MAIN_CONTENT_ID}"]`).length).toEqual(1);
  });
});
