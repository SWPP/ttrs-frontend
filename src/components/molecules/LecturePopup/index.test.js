import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LecturePopup from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    userId: 1,
    username: 'stu1',
    evaluations: [
      {
        id: 1,
        comment: 'abc',
        rate: 10,
        evaluatedAt: '1039-12-12',
        likeIt: [],
      },
    ],
    lectureDetail: {
      id: 1,
    },
    notRecommends: [],
    lecture: {
      id: 1,
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
    open: true,
    canDelete: true,

    onGetEvaluations: jest.fn(),
    onAddEvaluation: jest.fn(),
    onDeleteEvaluation: jest.fn(),
    onModifyEvaluation: jest.fn(),
    onToggleLikeIt: jest.fn(),
    onAddToNotRecommends: jest.fn(),
    onDeleteFromNotRecommends: jest.fn(),
    onClose: jest.fn(),
    onDeleteLecture: jest.fn(),
  }

  const enzymeWrapper = shallow(<LecturePopup {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('LecturePopup', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('lecwjoeif').exists()).toBe(false)

    enzymeWrapper.find('#form').simulate('submit')

    enzymeWrapper.setState({
      comment: 'asdf',
    })

    enzymeWrapper.find('#form').simulate('submit')

    enzymeWrapper.setProps({
      evaluations: [
        {
          id: 1,
          comment: 'abc',
          rate: 10,
          evaluatedAt: '1039-12-12',
          likeIt: [],
        },
      ],
    })

    enzymeWrapper.setState({
      editingId: 1,
    })

    enzymeWrapper.find('#form2').simulate('submit')

    enzymeWrapper.setState({
      comment: '',
      editingId: 1,
    })

    enzymeWrapper.find('#form2').simulate('submit')
  })
})
