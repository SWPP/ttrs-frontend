import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Memo from '.'

storiesOf('Memo', module)
  .add('default', () => (
    <Memo>Hello</Memo>
  ))
  .add('reverse', () => (
    <Memo reverse>Hello</Memo>
  ))
