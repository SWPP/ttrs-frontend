import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RecommendTab from '.'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    myTimeTable: null,
    recommendedTimeTables: [],
    recommendedTimeTable: null,
    onSelectRecommendedTimeTable: () => {},
    onUpdateMyTimeTable: () => {},
    onDeleteTimeTable: () => {},
    onGetRecommendation: () => {},
  }

  const enzymeWrapper = shallow(<RecommendTab {...props} />)

  return {
    props,
    enzymeWrapper,
  }
}

describe('RecommendTab', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup()

    enzymeWrapper.setState({
    })
  })
})
