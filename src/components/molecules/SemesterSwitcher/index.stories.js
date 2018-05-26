import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { SemesterSwitcher } from 'components'

storiesOf('SemesterSwitcher', module)
  .add('default', () => (
    <SemesterSwitcher>Hello</SemesterSwitcher>
  ))
  .add('reverse', () => (
    <SemesterSwitcher reverse>Hello</SemesterSwitcher>
  ))
