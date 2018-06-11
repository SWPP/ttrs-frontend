import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BookmarkTab from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    myTimeTable: {},
    bookmarkedTimeTables: [
      {
        id: 'adf',
        title: 'asdf',
        lectures: [],
        memo: 'asf',
        bookmarkedAt: 'asdf',
      },
    ],
    bookmarkedTimeTable: null,
    onSelectBookmarkedTimeTable: jest.fn(),
    onUpdateMyTimeTable: jest.fn(),
    onUpdateBookmarkedTimeTable: jest.fn(),
    onDeleteTimeTable: jest.fn(),
  }

  const enzymeWrapper = shallow(<BookmarkTab {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('BookmarkTab', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.setState({
      bookmarkedTimeTableIndex: 2,
    })

    enzymeWrapper.find('#card').simulate('click')
  })
})
