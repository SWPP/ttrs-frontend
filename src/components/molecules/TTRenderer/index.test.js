import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TTRenderer from '../TTRenderer'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    lectures: [],
    canDeleteLecture: true,

    onDeleteLecture: () => {},
    onChange: () => {},
  }
  const enzymeWrapper = shallow(<TTRenderer {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('TTRenderer', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
