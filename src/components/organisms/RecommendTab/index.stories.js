import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { RecommendTab } from 'components'

storiesOf('RecommendTab', module)
  .add('default', () => (
    <RecommendTab />
  ))
  .add('reverse', () => (
    <RecommendTab reverse />
  ))
