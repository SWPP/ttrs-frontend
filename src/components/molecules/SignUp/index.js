import React from 'react'
import PropTypes from 'prop-types'
import { Form, Grid, Header, Segment, Button, Message } from 'semantic-ui-react'
import { customErrors, initErrors, updateErrors } from '../../../services/error_utility'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    grade: null,
    collegeIndex: null,
    departmentIndex: null,
    majorIndex: null,
  }
  errors = initErrors()

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
      this.errors = errors
      this.props.onClearError()
      this.forceUpdate()
      return
    }
    this.errors = initErrors()

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
    if (!this.props.isSignUpPage) {
      return null
    }

    this.errors = updateErrors(this.errors, this.props.errors)

    const gradeOptions = [1, 2, 3, 4].map(grade => ({ key: grade, text: grade, value: grade }))
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
                  error={this.errors.bools.username}
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
                    error={this.errors.bools.password}
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
                    error={this.errors.bools.passwordConfirm}
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
                  error={this.errors.bools.email}
                  onChange={this.handleChange}
                />
                <Form.Select
                  label="Grade"
                  required
                  placeholder="Grade"
                  options={gradeOptions}
                  name="grade"
                  value={this.state.grade}
                  error={this.errors.bools.grade}
                  onChange={this.handleChange}
                />
                <Form.Select
                  label="College"
                  required
                  placeholder="College"
                  options={collegeOptions}
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
                  options={departmentOptions}
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
                  options={majorOptions}
                  name="majorIndex"
                  value={this.state.majorIndex}
                  error={this.errors.bools.major}
                  onChange={this.handleChange}
                />
                <Button.Group widths="2" >
                  <Button type="button" color="teal" size="large" onClick={this.props.onReturnToSignInPage}>Return</Button>
                  <Button type="submit" color="teal" size="large">Sign Up</Button>
                </Button.Group>
              </Segment>
            </Form>
            {Object.keys(this.errors.bools).length > 0 &&
            <Message
              negative
              header="There are some errors with your submission"
              list={Object.keys(this.errors.texts).map(key => this.errors.texts[key])}
            />}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func,
  onReturnToSignInPage: PropTypes.func,
  onClearError: PropTypes.func,
  isSignUpPage: PropTypes.bool,
  colleges: PropTypes.array,
  errors: PropTypes.object,
}

export default SignUp
