import React from 'react'
import { SETTINGS_TAB } from '../../../store/ttrs/selectors'

const SettingsTab = ({ isMainPage, currentTab }) => {
  if (isMainPage && currentTab === SETTINGS_TAB)
    return (
      <div>
      </div>
    )
  return null
}

export default SettingsTab
