import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PageTemplate from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
  }

  const enzymeWrapper = shallow(<PageTemplate {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('PageTemplate', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()
  })
})
