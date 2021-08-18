import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Icon } from '@iconify/react';
import AccountDropdown from "./AccountDropdown";
//import { cartReducer } from "../store/cart";
//import { getCart } from "../store/cart";

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
            {/* MOVE BELOW TO OVER THE CART */}
            {/* <h1>{this.props.nbrCartItems} items in cart</h1> */}
            {/* MOVE ABOVE TO OVER THE CART */}
          </Link>
          <div>
            <Link to="/coffees">Coffee</Link>
            <Link to="/accessories">Accessories</Link>
          </div>
        </div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a href="#">
                <Icon icon="bx:bx-search" width="20" />
              </a>
              <Link to="/cart">
                <Icon icon="bx:bx-shopping-bag" width="20" />
              </Link>
              <Link to="/cart" id="cartCountCircle">
                {this.props.nbrCartItems}
              </Link>
              <button onClick={this.showDropdown}><Icon icon="bx:bx-user-circle" width="20" /> {name}</button>
              {this.state.showDropdown ? <AccountDropdown /> : null}
            </div>
          ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <a href="#">
                  <Icon icon="bx:bx-search" width="20" />
                </a>
                <Link to="/cart">
                  <Icon icon="bx:bx-shopping-bag" width="20" />
                </Link>
                <Link to="/cart" id="cartCountCircle">
                  {this.props.nbrCartItems}
                </Link>
                <button onClick={this.showDropdown}>
                  <Icon icon="bx:bx-user-circle" width="20" />
                </button>
                {this.state.showDropdown ? <AccountDropdown /> : null}
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
    nbrCartItems: state.cart.length > 0 ? state.cart[0].orderlines.length : 0,
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
