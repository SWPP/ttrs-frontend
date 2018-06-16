import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SettingsTab from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    password: 'asdf',
    grade: 1,
    college: 1,
    department: 1,
    major: 1,
    notRecommends: [1, 2, 3],
    notRecommendCourses: [],
    colleges: [
      {
        id: 1,
        name: 'asdf',
        departments: [
          {
            id: 1,
            name: 'asdf',
            majors: [
              {
                id: 1,
                name: 'asf',
              },
            ],
          },
        ],
      },
    ],
    errors: {
      bools: {},
      texts: {},
    },
    onUpdateInfo: () => {},
    onWithdraw: () => {},
    onGetNotRecommendCourses: () => {},
    onDeleteFromNotRecommends: () => {},
    onSetError: () => {},
  }

  const enzymeWrapper = shallow(<SettingsTab {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('SettingsTab', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.find('#form').simulate('submit')

    enzymeWrapper.setState({
      password: 'asdf',
      passwordOld: 'asdf',
      passwordConfirm: 'asdf',
    })

    enzymeWrapper.find('#form').simulate('submit')
  })
})
