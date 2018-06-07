import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Sidebar, Segment } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIds, getLectureIdsWithout } from '../RecommendTab'


class BookmarkTab extends React.Component {
  state = {
    sidebarVisible: false,
    bookmarkedTimeTableIndex: 0,
  }

  handleClick = (index) => {
    if (this.state.bookmarkedTimeTableIndex !== index) {
      this.setState({ bookmarkedTimeTableIndex: index })
      this.props.onSelectBookmarkedTimeTable(this.props.bookmarkedTimeTables[index])
    }
  }

  toggleVisibility = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  render() {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, {lectures: getLectureIds(this.props.myTimeTable)}, newLectureId)}
          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, {lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable)}, -lectureId)}
          {...this.props.myTimeTable}
          canModify
          canDelete
          canCreate
          canCopyToMy={false}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <hr />
        <h1>Bookmarked TimeTable</h1>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable>
          <Sidebar
            as={Segment}
            animation="overlay"
            visible={this.state.sidebarVisible}
            direction="left"
          >
            <Card.Group>
              {this.props.bookmarkedTimeTables.map((value, index) =>
                <Card key={value.id} onClick={() => this.handleClick(index)} fluid>
                  <Card.Content>
                    <Card.Header>{value.title}</Card.Header>
                    <Card.Meta>{value.bookmarkedAt.substring(0, 10)}</Card.Meta>
                    <Card.Description>Memo: {value.memo.length > 20 ? value.memo.substring(0, 20).concat(' ...') : value.memo}</Card.Description>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Sidebar>
          <Sidebar.Pusher>
            <TimeTable
              onAddLecture={(newLectureId) => this.props.onUpdateBookmarkedTimeTable(this.state.bookmarkedTimeTableIndex, this.props.bookmarkedTimeTable.id, { lectures: getLectureIds(this.props.bookmarkedTimeTable) }, newLectureId)}
              onModifyContent={(content) => this.props.onUpdateBookmarkedTimeTable(this.state.bookmarkedTimeTableIndex, this.props.bookmarkedTimeTable.id, content, null)}
              onDeleteLecture={(lectureId) => this.props.onUpdateBookmarkedTimeTable(this.state.bookmarkedTimeTableIndex, this.props.bookmarkedTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.bookmarkedTimeTable) }, -lectureId)}
              {...this.props.bookmarkedTimeTable}
              canModify
              canDelete
              canCopyToMy
              onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'bookmarked', this.props.bookmarkedTimeTables) : console.log('There is no timetable')}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

BookmarkTab.propTypes = {
  myTimeTable: PropTypes.object,
  bookmarkedTimeTables: PropTypes.array,
  bookmarkedTimeTable: PropTypes.object,
  onSelectBookmarkedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onUpdateBookmarkedTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
}

export default BookmarkTab
