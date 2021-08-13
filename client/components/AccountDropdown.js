import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const AccountDropdown = ({ handleClick, isLoggedIn, name, isAdmin }) => (
  <div id="account-dropdown">
    {isLoggedIn ? (
      /* if user is logged in */
      <div>
        {isAdmin ? (
          <ul>
            <li>
              <Link to="/account">My profile</Link>
            </li>
            <li>
              <Link to="/orderhistory">My orders</Link>
            </li>
            <div>
              <span>You are Admin</span>
              <li>
                <Link to="/products-admin">Manage products</Link>
              </li>
              <li>
                <Link to="/users-admin">Manage users</Link>
              </li>
            </div>
            <li>
              <span className="clickable" onClick={handleClick}>
                Logout
              </span>
            </li>
          </ul>
        ) : (
            <ul>
              <li>
                <Link to="/profile">My profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">My orders</Link>
              </li>
              <hr />
              <span className="clickable" onClick={handleClick}>
                Logout
            </span>
            </ul>
          )}
      </div>
    ) : (
        /* if user is NOT logged in */
        <div>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </div>
      )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountDropdown);
