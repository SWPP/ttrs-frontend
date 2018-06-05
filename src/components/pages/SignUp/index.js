import React from 'react'
import PropTypes from 'prop-types'
import { Form, Grid, Header, Segment, Button, Message } from 'semantic-ui-react'
import { customErrors } from '../../../services/error_utility'
import { initialErrorUnit } from '../../../store/ttrs/selectors'
import Notice from '../../atoms/Notice'

class SignUp extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.toSignIn) {
      setTimeout(() => {
        props.onExit()
        props.router.push('/sign-in')
      }, 4000)
    }
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

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      grade: null,
      collegeIndex: null,
      departmentIndex: null,
      majorIndex: null,
      response: props.response,
      notice: false,
    }
  }

  componentWillUnmount() {
    this.props.onSetError(initialErrorUnit)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSignUp = () => {
    const errors = customErrors({
      passwordConfirm: [this.state.password === this.state.passwordConfirm, 'Two passwords should be same.'],
      grade: [this.state.grade !== null, 'This field may not be blank.'],
      college: [this.state.collegeIndex !== null, 'This field may not be blank.'],
    })
    if (errors !== null) {
      this.props.onSetError(errors)
      return
    }

    this.props.onSetError(initialErrorUnit)
    this.props.onSignUp(
      this.state.username,
      this.state.password,
      // `${this.state.email}@snu.ac.kr`,
      this.state.email,
      this.state.grade,
      this.state.collegeIndex === null ? null : this.props.colleges[this.state.collegeIndex].id,
      this.state.departmentIndex === null ? null : this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].id,
      this.state.majorIndex === null ? null : this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors[this.state.majorIndex].id,
    )
  }

  render() {
    if (this.state.notice) {
      setTimeout(() => {
        this.setState({ notice: false })
      }, this.state.response > 0 ? 4000 : 2000)
    }
    const errors = this.props.errors

    const gradeOptions = [1, 2, 3, 4, 5, 6].map(grade => ({ key: grade, text: grade, value: grade }))
    const collegeOptions = this.props.colleges.map((college, index) => ({ key: college.id, text: college.name, value: index }))
    const departmentOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.collegeIndex !== null) {
      departmentOptions.push(...this.props.colleges[this.state.collegeIndex].departments.map((department, index) => ({
        key: department.id,
        text: department.name,
        value: index,
      })))
    }
    const majorOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.departmentIndex !== null) {
      majorOptions.push(...this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors.map((major, index) => ({
        key: major.id,
        text: major.name,
        value: index,
      })))
    }

    return (
      <div className="sign-up-form">
        <style>{`
          body > main,
          body > main > div,
          body > main > div > div.sign-up-form {
            height: 100%;
          }`}
        </style>
        <Notice
          openSuccess={this.state.notice && this.state.response > 0}
          openError={this.state.notice && this.state.response < 0}
          textSuccess={<div>You have successfully joined the membership.<br />Return to sign in page...</div>}
        />
        <Grid
          style={{ height: '100%' }}
          verticalAlign="middle"
          centered
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" color="teal" textAlign="center">
              TTRS
            </Header>
            <Form size="large" onSubmit={this.handleSignUp}>
              <Segment raised>
                <Form.Input
                  fluid
                  required
                  label="Username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  error={errors.bools.username}
                  onChange={this.handleChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    required
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    error={errors.bools.password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    required
                    label="Password Confirm"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password Confirm"
                    type="password"
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    error={errors.bools.passwordConfirm}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  icon="mail"
                  required
                  label="Email Address"
                  iconPosition="left"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={this.state.email}
                  error={errors.bools.email}
                  onChange={this.handleChange}
                />
                <Form.Select
                  label="Grade"
                  required
                  placeholder="Grade"
                  options={gradeOptions}
                  name="grade"
                  value={this.state.grade}
                  error={errors.bools.grade}
                  onChange={this.handleChange}
                />
                <Form.Select
                  label="College"
                  required
                  placeholder="College"
                  options={collegeOptions}
                  name="collegeIndex"
                  value={this.state.collegeIndex}
                  error={errors.bools.college}
                  onChange={(e, { name, value }) => {
                    this.setState({ [name]: value })
                    this.setState({ departmentIndex: null })
                    this.setState({ majorIndex: null })
                  }}
                />
                <Form.Select
                  label="Department"
                  placeholder="Department"
                  options={departmentOptions}
                  name="departmentIndex"
                  value={this.state.departmentIndex}
                  error={errors.bools.department}
                  onChange={(e, { name, value }) => {
                    this.setState({ [name]: value })
                    this.setState({ majorIndex: null })
                  }}
                />
                <Form.Select
                  label="Major"
                  placeholder="Major"
                  options={majorOptions}
                  name="majorIndex"
                  value={this.state.majorIndex}
                  error={errors.bools.major}
                  onChange={this.handleChange}
                />
                <Button.Group widths="2" >
                  <Button type="button" color="teal" size="large" onClick={() => this.props.router.push('/sign-in')}>Return</Button>
                  <Button type="submit" color="teal" size="large">Sign Up</Button>
                </Button.Group>
              </Segment>
            </Form>
            {Object.keys(errors.texts).length > 0 &&
            <Message
              negative
              header="There are some errors with your submission"
              list={Object.keys(errors.texts).map(key => errors.texts[key])}
            />}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func,
  onSetError: PropTypes.func,
  toSignIn: PropTypes.bool,
  colleges: PropTypes.array,
  errors: PropTypes.object,
  response: PropTypes.number,
  router: PropTypes.object,
}

export default SignUp
