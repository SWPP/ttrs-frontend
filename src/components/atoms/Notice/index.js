import React from 'react'
import PropTypes from 'prop-types'
import { Header, Message, Transition } from 'semantic-ui-react'

class Notice extends React.Component {
  static getDerivedStateFromProps(props, state) {
    let lastId = state.lastId
    props.notices.forEach(notice => {
      if (state.lastId < Math.abs(notice.id)) {
        setTimeout(() => props.onHideNotice(notice.id), notice.duration ? notice.duration : 3000)
        setTimeout(() => props.onDismissNotice(notice.id), notice.duration ? notice.duration + 500 : 3500)
        lastId = Math.max(lastId, notice.id)
      }
    })
    return { lastId }
  }

  state = {
    lastId: 0,
  }

  render() {
    // this.props.notices.forEach(notice => {
    //   console.log(notice)
    //   setTimeout(() => this.props.onDismissNotice(notice.id), notice.duration ? notice.duration + 2000 : 5000)
    // })
    return (
      <div>
        {this.props.notices.map(notice => (
          <Transition visible={!notice.invisible} key={notice.id} transitionOnMount>
            <Message
              style={{ marginLeft: 10, marginRight: 10, left: '50%', transform: 'translateX(-50%)', top: '10%', position: 'fixed', zIndex: 10000 + Math.abs(notice.id) }}
              success={notice.id > 0}
              negative={notice.id < 0}
            >
              <Header
                textAlign="center"
                content={notice.message ? notice.message : (notice.id > 0 ? 'Updated successfully.' : 'Some errors occurred.')}
              />
            </Message>
          </Transition>
        ))}
      </div>
    )
  }
}

Notice.propTypes = {
  lastId: PropTypes.number,
  notices: PropTypes.array,
  onDismissNotice: PropTypes.func,
  onHideNotice: PropTypes.func,
}

export default Notice
