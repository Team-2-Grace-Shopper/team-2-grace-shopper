import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import dateFormat from 'dateformat';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import emailjs, { init } from 'emailjs-com';


class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.sendEmail(this.props.location.state);
  }

  sendEmail = async (order) => {
    init("user_HuaybJLdnOoIDOZ3t63oD"); // this would be secure in a production app
    const orderTot = order.orderlines.reduce((tot, c) => tot + c.quantity * c.price, 0);
    const orderTotFmt = <NumberFormat value={orderTot}
      thousandSeparator=','
      prefix='$'
      fixedDecimalScale={true}
      decimalScale={2}
      displayType='text'
      />
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
    <h4>Order total: ${orderTotFmt} (shipping and tax are separate)</h4>
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
    await emailjs.send('default_service', 'template_ny5i12o', templateParams);
  }

  render() {
    const order = this.props.location.state;
    order.shipDate = new Date().setDate(new Date().getDate() + 1);
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
              <p><h2>Shipping to</h2>Shipping to:<br />
                {order.name},<br />
                {order.address},&nbsp;
                {order.city},<br />
                {order.state},&nbsp;{order.zip}
              </p>
              <p><h2>Delivery:</h2>
                {dateFormat(order.shipDate, "ddd, mmm d, yyyy")}<br />
                <span>Note: You can add to this delivery throughout today</span>
              </p>
            </div>
            <div className="inlineContent">
              <img src="https://coda.newjobs.com/api/imagesproxy/ms/niche/images/articles/Liz/volunteering.jpg" alt="Grace Coffee's donation" />
              <div><h2>GRACE COFFEE.</h2> We make a donation to the Dave Thomas Foundation for Adoption with your purchase.<br /><br />
              <span className="hyperlink"><a target="_blank" href="https://www.davethomasfoundation.org/">Learn More</a></span></div>
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