import React from 'react'
import PropTypes from 'prop-types'
import { Header, Message, Transition } from 'semantic-ui-react'

const Notice = ({ openSuccess, openError, textSuccess, textError }) => {
  return (
    <div>
      <Transition visible={openSuccess}>
        <Message
          style={{ left: '50%', transform: 'translateX(-51%)', top: '10%', position: 'fixed', zIndex: 1000 }}
          success
        >
          <Header textAlign="center" content={textSuccess} />
        </Message>
      </Transition>
      <Transition visible={openError}>
        <Message
          style={{ left: '50%', transform: 'translateX(-51%)', top: '10%', position: 'fixed', zIndex: 1000 }}
          negative
        >
          <Header textAlign="center" content={textError} />
        </Message>
      </Transition>
    </div>
  )
}

Notice.propTypes = {
  openSuccess: PropTypes.bool,
  openError: PropTypes.bool,
  textSuccess: PropTypes.string,
  textError: PropTypes.string,
}

Notice.defaultProps = {
  textSuccess: 'Updated Successfully.',
  textError: 'Some Errors Occurred.',
}

export default Notice
