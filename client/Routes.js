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
import CheckoutPlaceOrder from "./components/cart-components/CheckoutPlaceOrder";
import CheckoutShipping from "./components/cart-components/CheckoutShipping";
import CheckoutBilling from "./components/cart-components/CheckoutBilling";
import ProductsAdmin from "./components/ProductsAdmin";
import UsersAdmin from "./components/UsersAdmin";
import OrderHistory from "./components/OrderHistory";
import OrderConfirmation from "./components/cart-components/OrderConfirmation";
import EditProfileAdmin from "./components/EditProfileAdmin";
import Account from "./components/Account";
import { me } from "./store";
import EditProductAdmin from "./components/EditProductAdmin";
import ContactUs from "./components/ContactUs";


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
          <Route path="/cart/checkout/shipping" component={CheckoutShipping} />
          <Route path="/cart/checkout/billing" component={CheckoutBilling} />
          <Route path="/cart/checkout/revieworder" component={CheckoutPlaceOrder} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
          <Route path="/contactus" component={ ContactUs } />
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
