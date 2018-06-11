import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SemesterSwitcher from '../SemesterSwitcher'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    semesters: [],

    onSwitchSemester: () => {},
  }
  const enzymeWrapper = shallow(<SemesterSwitcher {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('SemesterSwitcher', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
