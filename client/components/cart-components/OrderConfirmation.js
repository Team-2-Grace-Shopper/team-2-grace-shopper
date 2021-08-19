import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import dateFormat from 'dateformat';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import emailjs, { init  } from 'emailjs-com';


class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.sendEmail(this.props.location.state);
  }

  sendEmail = async (order) => {
    init("user_HuaybJLdnOoIDOZ3t63oD"); // this would be secure in a production app
    const orderTot = order.orderlines.reduce((tot, c) => c.quantity * c.price, 0);
    const orderLines = order.orderlines.map( (c,i) => `
      <tr><td class="center">${i+1}</td><td>${c.product.name}</td><td class="center">${c.quantity}</td><td class="right">${c.price}</td></tr>
      `
      )
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
    <h3>Hello ${order.name}</h3>
    <h3>Thank you for shopping with us. We'll send a confirmation when your item(s) ship.</h3>
    <h2>Order Details</h2>
    <hr>
    <h3>Order #${Math.floor(5000 + Math.random()*10000)}</h3>
    <h3>Arriving ${dateFormat(order.shipDate, "ddd, mmm d, yyyy")}</h3>
    <h4>Ship to: ${order.name}</h4>
    <h4>Order total: $${orderTot} (shipping and tax are separate)</h4>
    <hr>
    <h3>Items</h3>
    <table>
    <tr><th>Line #</th><th>Description</th><th>Quantity</th><th>Price</th></tr>
    ${orderLines}
    </table>
    <p>&nbsp;</p>
    <h3>We hope to see you again soon,</h3>
    <p>&nbsp;</p>
    <h3>Grace Coffee.</h3>
    </body>

      `;
    const templateParams = {orderNbr: '1234', 
                            toEmail: 'jpirog@hotmail.com', // use mine in case the faker address is real
                            toName: '${order.name}', 
                            title:'Order confirmation',
                            sub:'sub heading',
                            message: message,
    };
    await emailjs.send('default_service','template_ny5i12o' , templateParams);
  }

  render() {
    const order = this.props.location.state;
    order.shipDate = new Date().setDate(new Date().getDate() + 1);

    return (
      <div id="content-wrapper">
      <div id="confirmationcontainer">
      <div id="confirmationinnercontainer">
      <div id="confirmtop">
        <img id="confirmcheck" src="/images/green-check-mark-in-circle.png" />
        <h3 className="green">
          Order placed, thanks!
        </h3>
        <img id="confirmimg" src={"/images/sample_image.webp"} />
        </div>
        <h5>An order confirmation will be sent to your email</h5>
        <p><strong>Shipping to { order.name },</strong>&nbsp;
                                { order.address},&nbsp; 
                                { order.city },&nbsp;
                                { order.state },&nbsp;
                                { order.zip }
        </p>
        <hr />
        <p className="green"><strong>Delivery:</strong> { dateFormat(order.shipDate, "ddd, mmm d, yyyy") }</p> 
        <p>&nbsp;</p>
        <p>Note: You can add to this delivery throughout today</p>
        <p>&nbsp;</p>
        <p>Grace Coffee. will make a donation to the Dave Thomas Foundation for Adoption for your purchase. <span className="hyperlink"><a href="https://www.davethomasfoundation.org/">Learn more</a></span></p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p><Link to="/orderhistory"><span className="hyperlink">Review your recent orders</span></Link></p>
        </div>
        </div>
        </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     //order: ownProps.order,
// //    state: location.state,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendConfirmationEmail: (order) => dispatch(sendConfirmationEmail(order)),
//   }
// }
//const OrderConfirmation = connect(mapStateToProps, mapDispatchToProps)(_OrderConfirmation)

export default OrderConfirmation;