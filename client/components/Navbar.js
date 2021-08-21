import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Icon } from '@iconify/react';
import AccountDropdown from "./AccountDropdown";
//import { cartReducer } from "../store/cart";
import { getCart } from "../store/cart";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      coffeeClass:'',
      accyClass: '',
      prevCoffee: '',
      prevAccy: '',
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  async componentDidMount(){
    if (this.props.userId){
      await this.props.getCart(this.props.userId);
    }
  }

  async componentDidUpdate(prevProps){
    if (this.props.userId != prevProps.userId){
//    if (this.props.nbrCartItems != prevProps.nbrCartItems){
  console.log('CDU', this.props)
      await this.props.getCart(this.props.userId);
    }
  }

  showDropdown(ev) {
    ev.preventDefault();
    this.setState({prevCoffee: this.state.coffeeClass, prevAccy: this.state.accyClass})
    this.handleResetClick();
    this.setState({ showDropdown: true }, () => {
      document.addEventListener("click", this.closeDropdown);
    });
  }
  closeDropdown() {
    this.setState({ showDropdown: false }, () => {
      document.removeEventListener("click", this.closeDropdown);
    });
  }

  handleResetClick=(ev)=>{
    this.setState({coffeeClass: '', accyClass: ''})
  }
  handleCoffeeClick=(ev)=>{
    this.setState({coffeeClass: 'activeCategory', accyClass: '', prevCoffee: 'activeCategory', prevAccy: ''})
  }
  handleAccyClick=(ev)=>{
    this.setState({coffeeClass: '', accyClass: 'activeCategory', prevCoffee: '', prevAccy: 'activeCategory'})
  }

  render() {

    const { handleClick, isLoggedIn, name, isAdmin } = this.props;
    return (
      <div id="navbar">
        <div>
          <Link onClick={this.handleResetClick} to="/home">
            <h1 className="logo">Grace Coffee .</h1>
            {/* MOVE BELOW TO OVER THE CART */}
            {/* <h1>{this.props.nbrCartItems} items in cart</h1> */}
            {/* MOVE ABOVE TO OVER THE CART */}
          </Link>
          <div>
            <Link to="/coffees" className={this.state.coffeeClass} onClick={this.handleCoffeeClick}>Coffees</Link>
            <Link to="/accessories" className={this.state.accyClass}  onClick={this.handleAccyClick}>Accessories</Link>
          </div>
        </div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a  onClick={this.handleResetClick} href="#">
                <Icon icon="bx:bx-search" width="20" />
              </a>
              <Link onClick={this.handleResetClick} to="/cart">
                <Icon icon="bx:bx-shopping-bag" width="20" />
              </Link>
              <Link onClick={this.handleResetClick} to="/cart" id="cartCountCircle">
                {this.props.nbrCartItems}
              </Link>
              <button onClick={this.showDropdown}><Icon icon="bx:bx-user-circle" width="20" /> {name}</button>
              {this.state.showDropdown ? <AccountDropdown handleResetClick={this.handleResetClick}/> : null}
              
            </div>
          ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <a  onClick={this.handleResetClick} href="#">
                  <Icon icon="bx:bx-search" width="20" />
                </a>
                <Link onClick={this.handleResetClick} to="/cart">
                  <Icon icon="bx:bx-shopping-bag" width="20" />
                </Link>
                <Link onClick={this.handleResetClick} to="/cart" id="cartCountCircle">
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
  let cartItems = 0;
  if (window.localStorage.getItem('cart')) {
    cartItems = JSON.parse(window.localStorage.getItem('cart'))[0].orderlines.length;
  }
  else {
    cartItems = state.cart && state.cart.length > 0 ? state.cart[0].orderlines.length : 0;
  }

  return {
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    nbrCartItems: cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCart(userId)),
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
