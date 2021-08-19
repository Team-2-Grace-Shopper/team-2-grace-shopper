import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import dateFormat from 'dateformat';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import emailjs, { init } from 'emailjs-com';


class _OrderConfirmation extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    // await this.props.getOrdersForPage(this.state.offset, this.state.pageCount, this.props.userId);
    // this.setState(Object.assign({},
    //   this.state,
    //   {
    //     ordersToDisplay: this.state.allOrders,
    //     showDetails: null
    //   }
    // ))
    this.sendEmail();

  }

  sendEmail = async () => {
    init("user_HuaybJLdnOoIDOZ3t63oD");
    let message = `<html><head></head>
    <body>
    <style>
    h1{
      background-color: wheat;
      border-radius: 3%;
    }
    .right{
      text-align: right;
    }
    .center{
      text-align: center;
    }
    </style>
    <h1>Grace Coffee. - Order Confirmation<h1>
    <h3>Hello John</h3>
    <h3>Thank you for shopping with us. We'll send a confirmation when your item(s) ship.</h3>
    <h2>Order Details</h2>
    <hr>
    <h3>Order #1234</h3>
    <h3>Arriving Monday, August 16</h3>
    <h4>Ship to: John Pirog</h4>
    <h4>Order total: $17.58</h4>
    <hr>
    <h3>Items</h3>
    <table>
    <tr><th>Line #</th><th>Description</th><th>Quantity</th><th>Price</th></tr>
    <tr><td class="center">1</td><td>Coffee Cup</td><td class="center">4</td><td class="right">10.99</td></tr>
    <tr><td class="center">2</td><td>Ethiopian Beans</td><td class="center">2</td><td class="right">18.99</td></tr>
    </table>
    <p>&nbsp;</p>
    <h3>We hope to see you again soon,</h3>
    <p>&nbsp;</p>
    <h3>Grace Coffee.</h3>
    </body>

      `;
    const templateParams = {
      orderNbr: '1234',
      toEmail: 'jpirog@hotmail.com',
      toName: 'John Pirog',
      title: 'Order confirmation',
      sub: 'sub heading',
      message: message,
    };
    await emailjs.send('default_service', 'template_ny5i12o', templateParams);
  }

  render() {
    const order = { shipToName: 'shiptoname', shipToAddress: 'ship addr', shipToCity: 'shipcity', shipToState: 'IL', shipToZip: '60066', orderDate: '2021-10-01', orderlines: [{ imageUrl1: 'zzzzz' }] }
    return (
      <div id="content-wrapper">
        <div id="confirmationcontainer">
          <div id="confirmtop">
            <h2>
              <Icon icon="akar-icons:shipping-box-02" width="25" height="25" />
              <Icon icon="ic:outline-local-shipping" width="25" height="25" />
              <Icon icon="grommet-icons:coffee" width="25" height="25" />
              <Icon icon="gg:coffee" width="25" height="25" />
              <br />Order placed, thanks!
            </h2>
            <p>Confirmation will be sent to your email</p><br />
            <p><Link to="/orderhistory" className="cta">Review your recent orders</Link></p>
            <br /><br />
          </div>
          <div className="col2">
            <p><h2>Shipping to</h2>Shipping to<br />
              {order.shipToName},<br />
              {order.shipToAddress},&nbsp;
              {order.shipToCity},<br />
              {order.shipToState},&nbsp;{order.shipToZip}
            </p>
            <p><h2>Delivery:</h2>
              {dateFormat(order.orderDate, "ddd, mmm d, yyyy")}<br />
              <span>Note: You can add to this delivery throughout today</span>
            </p>
          </div>
          <div className="inlineContent">
            <img src="https://coda.newjobs.com/api/imagesproxy/ms/niche/images/articles/Liz/volunteering.jpg" alt="Grace coffee's donation" />
            <div><h2>GRACE COFFEE.</h2> We make a donation to the Dave Thomas Foundation for Adoption for your purchase.<br /><br /><span className="hyperlink">Learn More</span></div>
          </div>

          {/*}        <img src={ order.orderlines[0].imageUrl1 }></img> */}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: ownProps.order,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendConfirmationEmail: (order) => dispatch(sendConfirmationEmail(order)),
  }
}
const OrderConfirmation = connect(mapStateToProps, mapDispatchToProps)(_OrderConfirmation)

export default OrderConfirmation;