import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { BookmarkTab } from 'components'

storiesOf('BookmarkTab', module)
  .add('default', () => (
    <BookmarkTab />
  ))
  .add('reverse', () => (
    <BookmarkTab reverse />
  ))
