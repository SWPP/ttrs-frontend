import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from 'semantic-ui-react'
import RecommendTab from '../../../containers/RecommendTab'
import BookmarkTab from '../../../containers/BookmarkTab'
import ReceiveTab from '../../../containers/ReceiveTab'
import SettingsTab from '../../../containers/SettingsTab'

const panes = [
  { menuItem: 'Recommend', render: () => <Tab.Pane><RecommendTab /></Tab.Pane> },
  { menuItem: 'Bookmark', render: () => <Tab.Pane><BookmarkTab /></Tab.Pane> },
  { menuItem: 'Receive', render: () => <Tab.Pane><ReceiveTab /></Tab.Pane> },
  { menuItem: 'Settings', render: () => <Tab.Pane><SettingsTab /></Tab.Pane> },
]

class Tabs extends React.Component {
  render() {
    return (
      <Tab
        panes={panes}
        onTabChange={(e, data) => {
          if (data.activeIndex === 3) {
            this.props.onGetNotRecommendCourses(this.props.notRecommends)
          }
        }}
      />
    )
  }
}

Tabs.propTypes = {
  notRecommends: PropTypes.array,
  onGetNotRecommendCourses: PropTypes.func,
}

export default Tabs
