import React from 'react'
import Button from '../../atoms/Button'
import { BOOKMARK_TAB, RECEIVE_TAB, RECOMMEND_TAB, SETTINGS_TAB } from '../../../store/ttrs/selectors'


const Tabs = ({ isMainPage, notRecommends, onChangeTab, onGetNotRecommendCourses }) => {
  const onSubmit = () => {
    onGetNotRecommendCourses(notRecommends)
    onChangeTab(SETTINGS_TAB)
  }

  if (isMainPage) {
    return (
      <div>
        <Button type="submit" onClick={() => onChangeTab(RECOMMEND_TAB)}>Recommend</Button>
        <Button type="submit" onClick={() => onChangeTab(BOOKMARK_TAB)}>Bookmark</Button>
        <Button type="submit" onClick={() => onChangeTab(RECEIVE_TAB)}>Receive</Button>
        <Button type="submit" onClick={onSubmit}>Settings</Button>
      </div>
    )
  }
  return null
}

export default Tabs
