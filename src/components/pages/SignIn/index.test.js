import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SignIn from '../SignIn'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    toHome: false,
    errors: {
      texts: {
        bools: {},
        texts: {},
      },
    },
    router: {},

    onSignIn: () => {},
    onClearError: () => {},
    onSetError: () => {},
  }
  const enzymeWrapper = shallow(<SignIn {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('SignIn', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
