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

  getContent = (notice) => {
    if (notice.message) {
      return notice.message
    }
    if (notice.id > 0) {
      return 'Updated successfully.'
    }
    return 'Some errors occurred.'
  }

  render() {
    this.props.notices.forEach(notice => {
      if (this.state.lastId < Math.abs(notice.id)) {
        setTimeout(() => this.props.onHideNotice(notice.id), notice.duration ? notice.duration : 3000)
        setTimeout(() => this.props.onDismissNotice(notice.id), notice.duration ? notice.duration + 500 : 3500)
      }
    })
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
                content={this.getContent(notice)}
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
