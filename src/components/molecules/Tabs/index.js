import React from 'react'
import Button from '../../atoms/Button'

export const Tabs = ({ isMainPage, onGoRecommendTab, onGoBookmarkTab, onGoReceiveTab, onGoSettingsTab }) => {
  if (isMainPage) {
    return (
      <div>
        <Button type='submit' onClick={onGoRecommendTab}>Recommend</Button>
        <Button type='submit' onClick={onGoBookmarkTab}>Bookmark</Button>
        <Button type='submit' onClick={onGoReceiveTab}>Receive</Button>
        <Button type='submit' onClick={onGoSettingsTab}>Settings</Button>
      </div>
    )
  }
  return null
}

export default Tabs
