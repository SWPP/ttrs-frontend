import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const Tabs = ({ isSignedIn, onGoRecommendTab, onGoBookmarkTab, onGoReceivedTab, onGoSettingTab }) => {
  if (isSignedIn) {
    return (
      <div>
        <Button type='submit' onClick={onGoRecommendTab}>Recommend</Button>
        <Button type='submit' onClick={onGoBookmarkTab}>Bookmark</Button>
        <Button type='submit' onClick={onGoReceivedTab}>Received</Button>
        <Button type='submit' onClick={onGoSettingTab}>Settings</Button>
      </div>
    )
  }
  return null
}

Tabs.propTypes = {
  isSignedIn: PropTypes.bool,
  onGoRecommendTab: PropTypes.func.isRequired,
  onGoBookmarkTab: PropTypes.func.isRequired,
  onGoReceivedTab: PropTypes.func.isRequired,
  onGoSettingTab: PropTypes.func.isRequired,
}

export default Tabs
