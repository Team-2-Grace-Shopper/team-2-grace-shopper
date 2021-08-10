import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Coffees from "./components/Coffees";
import ChosenCoffee from "./components/ChosenCoffee";
import Accessories from "./components/Accessories";
<<<<<<< HEAD
import ChosenAccessory from "./components/ChosenAccessory";
=======
import CartView from "./components/cart-components/CartView";
import Checkout from "./components/cart-components/Checkout";
import Confirmation from "./components/cart-components/Confirmation";
>>>>>>> aee7e59e3422813173c3208778fe2dcfa025cd2d
import ProductsAdmin from "./components/ProductsAdmin";
import OrderHistory from './components/OrderHistory';
import { me } from "./store";

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
<<<<<<< HEAD
            <Route exact path="/coffees" component={Coffees} />
            <Route exact path='/coffees/:id' component={ChosenCoffee}/>
            <Route exact path="/accessories" component={Accessories} />
            <Route exact path='/accessories/:id' component={ChosenAccessory}/>
=======
            <Route path="/coffees" component={Coffees} />
            <Route path="/accessories" component={Accessories} />
            <Route path="/cart" exact component={CartView} />
            <Route path="/cart/checkout" component={Checkout} />
            <Route path="/cart/confirmation" component={Confirmation} />
        </Switch>
        {isLoggedIn ? (
          <Switch>
>>>>>>> aee7e59e3422813173c3208778fe2dcfa025cd2d
            <Route path="/profile" component={EditProfile} />
            <Route path="/products-admin" component={ProductsAdmin} />
            <Route path="/orderhistory" component={OrderHistory} />
          </Switch>
        ) : (
          <Switch>
<<<<<<< HEAD
            <Route path="/profile" component={EditProfile} />
            <Route path="/" exact component={Home} />
=======
>>>>>>> aee7e59e3422813173c3208778fe2dcfa025cd2d
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/coffees" component={Coffees} />
            <Route path="/coffees/:id" render={(routeProps) => <ChosenCoffee {...routeProps} />}/>
            <Route exact path='/coffees/:id' component={ChosenCoffee}/>
            <Route exact path="/accessories" component={Accessories} />
            <Route exact path='/accessories/:id' component={ChosenAccessory}/>
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