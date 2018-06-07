import React from 'react'
import PropTypes from 'prop-types'
import { Card, Sidebar, Segment, Label, Divider } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIds, getLectureIdsWithout } from '../RecommendTab'


class BookmarkTab extends React.Component {
  state = {
    sidebarVisible: false,
    bookmarkedTimeTableIndex: 0,
  }

  handleClickCard = (index) => {
    this.setState({ sidebarVisible: false })
    if (this.state.bookmarkedTimeTableIndex !== index) {
      this.setState({ bookmarkedTimeTableIndex: index })
      this.props.onSelectBookmarkedTimeTable(this.props.bookmarkedTimeTables[index])
    }
  }

  render() {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          {...this.props.myTimeTable}
          haveSidebar={false}
          canModify
          canDelete
          canCreate
          canCopyToMy={false}
          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, {lectures: getLectureIds(this.props.myTimeTable)}, newLectureId)}
          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, {lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable)}, -lectureId)}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <Divider />
        <h1>Bookmarked TimeTable</h1>
        <Sidebar.Pushable>
          <Sidebar
            as={Segment}
            animation="overlay"
            visible={this.state.sidebarVisible}
            direction="left"
          >
            <Card.Group>
              {this.props.bookmarkedTimeTables.map((timeTable, index) =>
                <Card
                  key={timeTable.id}
                  onClick={() => this.handleClickCard(index)}
                  fluid
                  style={{ paddingRight: 15 }}
                  color={this.state.bookmarkedTimeTableIndex === index ? 'teal' : null}
                >
                  <Card.Content>
                    {this.state.bookmarkedTimeTableIndex === index &&
                    <Label color="teal" corner="right" />}
                    <Card.Header>{timeTable.title.length > 9 ? timeTable.title.substring(0, 9).concat(' ...') : timeTable.title}</Card.Header>
                    <Card.Meta>{timeTable.bookmarkedAt.substring(0, 10)}</Card.Meta>
                    <Card.Meta>Credit: {timeTable.creditSum}</Card.Meta>
                    <Card.Description>Memo: {timeTable.memo.length > 20 ? timeTable.memo.substring(0, 20).concat(' ...') : timeTable.memo}</Card.Description>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Sidebar>
          <Sidebar.Pusher>
            <TimeTable
              {...this.props.bookmarkedTimeTable}
              haveSidebar
              canModify
              canDelete
              canCopyToMy
              onOpenSidebar={() => this.setState({ sidebarVisible: true })}
              onAddLecture={(newLectureId) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, { lectures: getLectureIds(this.props.bookmarkedTimeTable) }, newLectureId)}
              onModifyContent={(content) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, content, null)}
              onDeleteLecture={(lectureId) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.bookmarkedTimeTable) }, -lectureId)}
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
