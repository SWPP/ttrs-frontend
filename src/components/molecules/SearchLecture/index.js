import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal, Card, Pagination, Icon } from 'semantic-ui-react'
import Lecture from '../../../containers/Lecture'

const limit = 6

class SearchLecture extends React.Component {
  state = {
    'course.name.abbrev': '',
    page: 1,
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSearchLecture = (page = 1) => {
    const options = {
      limit,
      offset: (page - 1) * limit,
    }
    if (this.state['course.name.abbrev']) {
      options['course.name.abbrev'] = this.state['course.name.abbrev']
    }
    this.props.onSearchLecture(options)
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ page: activePage })
    this.handleSearchLecture(activePage)
  }

  render() {
    return (
      <div>
        <Modal
          size="fullscreen"
          open={this.props.open}
          style={{
            marginTop: '0px !important',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          closeOnDimmerClick={false}
        >
          <Modal.Header>
            Search Lecture
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSearchLecture}>
              <Form.Input
                label="Course Name"
                name="course.name.abbrev"
                onChange={this.handleChange}
              />
              <Form.Button
                color="teal"
                type="submit"
                content="Search"
              />
            </Form>
          </Modal.Content>
          <div className="scrolling content">
            <Card.Group itemsPerRow={3} doubling stackable>
              {this.props.searchLectures.map(lecture =>
                <Lecture
                  key={lecture.id}
                  lecture={lecture}
                  onAddLecture={() => this.props.onAddLecture(lecture.id)}
                  onAddToNotRecommends={() => this.props.onAddToNotRecommends(lecture.course.id)}
                />
              )}
            </Card.Group>
          </div>
          <Modal.Actions>
            {`${this.props.count}` &&
            <div align="center">
              <Pagination
                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={parseInt((this.props.count - 1) / limit) + 1}
                activePage={this.state.page}
                onPageChange={this.handlePageChange}
              />
            </div>}
            <Button onClick={this.props.onClose} content="Close" />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

SearchLecture.propTypes = {
  open: PropTypes.bool,
  searchLectures: PropTypes.array,
  count: PropTypes.number,
  onSearchLecture: PropTypes.func,
  onAddLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onClose: PropTypes.func,
}

export default SearchLecture
