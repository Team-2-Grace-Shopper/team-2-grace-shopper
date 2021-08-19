import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CheckoutBilling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    
    this.setState({ loading: true });
    const { state } = this.props.location;

    this.setState({
      loading: false,
      email: state.email,
      name: state.name,
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
      shipping: state.shipping,
      billName: state.name,
      billAddress: state.address,
      billCity: state.city,
      billState: state.state,
      billZip: state.zip,
      payment: '0',
      enableContinue: false,
    });
  }

  handleChange(ev) {
    let { name, value } = ev.target;

    switch (name) {
      case "billName":
        if (ev.target.value.length > 75) return;
        break;
      case "billAddress":
        if (ev.target.value.length > 75) return;
        break;
      case "billCity":
        if (ev.target.value.length > 50) return;
        break;
      case "billZip":
        if (ev.target.value.length > 15) return;
        break;
    }
    this.setState( 
      Object.assign({}, this.state, { [name]: value }), () => {
        if (this.state.billName && this.state.billAddress && this.state.billCity && this.state.billZip && this.state.billState && this.state.payment) {
          this.setState({ enableContinue: true })
        }
        else {
          this.setState({ enableContinue: false });
        }  
      }
    );
  }

  // handleSubmit(ev) {
  //   ev.preventDefault();
    
  // }

  render() {

    if (this.state.loading) {
      return "Retrieving your information...";
    }
    console.log('RENDER ----->', this.state)
    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">
        <h2>Billing</h2>
        </div>
        <div className="container" id="profileright">
          <form onSubmit={this.handleSubmit} id="profileform">
            <h4>Bill to: </h4>
            <div className="formfield">
              <input
                type="text"
                name="billName"
                required
                maxLength="75"
                value={this.state.billName}
                onChange={this.handleChange}
              />
              <label>Name</label>
            </div>
            
            <div className="formfield">
              <input
                type="text"
                name="billAddress"
                maxLength="75"
                value={this.state.billAddress}
                onChange={this.handleChange}
              />
              <label>Address</label>
            </div>
            <div className="formfield">
              <input
                type="text"
                name="billCity"
                maxLength="50"
                value={this.state.billCity}
                onChange={this.handleChange}
              />
              <label>City</label>
            </div>

            <div className="formfield">
              <select value={this.state.billState} name= "billState" onChange={this.handleChange}>
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
                name="billZip"
                maxLength="15"
                value={this.state.billZip}
                onChange={this.handleChange}
              />
              <label>Zip</label>
            </div>

            <div className="formfield">
              <select value = {this.state.payment} name= "payment" onChange={this.handleChange}>
                <option disabled key="0" value="0">
                  {" "}
                  -- select --{" "}
                </option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
                <option value="In Kind">In Kind Goods or Services</option>
              </select>
              <label>Payment Method</label>
            </div>

            <div className="formfield">
              <Link to = {{pathname: '/cart/checkout/revieworder', state: this.state}}> 
                <button className={this.state.enableContinue ? 'cta':'ctadisabled'} disabled={!this.state.enableContinue}>
                  Review Order
                </button>
              </Link>  
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default CheckoutBilling;

  
