<<<<<<< HEAD
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Coffees from './components/Coffees'
import Accessories from './components/Accessories'
import {me} from './store'
import ChosenCoffee from './components/ChosenCoffee';
import ChosenAccessory from './components/ChosenAccessory';
=======
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Coffees from "./components/Coffees";
import Accessories from "./components/Accessories";
import ProductsAdmin from "./components/ProductsAdmin";
import OrderHistory from './components/OrderHistory';
import { me } from "./store";
>>>>>>> 422f6a0b7596ee3517f01aa003d9e82576cb4a44

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
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/coffees" component={Coffees} />
            <Route path="/accessories" component={Accessories} />
<<<<<<< HEAD
            <Route path='/profile' exact render={(routeProps) => <EditProfile {...routeProps} /> } />
            <Route exact path='/coffees/:id' component={ChosenCoffee}/>
            <Route exact path='/accessories/:id' component={ChosenAccessory}/>
=======
            <Route path="/profile" component={EditProfile} />
            <Route path="/products-admin" component={ProductsAdmin} />
            <Route path="/orderhistory" component={OrderHistory} />
>>>>>>> 422f6a0b7596ee3517f01aa003d9e82576cb4a44
          </Switch>
        ) : (
          <Switch>
            <Route path="/profile" component={EditProfile} />
            <Route path="/" exact component={Login} />
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
