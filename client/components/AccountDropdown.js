import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const AccountDropdown = ({handleClick, isLoggedIn, name, isAdmin}) => (
  <div id="account-dropdown">
    { isAdmin ? 
      <ul>
        <p>You are Admin</p>
        <hr />
        <li><Link to="/profile">My profile</Link></li>
        <li><Link to="/orderhistory">My orders</Link></li>
        <hr />
        <li><Link to="/products-admin">Manage products</Link></li>
        <li><Link to="">Manage users</Link></li>
        <hr />
        <li><p onClick={handleClick}>Logout</p></li>
      </ul>
      :
      <ul>
        <li><Link to="/profile">My profile</Link></li>
        <li><Link to="/orderhistory">My orders</Link></li>
        <hr />
        <p onClick={handleClick}>Logout</p>
      </ul>
    }
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
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

export default connect(mapState, mapDispatch)(AccountDropdown)