import React from 'react'
import PropTypes from 'prop-types'
import { Card, Sidebar, Segment, Label, Divider } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIds, getLectureIdsWithout } from '../RecommendTab'

class ReceiveTab extends React.Component {
  state = {
    sidebarVisible: false,
    receivedTimeTableIndex: 0,
  }

  handleClickCard = (index) => {
    this.setState({ sidebarVisible: false })
    if (this.state.receivedTimeTableIndex !== index) {
      this.setState({ receivedTimeTableIndex: index })
      this.props.onSelectReceivedTimeTable(this.props.receivedTimeTables[index])
    }
  }

  render() {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          haveSidebar={false}
          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIds(this.props.myTimeTable) }, newLectureId)}
          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable) }, -lectureId)}
          {...this.props.myTimeTable}
          canModify
          canDelete
          canCreate
          canCopyToMy={false}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <Divider />
        <h1>Received TimeTable</h1>
        <h2>Sender: {this.props.receivedTimeTable.sender}</h2>
        <Sidebar.Pushable>
          <Sidebar
            as={Segment}
            animation="overlay"
            visible={this.state.sidebarVisible}
            direction="left"
          >
            <Card.Group>
              {this.props.receivedTimeTables.map((timeTable, index) =>
                <Card
                  key={timeTable.id}
                  onClick={() => this.handleClickCard(index)}
                  fluid
                  style={{ paddingRight: 15 }}
                  color={this.state.receivedTimeTableIndex === index ? 'teal' : (timeTable.receivedAt === null ? 'red' : null)}
                >
                  <Card.Content>
                    {this.state.receivedTimeTableIndex === index &&
                    <Label color="teal" corner="right" />}
                    {timeTable.receivedAt === null &&
                    <Label color="red" corner="right" />}
                    <Card.Header>{timeTable.title.length > 9 ? timeTable.title.substring(0, 9).concat(' ...') : timeTable.title}</Card.Header>
                    <Card.Meta>Sender: {timeTable.sender}</Card.Meta>
                    <Card.Meta>{timeTable.receivedAt !== null ? 'received at: '.concat(timeTable.receivedAt.substring(0, 10)) : 'Not received'}</Card.Meta>
                    <Card.Meta>Credit: {timeTable.creditSum}</Card.Meta>
                    <Card.Description>Memo: {timeTable.memo.length > 20 ? timeTable.memo.substring(0, 20).concat(' ...') : timeTable.memo}</Card.Description>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          </Sidebar>
          <Sidebar.Pusher>
            <TimeTable
              haveSidebar
              onOpenSidebar={() => this.setState({ sidebarVisible: true })}
              {...this.props.receivedTimeTable}
              canModify={false}
              canDelete
              canCopyToMy
              onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'received', this.props.receivedTimeTables) : console.log('There is no timetable')}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

ReceiveTab.propTypes = {
  myTimeTable: PropTypes.object,
  receivedTimeTables: PropTypes.array,
  receivedTimeTable: PropTypes.object,
  onSelectReceivedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
}

export default ReceiveTab
