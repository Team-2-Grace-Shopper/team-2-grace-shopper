import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

/**
 * COMPONENT
 */

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  console.log(name)
  return (
    <div id="content-wrapper">
      <div id="profilecontainer">
        <div className="container" id="profileleft">
          <h2 className="profilehdr">{displayName}</h2>
        </div>

        <div className="container" id="profileright">
          {name === 'login' ?
            <form onSubmit={handleSubmit} name={name} id="profileform">
              <div className="formfield">
                <input name="username" type="text" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="formfield">
                <input name="password" type="password" />
                <label htmlFor="password">Password</label>
              </div>
              <div>
                <button type="submit" className="cta">{displayName}</button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
            :
            <form onSubmit={handleSubmit} name={name} id="profileform">
              <div className="formfield">
                <input name="username" type="text" />
                <label htmlFor="username">Email address</label>
              </div>
              <div className="formfield">
                <input name="name" type="text" />
                <label htmlFor="name">Full name</label>
              </div>
              <div className="formfield">
                <input name="password" type="password" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="formfield">
                <input name="confirmpassword" type="password" />
                <label htmlFor="confirmpassword">Confirm password</label>
              </div>
              <div>
                <button type="submit" className="cta">{displayName}</button>
              </div>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          }
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('LOGIN PROP', evt.target.username.value)
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
