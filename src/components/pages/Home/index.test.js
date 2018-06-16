import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../Home'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    isSignedIn: true,
    username: 'user1',
    router: {},
    route: {
      currentTab: 'bookmark',
    },

    onSignOut: () => {},
  }
  const enzymeWrapper = shallow(<Home {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('Home', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
