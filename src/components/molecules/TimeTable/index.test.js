import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TimeTable from '../TimeTable'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    username: 'user1',
    id: 1,
    memo: 'Memo',
    title: 'Title',
    lectures: [],
    canModify: true,
    canCopyToMy: true,
    canDelete: true,
    canCreate: true,
    haveSidebar: true,

    onCopyToMy: () => {},
    onBookmark: () => {},
    onSend: () => {},
    onModifyContent: () => {},
    onAddLecture: () => {},
    onDeleteLecture: () => {},
    onDeleteTimeTable: () => {},
    onOpenSidebar: () => {},
  }
  const enzymeWrapper = shallow(<TimeTable {...props} />)
  return {
    props,
    enzymeWrapper,
  }
}

describe('TimeTable', () => {
  it('should render self and subcomponents', () => {
    setup()
  })
})
