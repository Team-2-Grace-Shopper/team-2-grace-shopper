import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


const Navbar = ({handleClick, isLoggedIn, name}) => (
  <div id="navbar">
    <Link to="/home"><h1 className="logo">Grace Coffee.</h1></Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div>
            <Link to="/coffees">Coffee</Link>
            <Link to="/accessories">Accessories</Link>
            <Link to="/sale">Sale</Link>
            <Link to={{
              pathname: "/profile",
              state: { mode: 'edit'
              }
            }}>Profile</Link>
          </div>
          <div>
            <a href="#">Search</a>
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>Hi, {name}</a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <ul>
            <Link to="/coffees">Coffee</Link>
            <Link to="/accessories">Accessories</Link>
            <Link to="/sale">Sale</Link>
            <Link to={{
              pathname: "/profile",
              state: { mode: 'new'
              }
            }}>Register</Link>
            </ul>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.auth.name,
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)