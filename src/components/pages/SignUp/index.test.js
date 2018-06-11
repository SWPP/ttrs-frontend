import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SignUp from '../SignUp'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    toSignIn: false,
    colleges: [],
    errors: {
      bools: {},
      texts: {},
    },
    router: {},

    onSignUp: () => {},
    onSetError: () => {},
  }
  const enzymeWrapper = shallow(<SignUp {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('SignUp', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
