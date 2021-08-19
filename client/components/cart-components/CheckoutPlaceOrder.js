import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { getCart } from '../../store/cart';
import { Link } from "react-router-dom";


class CheckoutPlaceOrder extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.props.getCart(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.getCart(this.props.userId);
    }
  }

  render() {
    if (this.state.loading) {
      return "Retrieving your information...";
    }
    const { orderlines } = this.props.cart[0];
    const { state } = this.props;
    let productTotal = 0;
    let number = 1;
    return (
      <div id="content-wrapper">
        <div className="container">
          <h2>Order Details</h2>
          <br />
          <table id="orderstatusdetailtable">
            <thead>
              <tr>
                <th>Number</th>
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
                    <td className="tblcenter">{number++}</td>
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
          <br /><br />
          <div id="orderaddresses" className="container">
            <ol><strong>Bill To:</strong>
              <li>{state.billName}</li>
              <li>{state.billAddress}</li>
              <li>{state.billCity + ', ' + state.billState + ' ' + state.billZip}</li>
              <li>{state.email}</li>
            </ol>
            <ol><strong>Ship To:</strong>
              <li>{state.name}</li>
              <li>{state.address}</li>
              <li>{state.city + ', ' + state.state + ' ' + state.zip}</li>
            </ol>
            <ol><strong>Shipping Method:</strong>
              <li>{state.shipping}</li>
            </ol>
            <ol><strong>Payment Method:</strong>
              <li>{state.payment}</li>
            </ol>
          </div>
          <Link to='/orderconfirmation' className="placeorder">
            <button className='cta'>
              Place Order
                </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, cart }, { location }) => {
  const userId = auth.id;
  const state = location.state;
  return {
    userId,
    cart,
    state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCart(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPlaceOrder);