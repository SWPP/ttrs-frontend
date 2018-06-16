import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Lecture from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    lecture: {
      course: {
        name: 'course_name',
        code: 'course_code',
        credit: 3,
      },
      note: 'lecture_note',
      timeSlots: [
        {
          dayOfWeek: '월',
          startTime: '10:00',
          endTime: '11:15',
        },
      ],
    },
    onAddLecture: jest.fn(),
  }

  const enzymeWrapper = shallow(<Lecture {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('Lecture', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()
  })
})
