import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, updateUser } from "../store/users";
import { Icon } from '@iconify/react';

class _EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: "message area (if needed)",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.props.getUser(this.props.id);
    const user = this.props.users[0];
    this.setState({
      loading: false,
      username: user.username,
      name: user.name,
      address: user.address,
      city: user.city,
      state: user.state ? user.state : "0",
      zip: user.zip,
      id: user.id,
      enableSave: true,
      message: "",
      dispName: user.name,
    });
  }

  handleChange(ev) {
    let { name, value, type } = ev.target;
    if (type === "select-one") {
      name = "state";
    }
    switch (name) {
      case "username":
        if (ev.target.value.length > 75) return;
        break;
      case "name":
        if (ev.target.value.length > 75) return;
        break;
      case "address":
        if (ev.target.value.length > 75) return;
        break;
      case "city":
        if (ev.target.value.length > 50) return;
        break;
      case "zip":
        if (ev.target.value.length > 15) return;
        break;
    }
    this.setState(
      Object.assign({}, this.state, { [name]: value }, { enableSave: false })
    );
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
    this.setState(
      Object.assign({}, this.state, {
        dispName: this.state.name,
        enableSave: true,
        message: "Changes saved!",
      })
    );
    window.setTimeout(() => this.setState({ message: "" }), 3000);
  }

  render() {
    if (this.state.loading) {
      return "Retrieving your information...";
    }
    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">
          <h2 className="profilehdr">Account</h2>
        </div>
        {/* <div className="profilehdr">
          
        </div> */}
        <div className="full-width-list" id="profileright">
          <ul>
            <li>
              <Link to="/">
                <div>
                  <h3>Current order status</h3>
                  <span>Track your order</span>
                </div>
              </Link>
              <Icon icon="la:shipping-fast" />
            </li>
            <li>
              <Link to="/orderhistory">
                <div>
                  <h3>Order history</h3>
                  <span>View your past purchases</span>
                </div>
              </Link>
              <Icon icon="ic:outline-receipt" />
            </li>
            <li>
              <Link to="/profile">
                <div>
                  <h3>Personal info</h3>
                  <span>Edit your information</span>
                </div>
              </Link>
              <Icon icon="la:id-card" />
            </li>
            <li>
              <Link to="/">
                <div>
                  <h3>Need a help?</h3>
                  <span>Contact us</span>
                </div>
              </Link>
              <Icon icon="ic:baseline-help-outline" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    getUser: (id) => dispatch(getUser(id)),
  };
};

const EditProfile = connect(mapStateToProps, mapDispatchToProps)(_EditProfile);

export default EditProfile;
