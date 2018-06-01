import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { HomePage } from 'components'

storiesOf('Home', module)
  .add('default', () => (
    <HomePage />
  ))
