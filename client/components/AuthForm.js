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
                <input name="username" type="email" autoFocus required maxLength={75}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="formfield">
                <input name="password" type="password" required maxLength={75}/>
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
                <input name="username" type="email" autoFocus required maxLength={75}/>
                <label htmlFor="username">Email address</label>
              </div>
              <div className="formfield">
                <input name="realname" type="text" required maxLength={75}/>
                <label htmlFor="realname">Full name</label>
              </div>
              <div className="formfield">
                <input name="password" type="password" required maxLength={75}/>
                <label htmlFor="password">Password</label>
              </div>
              <div className="formfield">
                <input name="confirmpassword" type="password" required maxLength={75}/>
                <label htmlFor="confirmpassword">Confirm password</label>
              </div>
              <div>
                <button type="submit" className="cta">{displayName}</button>
              </div>
              {error && error.response &&  <div><br /> {error.response.data} - please use a different email</div>}
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
      if (evt.target.name === 'login' || evt.target.password.value === evt.target.confirmpassword.value){
        const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        const realname = evt.target.realname ? evt.target.realname.value : 'NONAME'
        dispatch(authenticate(username, password, formName, realname))
      } 
      else {
        alert ('Passwords do not match - please correct and submit again')
        evt.target.password.value = '';
        evt.target.confirmpassword.value = '';
        evt.target.password.focus();
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
