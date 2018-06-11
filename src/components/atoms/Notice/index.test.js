import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Notice from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    lastId: 0,
    notices: [
      {
        id: 2,
        message: 'hhh',
      },
      {
        id: 3,
      },
      {
        id: -4,
      },
    ],
    onDismissNotice: jest.fn(),
    onHideNotice: jest.fn(),
  }

  const enzymeWrapper = shallow(<Notice {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('Notice', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('lecwjoeif').exists()).toBe(false)
  })
})
