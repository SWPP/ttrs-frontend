import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'

import theme from './themes/default'
import Notice from '../containers/Notice'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Notice />
        {children}
      </div>
    </ThemeProvider>
  )
}

App.propTypes = {
  children: PropTypes.any,
}

export default App
