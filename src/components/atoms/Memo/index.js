import React, { PropTypes } from 'react'

const Memo = ({ content }) => (
  <div>
    { content }
  </div>
)


Memo.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Memo
