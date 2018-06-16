import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NotFoundPage from '../NotFoundPage'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const enzymeWrapper = shallow(<NotFoundPage />)
  return {
    enzymeWrapper,
  }
}

describe('NotFoundPage', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
