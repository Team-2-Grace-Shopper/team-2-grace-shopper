import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartInfo } from "../../store/cart";
import NumberFormat from "react-number-format";

class CheckoutInfo extends React.Component {
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
    const { user } = this.props;

    this.setState({
      loading: false,
      email: user.username,
      name: user.name,
      address: user.address,
      city: user.city,
      state: user.state ? user.state : "0",
      zip: user.zip,
      enableContinue: true,
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
      Object.assign({}, this.state, { [name]: value }, { enableContinue: false })
    );
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateCartInfo(this.state);
    this.setState(
      Object.assign({}, this.state, {
        dispName: this.state.name,
        enableContinue: true,
        message: "Changes saved!",
      })
    );
    window.setTimeout(() => this.setState({ message: "" }), 3000);
  }

  render() {
    console.log(this.props)
    if (this.state.loading) {
      return "Retrieving your information...";
    }
    const { orderlines } = this.props.cart[0];
    let productTotal = 0;

    return (
      <div id="profilecontainer">
        <div className="container" id="profileleft">

          <form onSubmit={this.handleSubmit} id="profileform">
            <h2>Contact Information</h2>
            <br />
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
            <h3>Shipping Address</h3>
            <br />
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
              <Link to = '/cart/checkout/shipping'>
                <button className={this.state.enableContinue ? 'ctadisabled' : 'cta'} disabled={this.state.enableContinue}>
                  Continue to Shipping
                </button>
              </Link>
              
            </div>
          </form>
        </div>
        <div className="container" id="profileright">
          <h2>Order Details</h2>
          <table id="orderstatusdetailtable">
            <thead>
              <tr>
                <th>Line #</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderlines.map((line, i) => {
                
                const nbrItemsFmt = <NumberFormat value={line.quantity}
                  thousandSeparator=','
                  displayType='text'
                />
                const orderPriceFmt = <NumberFormat value={line.price}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                const orderTotFmt = <NumberFormat value={line.price * line.quantity}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                productTotal += line.price * line.quantity;
                return (
                  <tr key={line.lineNbr}>
                    <td className="tblcenter">{line.lineNbr}</td>
                    <td >{line.product.name}</td>
                    <td className="tblcenter">{nbrItemsFmt}</td>
                    <td className="tblright"> {orderPriceFmt}</td>
                    <td className="tblright"> {orderTotFmt}</td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan={4} className="tblright">Product total</td>
                <td className="tblright"><NumberFormat value={productTotal}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="tblright">Tax</td>
                <td className="tblright"><NumberFormat value={productTotal * .1}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="tblright">Shipping</td>
                <td className="tblright"><NumberFormat value={1.95}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="tblright">Order total</td>
                <td className="tblright"><NumberFormat value={productTotal + (productTotal * .1) + 1.95}
                  thousandSeparator=','
                  prefix='$'
                  fixedDecimalScale={true}
                  decimalScale={2}
                  displayType='text'
                />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth, cart}) => {
  const user = auth;
  return {
    user,
    cart

  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateCartInfo: (info) => dispatch(updateCartInfo(info)),
//   };
// };

export default connect(mapStateToProps, /* mapDispatchToProps */)(CheckoutInfo);



