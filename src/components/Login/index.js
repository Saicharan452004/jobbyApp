import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', showError: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showError: true, errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {username: userName, password: passWord}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMessage, userName, passWord} = this.state
    console.log(showError)
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="page-container">
        <form
          className="login-page-form-container"
          onSubmit={this.onSubmitForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label className="login-page-label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="login-page-input-container"
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
            value={userName}
          />
          <label className="login-page-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={passWord}
            className="login-page-input-container"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-page-button">
            Login
          </button>
          {showError && (
            <p className="login-page-error-message">*{errorMessage}</p>
          )}
        </form>
      </div>
    )
  }
}
export default Login
