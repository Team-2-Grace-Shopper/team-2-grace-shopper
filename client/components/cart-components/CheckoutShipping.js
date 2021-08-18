import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartInfo } from "../../store/cart";


class CheckoutShipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {

    this.setState({ loading: true });
    const { user } = this.props;

    this.setState({
      loading: false,
      email: user.username,
      name: user.name,
      address: user.address,
      city: user.city,
      state: user.state ? user.state : "0",
      zip: user.zip,
      shipping: "0",
      enableContinue: false,
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.user !== this.props.user) {
      this.setState({
        loading: false,
        email: user.username,
        name: user.name,
        address: user.address,
        city: user.city,
        state: user.state ? user.state : "0",
        zip: user.zip,
        shipping: "0",
        enableContinue: false,
      });
    }
  }

  handleChange(ev) {
    let { name, value } = ev.target;

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
    };
    this.setState( 
      Object.assign({}, this.state, { [name]: value }), () => {
        if (this.state.email && this.state.name && this.state.address && this.state.city && this.state.zip && this.state.state && this.state.shipping) {
          this.setState({ enableContinue: true })
        }
        else {
          this.setState({ enableContinue: false });
        };  
    });
  };

  render() {

    if (this.state.loading) {
      return "Retrieving your information...";
    };

    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">
        <h2>Shipping</h2>
        </div>
        <div className="container" id="profileright">
          <form onSubmit={this.handleSubmit} id="profileform">
            <h4>Ship To: </h4>
            <div className="formfield">
              <input
                type="text"
                name="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label>Email</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="name"
                required
                maxLength="75"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <label>Name</label>
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

            <div className="formfield">
              <select value={this.state.state} name= "state" onChange={this.handleChange}>
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
              <select value = {this.state.shipping} name= "shipping" onChange={this.handleChange}>
                <option disabled key="0" value="0">
                  {" "}
                  -- select --{" "}
                </option>
                <option value="USPS">USPS</option>
                <option value="USPS Priority Mail">USPS Priority Mail</option>
                <option value="UPS Ground">UPS Ground</option>
                <option value="UPS 2-Day Air">UPS 2-Day Air</option>
                <option value="FedEx Ground">FedEx Ground</option>
              </select>
              <label>Shipping Method</label>
            </div>

            <div className="formfield">
              <Link to = {{pathname: '/cart/checkout/billing', state: this.state}}> 
                <button className={this.state.enableContinue ? 'cta':'ctadisabled'} disabled={!this.state.enableContinue}>
                  Continue to Billing
                </button>
              </Link>  
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const user = auth;
  return {
    user

  };
};

export default connect(mapStateToProps)(CheckoutShipping);



