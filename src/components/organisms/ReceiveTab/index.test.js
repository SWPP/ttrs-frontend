import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReceiveTab from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    myTimeTable: {},
    receivedTimeTables: [
      {
        id: 'adf',
        title: 'asdf',
        lectures: [],
        memo: 'asf',
        receivedAt: null,
        sender: 'asfd',
      },
    ],
    receivedTimeTable: {
      sender: 'asdf',
    },
    onSelectReceivedTimeTable: () => {},
    onUpdateMyTimeTable: () => {},
    onDeleteTimeTable: () => {},
  }

  const enzymeWrapper = shallow(<ReceiveTab {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('ReceiveTab', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.setState({
      receivedTimeTableIndex: '12',
    })

    enzymeWrapper.find('#card').simulate('click')
  })
})
