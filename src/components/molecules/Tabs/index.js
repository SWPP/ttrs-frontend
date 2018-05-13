import React from 'react'
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

export default Tabs
