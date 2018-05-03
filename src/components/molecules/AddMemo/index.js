import React, { PropTypes } from 'react'
import Button from '../../../components/atoms/Button'

export const AddMemo = ({ onAddMemo, isSignedIn }) => {
  let inputContent;
  const onSubmit = () => {
    if (inputContent.value.trim()) {
      onAddMemo(inputContent.value)
      inputContent.value = ''
    }
  }

  if (isSignedIn) {
    return (
      <div>
        <input ref={node => { inputContent = node }} placeholder={'memo'} />
        <Button type="submit" onClick={onSubmit}>Add Memo</Button>
      </div>
    )
  }
  return null
}

AddMemo.propTypes = {
  onAddMemo: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
}

export default AddMemo
