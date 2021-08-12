import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AccountDropdown from "./AccountDropdown";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown(ev) {
    ev.preventDefault();
    this.setState({ showDropdown: true }, () => {
      document.addEventListener("click", this.closeDropdown);
    });
  }
  closeDropdown() {
    this.setState({ showDropdown: false }, () => {
      document.removeEventListener("click", this.closeDropdown);
    });
  }

  render() {
    const { handleClick, isLoggedIn, name, isAdmin } = this.props;
    return (
      <div id="navbar">
        <div>
          <Link to="/home">
            <h1 className="logo">Grace Coffee.</h1>
          </Link>
          <div>
            <Link to="/coffees">Coffee</Link>
            <Link to="/accessories">Accessories</Link>
            <Link to="/sale">Sale</Link>
          </div>
        </div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a href="#">
                <img
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/tab_bar_icons/TabBar_Search.png"
                  width="15"
                />
              </a>
              <Link to="/cart">
                <img
                  src="https://freeiconshop.com/wp-content/uploads/edd/shopping-bag-outline.png"
                  width="18px"
                />
              </Link>
              <button onClick={this.showDropdown}>Hi, {name}</button>
              {this.state.showDropdown ? <AccountDropdown /> : null}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <a href="#">
                <img
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/tab_bar_icons/TabBar_Search.png"
                  width="15"
                />
              </a>
              <Link to="/cart">
                <img
                  src="https://freeiconshop.com/wp-content/uploads/edd/shopping-bag-outline.png"
                  width="18px"
                />
              </Link>
              <button onClick={this.showDropdown}>
                <img
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/tab_bar_icons/person-crop-circle.png"
                  width="15px"
                />
              </button>
              {this.state.showDropdown ? <AccountDropdown /> : null}
              {/* <Link
                to={{
                  pathname: "/register",
                  state: { mode: "new" },
                }}
              >
                <img
                  src="https://developer.apple.com/design/human-interface-guidelines/ios/images/icons/tab_bar_icons/person-crop-circle.png"
                  width="15px"
                />{" "}
                Register
              </Link> */}
            </div>
          )}
        </nav>
      </div>
    );
  }
}

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

export default connect(mapState, mapDispatch)(Navbar);
