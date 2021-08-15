import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Coffees from "./components/Coffees";
import ChosenCoffee from "./components/ChosenCoffee";
import Accessories from "./components/Accessories";
import ChosenAccessory from "./components/ChosenAccessory";
import CartView from "./components/cart-components/CartView";
import Checkout from "./components/cart-components/Checkout";
import Confirmation from "./components/cart-components/Confirmation";
import ProductsAdmin from "./components/ProductsAdmin";
import UsersAdmin from "./components/UsersAdmin";
import OrderHistory from "./components/OrderHistory";
import OrderConfirmation from "./components/OrderConfirmation";
import EditProfileAdmin from "./components/EditProfileAdmin";
import Account from "./components/Account";
import { me } from "./store";
import EditProductAdmin from "./components/EditProductAdmin";


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route exact path="/coffees" component={Coffees} />
          <Route exact path="/coffees/:id" component={ChosenCoffee} />
          <Route exact path="/accessories" component={Accessories} />
          <Route exact path="/accessories/:id" component={ChosenAccessory} />
          <Route path="/coffees" component={Coffees} />
          <Route path="/accessories" component={Accessories} />
          <Route path="/cart" exact component={CartView} />
          <Route path="/cart/checkout" component={Checkout} />
          <Route path="/cart/confirmation" component={Confirmation} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
        </Switch>
        {isLoggedIn ? (
          <Switch>
            <Route path="/profile" component={EditProfile} />
            <Route path="/account" component={Account} />
            <Route path="/products-admin" exact component={ProductsAdmin} />
            <Route path="/users-admin" exact component={UsersAdmin} />
            <Route path="/orderhistory" component={OrderHistory} />
            <Route path="/users-admin/:id" exact component={EditProfileAdmin} />
            <Route path="/products-admin/:id" exact component={EditProductAdmin} />
          </Switch>
        ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
