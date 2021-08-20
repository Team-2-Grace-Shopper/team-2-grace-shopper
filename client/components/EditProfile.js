import React from "react";
import { connect } from "react-redux";
import { getUser, updateUser } from "../store/users";

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
      return <h2 id="content-wrapper">"Retrieving your information..."</h2>;
    }
    return (
      <div id="content-wrapper">
      <div id="fb-root"></div>
        <div id="profilecontainer">
          <div className="container" id="profileleft">
            <h2 className="profilehdr">Update Your Profile</h2>
          </div>
          {/* <div className="profilehdr">
          
        </div> */}
          <div className="container" id="profileright">

            <form onSubmit={this.handleSubmit} id="profileform">

              <span className="timedAlert">
                {this.state.message && <h3> {this.state.message} </h3>}
              </span>
              <h2>{this.state.dispName}</h2>
              <br />
              <div className="formfield">
                <input
                  type="text"
                  name="username"
                  disabled
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label>Email</label>
              </div>
              <div className="formfield">
                <input
                  type="text"
                  name="name"
                  autoFocus
                  required
                  maxLength="75"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label>Name (*)</label>
              </div>
              <div className="formfield">
                <input
                  type="text"
                  name="address"
                  maxLength="75"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
                <label>Address</label>
              </div>
              <div className="formfield">
                <input
                  type="text"
                  name="city"
                  maxLength="50"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <label>City</label>
              </div>
              {/*}            <div className="formfield">
              <label>State</label>
              <input type="text" 
                    name="state" 
                    value={ this.state.state }
                    onChange={this.handleChange} />
            </div>
    */}
              <div className="formfield">
                <select value={this.state.state} onChange={this.handleChange}>
                  <option disabled key="0" value="0">
                    {" "}
                  -- select a state --{" "}
                  </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <label>State</label>
              </div>

              <div className="formfield">
                <input
                  type="text"
                  name="zip"
                  maxLength="15"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
                <label>Zip</label>
              </div>

              <div className="formfield">
                <span>(*) - required field</span>
                <button className={this.state.enableSave ? 'ctadisabled' : 'cta'} disabled={this.state.enableSave}>
                  Save
              </button>
              </div>
            </form>
            </div>
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
