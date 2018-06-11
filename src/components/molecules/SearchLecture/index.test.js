import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchLecture from '../SearchLecture'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    searchLectures: [],
    count: 0,
    colleges: [
      {
        name: '공과대학',
        departments: [
          {
            name: '컴퓨터공학부',
            majors: [
              {
                name: '',
              },
            ],
          },
        ],
      },
    ],
    fields: {
      '학문의 세계': [
        '헤헤',
      ],
    },
    types: [],

    onSearchLecture: () => {},
    onClose: () => {},
    onAddLecture: () => {},
  }
  const enzymeWrapper = shallow(<SearchLecture {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('SearchLecture', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()
    enzymeWrapper.setState({
      'course.name.abbrev': '초중어',
      'course.code': '031.001',
      instructor: '권현우',
      collegeIndex: 0,
      departmentIndex: 0,
      majorIndex: 0,
      order_by: '-rating',
      'course.type': '교양',
      'course.grade': 1,
      'course.credit.gte': 1,
      'course.credit.lte': 3,
      'course.field.startswith': '학문의 세계',
      'course.field.endswith': '헤헤',
    })
    enzymeWrapper.find('#form').simulate('submit')
  })
})
