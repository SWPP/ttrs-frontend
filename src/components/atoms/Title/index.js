import React, { PropTypes } from 'react'

const Title = ({ content }) => (
  <div>
    { content }
  </div>
)


Title.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Title
