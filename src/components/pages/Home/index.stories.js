import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Home } from 'components'

storiesOf('Home', module)
  .add('default', () => (
    <Home />
  ))
