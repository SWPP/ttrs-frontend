import React from 'react'
import PropTypes from 'prop-types'
import { Form, Message, Button, Header, Transition, Divider, Popup, List } from 'semantic-ui-react'
import { customErrors, initErrors, updateErrors } from '../../../services/error_utility'

class SettingsTab extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.response !== props.response) {
      return {
        response: props.response,
        notice: true,
      }
    }
    return null
  }

  constructor(props) {
    super(props)

    let collegeIndex = null
    let departmentIndex = null
    let majorIndex = null
    props.colleges.forEach((college, index) => {
      if (college.id === props.college) {
        collegeIndex = index
      }
    })
    if (collegeIndex !== null) {
      props.colleges[collegeIndex].departments.forEach((department, index) => {
        if (department.id === props.department) {
          departmentIndex = index
        }
      })
      if (departmentIndex !== null) {
        props.colleges[collegeIndex].departments[departmentIndex].majors.forEach((major, index) => {
          if (major.id === props.major) {
            majorIndex = index
          }
        })
      }
    }

    this.state = {
      passwordOld: '',
      password: '',
      passwordConfirm: '',
      grade: props.grade,
      collegeIndex,
      departmentIndex,
      majorIndex,
      response: props.response,
      notice: false,
    }
    this.errors = initErrors()

    this.gradeOptions = [1, 2, 3, 4, 5, 6].map(grade => ({ key: grade, text: grade, value: grade }))
    this.collegeOptions = props.colleges.map((college, index) => ({ key: college.id, text: college.name, value: index }))
    this.departmentOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.collegeIndex !== null) {
      this.departmentOptions.push(...props.colleges[this.state.collegeIndex].departments.map((department, index) => ({
        key: department.id,
        text: department.name,
        value: index,
      })))
    }
    this.majorOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.departmentIndex !== null) {
      this.majorOptions.push(...props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors.map((major, index) => ({
        key: major.id,
        text: major.name,
        value: index,
      })))
    }

    this.props.onGetNotRecommendCourses(this.props.notRecommends)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleUpdateInfo = () => {
    const errors = customErrors({
      passwordOld: [this.state.passwordOld === this.props.password, 'Incorrect password.'],
      passwordConfirm: [this.state.password === this.state.passwordConfirm, 'Two passwords should be same.'],
    })
    if (errors !== null) {
      this.errors = errors
      this.props.onClearError()
      this.forceUpdate()
      return
    }

    let info = {
      username: this.state.username,
      grade: this.state.grade,
      college: this.props.colleges[this.state.collegeIndex].id,
    }
    if (this.state.departmentIndex !== null) {
      info = {
        ...info,
        department: this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].id,
      }
      if (this.state.majorIndex !== null) {
        info = {
          ...info,
          major: this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors[this.state.majorIndex].id,
        }
      }
    }
    if (this.state.password.trim()) {
      info = {
        ...info,
        password: this.state.password,
      }
    }
    this.props.onUpdateInfo(info)
  }

  handleWithdraw = () => {
    const errors = customErrors({
      passwordOld2: [this.state.passwordOld2 === this.props.password, 'Incorrect password.'],
    })
    if (errors !== null) {
      this.errors = errors
      this.props.onClearError()
      this.forceUpdate()
      return
    }

    this.props.onWithdraw()
  }

  render() {
    this.errors = updateErrors(this.errors, this.props.errors)
    if (this.state.notice) {
      setTimeout(() => {
        this.setState({ notice: false })
      }, 2000)
    }

    return (
      <div>
        <Transition visible={this.state.notice && this.state.response > 0}>
          <Message
            style={{ left: '50%', transform: 'translateX(-51%)', top: '10%', position: 'fixed', zIndex: 1000 }}
            success
          >
            <Header textAlign="center" content="Updated Successfully." />
          </Message>
        </Transition>
        <Transition visible={this.state.notice && this.state.response < 0}>
          <Message
            style={{ left: '50%', transform: 'translateX(-51%)', top: '10%', position: 'fixed', zIndex: 1000 }}
            negative
          >
            <Header textAlign="center" content="Some Errors Occurred." />
          </Message>
        </Transition>
        <div>
          <Header as="h2" content="Update Profile" />
          <Form onSubmit={this.handleUpdateInfo}>
            <Form.Input
              required
              label="Old Password"
              icon="lock"
              iconPosition="left"
              placeholder="Old password"
              type="password"
              name="passwordOld"
              value={this.state.passwordOld}
              error={this.errors.bools.passwordOld}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              error={this.errors.bools.password}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Password Confirm"
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirm"
              type="password"
              name="passwordConfirm"
              value={this.state.passwordConfirm}
              error={this.errors.bools.passwordConfirm}
              onChange={this.handleChange}
            />
            <Form.Select
              label="Grade"
              required
              placeholder="Grade"
              options={this.gradeOptions}
              name="grade"
              value={this.state.grade}
              error={this.errors.bools.grade}
              onChange={this.handleChange}
            />
            <Form.Select
              label="College"
              required
              placeholder="College"
              options={this.collegeOptions}
              name="collegeIndex"
              value={this.state.collegeIndex}
              error={this.errors.bools.college}
              onChange={(e, { name, value }) => {
                this.setState({ [name]: value })
                this.setState({ departmentIndex: null })
                this.setState({ majorIndex: null })
              }}
            />
            <Form.Select
              label="Department"
              placeholder="Department"
              options={this.departmentOptions}
              name="departmentIndex"
              value={this.state.departmentIndex}
              error={this.errors.bools.department}
              onChange={(e, { name, value }) => {
                this.setState({ [name]: value })
                this.setState({ majorIndex: null })
              }}
            />
            <Form.Select
              label="Major"
              placeholder="Major"
              options={this.majorOptions}
              name="majorIndex"
              value={this.state.majorIndex}
              error={this.errors.bools.major}
              onChange={this.handleChange}
            />
            <Button type="submit" color="teal">Update</Button>
          </Form>
          {Object.keys(this.errors.bools).length > 0 &&
          <Message
            negative
            header="There are some errors with your submission"
            list={Object.keys(this.errors.texts).map(key => this.errors.texts[key])}
          />}
        </div>
        <Divider />
        <div>
          <Header as="h2" content="Not Recommends" />
          <List verticalAlign="middle" ordered>
            {this.props.notRecommendCourses.map((course) => (
              <List.Item key={course.id}>
                <List.Content floated="right">
                  <Popup
                    trigger={<Button
                      icon="delete"
                      color="red"
                      inverted
                      onClick={() => this.props.onDeleteFromNotRecommends(this.props.notRecommends, course.id)}
                    />}
                    content="Allow to recommend this lecture from now."
                    inverted
                  />
                </List.Content>
                <List.Header as="h3">
                  {course.name}
                </List.Header>
              </List.Item>
            ))}
          </List>
        </div>
        <Divider />
        <div>
          <Header as="h2" content="Withdraw" />
          <Popup
            on="click"
            trigger={<Button icon="user x" negative content="Withdraw" />}
            content={<Form>
              <Form.Input
                placeholder="Input your password..."
                action={<Popup
                  inverted
                  trigger={<Button attached="right" icon="exclamation triangle" color="red" />}
                  content="You cannot undo this action."
                />}
              />
            </Form>}
          />
        </div>
      </div>
    )
  }
}

SettingsTab.propTypes = {
  password: PropTypes.string,
  grade: PropTypes.number,
  college: PropTypes.number,
  department: PropTypes.number,
  major: PropTypes.number,
  notRecommends: PropTypes.array,
  notRecommendCourses: PropTypes.array,
  colleges: PropTypes.array,
  errors: PropTypes.object,
  response: PropTypes.number,
  onUpdateInfo: PropTypes.func,
  onWithdraw: PropTypes.func,
  onGetNotRecommendCourses: PropTypes.func,
  onDeleteFromNotRecommends: PropTypes.func,
  onClearError: PropTypes.func,
  onExit: PropTypes.func,
}

export default SettingsTab
