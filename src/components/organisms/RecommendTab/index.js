import React from 'react'
import PropTypes from 'prop-types'
import { Form, Grid, Progress, Segment, Sidebar, Card, Label, Dimmer, Loader } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'
import { compressBlocks } from '../../../services/parser'

export const getLectureIds = (timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    lectureIds.push(lecture.id)
  })
  return lectureIds
}

export const getLectureIdsWithout = (lectureId, timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    if (lecture.id !== lectureId) {
      lectureIds.push(lecture.id)
    }
  })
  return lectureIds
}

class RecommendTab extends React.Component {
  state = {
    recommendedTimeTableIndex: 0,
    avoidSuccessiveLecture: false,
    avoidVoidLecture: false,
    avoidFirstLecture: false,
    jeonpilWeight: '250',
    jeonseonWeight: '250',
    gyoyangWeight: '250',
    creditUserWant: '15',
    leftTimeTableSidebarVisible: false,
    rightTimeTableSidebarVisible: false,
    timeTable: 'My',
    bookmarkedSidebarVisible: false,
    bookmarkedTimeTableIndex: 0,
    receivedSidebarVisible: false,
    receivedTimeTableIndex: 0,
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleToggle = (e, { name, checked }) => {
    this.setState({ [name]: checked })
  }

  handleRecommend = () => {
    const options = {
      avoidSuccessive: this.state.avoidSuccessiveLecture,
      avoidVoid: this.state.avoidVoidLecture,
      avoidFirst: this.state.avoidFirstLecture,
      jeonpil: this.state.jeonpilWeight,
      jeonseon: this.state.jeonseonWeight,
      gyoyang: this.state.gyoyangWeight,
      credit: this.state.creditUserWant,
      blocks: compressBlocks(this.state.blocks),
    }
    this.props.onGetRecommendation(options)
    this.setState({ recommendedTimeTableIndex: 0 })
  }

  handleClickBookmarkedCard = (index) => {
    this.setState({ bookmarkedSidebarVisible: false })
    if (this.state.bookmarkedTimeTableIndex !== index) {
      this.setState({ bookmarkedTimeTableIndex: index })
      this.props.onSelectBookmarkedTimeTable(this.props.bookmarkedTimeTables[index])
    }
  }

  handleClickReceivedCard = (index) => {
    this.setState({ receivedSidebarVisible: false })
    if (this.state.receivedTimeTableIndex !== index) {
      this.setState({ receivedTimeTableIndex: index })
      this.props.onSelectReceivedTimeTable(this.props.receivedTimeTables[index])
    }
  }

  render() {
    const weightSum = Number(this.state.jeonpilWeight) + Number(this.state.jeonseonWeight) + Number(this.state.gyoyangWeight)
    const prevIndex = ((this.props.recommendedTimeTables.length + this.state.recommendedTimeTableIndex) - 1) % this.props.recommendedTimeTables.length
    const nextIndex = (this.state.recommendedTimeTableIndex + 1) % this.props.recommendedTimeTables.length

    const timeTableOptions = [
      { key: 'My', text: 'My', value: 'My' },
      { key: 'Bookmarked', text: 'Bookmarked', value: 'Bookmarked' },
      { key: 'Received', text: 'Received', value: 'Received' },
    ]

    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>
                {this.state.timeTable} TimeTable
                <Form style={{ float: 'right', marginRight: -14 }}>
                  <Form.Group inline>
                    <Form.Dropdown
                      simple
                      placeholder="TimeTable"
                      options={timeTableOptions}
                      name="timeTable"
                      value={this.state.timeTable}
                      onChange={this.handleChange}
                    />
                    {this.state.leftTimeTableSidebarVisible ?
                      <Form.Button
                        color="teal"
                        content="Close"
                        onClick={() => this.setState({ leftTimeTableSidebarVisible: false })}
                      /> :
                      <Form.Button
                        color="teal"
                        content="Options"
                        onClick={() => this.setState({ leftTimeTableSidebarVisible: true })}
                      />}
                    <Form.Button
                      disabled={this.props.recommendedTimeTableLoading}
                      color="teal"
                      content="Recommend"
                      onClick={() => {
                        this.handleRecommend()
                        this.setState({ leftTimeTableSidebarVisible: false })
                      }}
                    />
                  </Form.Group>
                </Form>
              </h1>
              <Sidebar.Pushable>
                <Sidebar
                  as={Segment}
                  animation="overlay"
                  visible={this.state.leftTimeTableSidebarVisible}
                  direction="top"
                >
                  <Form>
                    <Grid>
                      <Grid.Row columns={5}>
                        <Grid.Column>
                          <Form.Radio
                            label="연강 회피"
                            toggle
                            name="avoidSuccessiveLecture"
                            checked={this.state.avoidSuccessiveLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Radio
                            label="공강 회피"
                            toggle
                            name="avoidVoidLecture"
                            checked={this.state.avoidVoidLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Radio
                            label="1교시 회피"
                            toggle
                            name="avoidFirstLecture"
                            checked={this.state.avoidFirstLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={4}>
                        <Grid.Column>
                          <Progress
                            label="전필 가중치"
                            percent={Math.round((this.state.jeonpilWeight * 100) / weightSum)}
                            progress
                            color="orange"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="jeonpilWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.jeonpilWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Progress
                            label="전선 가중치"
                            percent={Math.round((this.state.jeonseonWeight * 100) / weightSum)}
                            progress
                            color="blue"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="jeonseonWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.jeonseonWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Progress
                            label="교양 가중치"
                            percent={Math.round((this.state.gyoyangWeight * 100) / weightSum)}
                            progress
                            color="green"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="gyoyangWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.gyoyangWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={4} style={{ marginTop: -15 }}>
                        <Grid.Column>
                          <Form.Input
                            label={`희망 학점: ${this.state.creditUserWant}`}
                            type="range"
                            name="creditUserWant"
                            min={1}
                            max={21}
                            step={1}
                            value={this.state.creditUserWant}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={8} style={{ marginTop: -15 }}>
                        <Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column />
                        <Grid.Column>
                          <Form.Button
                            disabled={this.props.recommendedTimeTableLoading}
                            color="teal"
                            content="Recommend"
                            onClick={() => {
                              this.handleRecommend()
                              this.setState({ leftTimeTableSidebarVisible: false })
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Sidebar>
                <Sidebar.Pusher>
                  {this.state.timeTable === 'My' &&
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Dimmer active={this.props.myTimeTableLoading} inverted>
                          <Loader>Loading</Loader>
                        </Dimmer>
                        <TimeTable
                          {...this.props.myTimeTable}
                          type={'My'}
                          isReceived={false}
                          haveSelection
                          isRecommended={false}
                          haveSidebar={false}
                          canModify
                          canDelete
                          canCreate
                          canCopyToMy={false}
                          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIds(this.props.myTimeTable) }, newLectureId)}
                          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable) }, -lectureId)}
                          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
                          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
                          onSelectBlocks={(blocks) => this.setState({ blocks })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>}
                  {this.state.timeTable === 'Bookmarked' &&
                  <Sidebar.Pushable>
                    <Sidebar
                      as={Segment}
                      animation="overlay"
                      visible={this.state.bookmarkedSidebarVisible}
                      direction="left"
                    >
                      <Card.Group>
                        {this.props.bookmarkedTimeTables.map((timeTable, index) =>
                          <Card
                            id="card"
                            key={timeTable.id}
                            onClick={() => this.handleClickBookmarkedCard(index)}
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
                      <Grid>
                        <Grid.Row>
                          <Grid.Column>
                            <Dimmer active={this.props.bookmarkedTimeTableLoading} inverted>
                              <Loader>Loading</Loader>
                            </Dimmer>
                            <TimeTable
                              {...this.props.bookmarkedTimeTable}
                              type={'Bookmarked'}
                              isReceived={false}
                              haveSelection
                              isRecommended={false}
                              haveSidebar
                              canModify
                              canDelete
                              canCopyToMy
                              onOpenSidebar={() => this.setState({ bookmarkedSidebarVisible: true })}
                              onAddLecture={(newLectureId) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, { lectures: getLectureIds(this.props.bookmarkedTimeTable) }, newLectureId)}
                              onModifyContent={(content) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, content, null)}
                              onDeleteLecture={(lectureId) => this.props.onUpdateBookmarkedTimeTable(this.props.bookmarkedTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.bookmarkedTimeTable) }, -lectureId)}
                              onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'bookmarked', this.props.bookmarkedTimeTables) : console.log('There is no timetable')}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>}
                  {this.state.timeTable === 'Received' &&
                  <Sidebar.Pushable>
                    <Sidebar
                      as={Segment}
                      animation="overlay"
                      visible={this.state.receivedSidebarVisible}
                      direction="left"
                    >
                      <Card.Group>
                        {this.props.receivedTimeTables.map((timeTable, index) =>
                          <Card
                            id="card"
                            key={timeTable.id}
                            onClick={() => this.handleClickReceivedCard(index)}
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
                      <Grid>
                        <Grid.Row>
                          <Grid.Column>
                            <Dimmer active={this.props.receivedTimeTableLoading} inverted>
                              <Loader>Loading</Loader>
                            </Dimmer>
                            <TimeTable
                              {...this.props.receivedTimeTable}
                              type={'Received'}
                              isReceived
                              haveSelection
                              isRecommended={false}
                              haveSidebar
                              canModify={false}
                              canDelete
                              canCopyToMy
                              sender={this.props.receivedTimeTable.sender}
                              onOpenSidebar={() => this.setState({ receivedSidebarVisible: true })}
                              onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'received', this.props.receivedTimeTables) : console.log('There is no timetable')}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>}
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
            <Grid.Column>
              <h1>
                Recommended TimeTable
                <Form style={{ float: 'right', marginRight: -14 }}>
                  <Form.Group inline>
                    {this.state.rightTimeTableSidebarVisible ?
                      <Form.Button
                        color="teal"
                        content="Close"
                        onClick={() => this.setState({ rightTimeTableSidebarVisible: false })}
                      /> :
                      <Form.Button
                        color="teal"
                        content="Options"
                        onClick={() => this.setState({ rightTimeTableSidebarVisible: true })}
                      />}
                    <Form.Button
                      disabled={this.props.recommendedTimeTableLoading}
                      color="teal"
                      content="Recommend"
                      onClick={() => {
                        this.handleRecommend()
                        this.setState({ rightTimeTableSidebarVisible: false })
                      }}
                    />
                  </Form.Group>
                </Form>
              </h1>
              <Sidebar.Pushable>
                <Sidebar
                  as={Segment}
                  animation="overlay"
                  visible={this.state.rightTimeTableSidebarVisible}
                  direction="top"
                >
                  <Form>
                    <Grid>
                      <Grid.Row columns={5}>
                        <Grid.Column>
                          <Form.Radio
                            label="연강 회피"
                            toggle
                            name="avoidSuccessiveLecture"
                            checked={this.state.avoidSuccessiveLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Radio
                            label="공강 회피"
                            toggle
                            name="avoidVoidLecture"
                            checked={this.state.avoidVoidLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Form.Radio
                            label="1교시 회피"
                            toggle
                            name="avoidFirstLecture"
                            checked={this.state.avoidFirstLecture}
                            onChange={this.handleToggle}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={4}>
                        <Grid.Column>
                          <Progress
                            label="전필 가중치"
                            percent={Math.round((this.state.jeonpilWeight * 100) / weightSum)}
                            progress
                            color="orange"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="jeonpilWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.jeonpilWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Progress
                            label="전선 가중치"
                            percent={Math.round((this.state.jeonseonWeight * 100) / weightSum)}
                            progress
                            color="blue"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="jeonseonWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.jeonseonWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <Progress
                            label="교양 가중치"
                            percent={Math.round((this.state.gyoyangWeight * 100) / weightSum)}
                            progress
                            color="green"
                          />
                          <Form.Input
                            style={{ marginTop: -10 }}
                            type="range"
                            name="gyoyangWeight"
                            min={1}
                            max={500}
                            step={1}
                            value={this.state.gyoyangWeight}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={4} style={{ marginTop: -15 }}>
                        <Grid.Column>
                          <Form.Input
                            label={`희망 학점: ${this.state.creditUserWant}`}
                            type="range"
                            name="creditUserWant"
                            min={1}
                            max={21}
                            step={1}
                            value={this.state.creditUserWant}
                            onChange={this.handleChange}
                          />
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={8} style={{ marginTop: -15 }}>
                        <Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column />
                        <Grid.Column>
                          <Form.Button
                            disabled={this.props.recommendedTimeTableLoading}
                            color="teal"
                            content="Recommend"
                            onClick={() => {
                              this.handleRecommend()
                              this.setState({ rightTimeTableSidebarVisible: false })
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Sidebar>
                <Sidebar.Pusher>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Dimmer active={this.props.recommendedTimeTableLoading} inverted>
                          <Loader>Loading</Loader>
                        </Dimmer>
                        <TimeTable
                          {...this.props.recommendedTimeTable}
                          type={'Recommended'}
                          isReceived={false}
                          haveSelection
                          isRecommended
                          haveSidebar={false}
                          canModify={false}
                          canDelete={false}
                          canCopyToMy
                          onShowPrevRecommend={() => {
                            this.props.onSelectRecommendedTimeTable(this.props.recommendedTimeTables[prevIndex])
                            this.setState({ recommendedTimeTableIndex: prevIndex })
                          }}
                          onShowNextRecommend={() => {
                            this.props.onSelectRecommendedTimeTable(this.props.recommendedTimeTables[nextIndex])
                            this.setState({ recommendedTimeTableIndex: nextIndex })
                          }}
                          onSelectBlocks={(blocks) => this.setState({ blocks })}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

RecommendTab.propTypes = {
  myTimeTable: PropTypes.object,
  recommendedTimeTables: PropTypes.array,
  recommendedTimeTable: PropTypes.object,
  bookmarkedTimeTables: PropTypes.array,
  bookmarkedTimeTable: PropTypes.object,
  receivedTimeTables: PropTypes.array,
  receivedTimeTable: PropTypes.object,
  myTimeTableLoading: PropTypes.bool,
  bookmarkedTimeTableLoading: PropTypes.bool,
  receivedTimeTableLoading: PropTypes.bool,
  recommendedTimeTableLoading: PropTypes.bool,
  onSelectRecommendedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
  onGetRecommendation: PropTypes.func,
  onSelectBookmarkedTimeTable: PropTypes.func,
  onUpdateBookmarkedTimeTable: PropTypes.func,
  onSelectReceivedTimeTable: PropTypes.func,
}

export default RecommendTab
