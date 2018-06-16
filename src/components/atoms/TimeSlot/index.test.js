import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TimeSlot from '../TimeSlot'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    dayOfWeek: 'day',
    startTime: 'start',
    endTime: 'end',
    classroom: {},
  }
  const enzymeWrapper = shallow(<TimeSlot {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('TimeSlot', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
