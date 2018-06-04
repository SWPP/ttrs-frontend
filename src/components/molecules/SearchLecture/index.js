import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal, Card } from 'semantic-ui-react'
import Lecture from '../../../containers/Lecture'

class SearchLecture extends React.Component {
// <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
// <Button type="submit" onClick={onSubmitCourseName}>Search</Button>
// <br />
// <h2>Lectures</h2>
//   {searchLectures.map(lecture =>
//     <div key={lecture.id}>
//       <hr />
//       <Lecture
//         {...lecture}
//       />
//       <Button
//         type="submit"
//         onClick={() => onAddLecture(lecture.id)}
//       >Add To TimeTable</Button>
//       <LecturePopup
//         lecture={lecture}
//         height={1}
//         onAddToNotRecommends={(notRecommends, courseId) => onAddToNotRecommends(notRecommends, courseId)}
//         notRecommends={notRecommends}
//         canDelete={false}
//       />
//     </div>
//   )}
  state = {
    'course.name.abbrev': '',
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSearchLecture = () => {
    const options = {}
    if (this.state['course.name.abbrev']) {
      options['course.name.abbrev'] = this.state['course.name.abbrev']
    }
    this.props.onSearchLecture(options)
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
          dimmer="blurring"
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
            <Card.Group itemsPerRow={4} doubling stackable>
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
            <Button onClick={() => this.props.onClose()} content="Close" />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

SearchLecture.propTypes = {
  open: PropTypes.bool,
  searchLectures: PropTypes.array,
  onSearchLecture: PropTypes.func,
  onAddLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onClose: PropTypes.func,
}

export default SearchLecture
