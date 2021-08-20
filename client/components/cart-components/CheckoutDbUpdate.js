import React from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { getCart } from '../../store/cart';


const CheckoutDbUpdate = (props) => {
    console.log(props);
    const { state } = props.location;
    const { cart } = props.location.state; 
    
const createOrder = async (cart, state) => {
    const { data: newOrder } = await axios.post('/api/orders', {
      id: cart.id ? cart.id : null,
      status: 'open',
      type: 'order',
      billToName: state.billName,
      billToAddress: state.billAddress,
      billToCity: state.billCity,
      billToState: state.billState,
      billToZip: state.billZip,
      shipToName: state.name, 
      shipToAddress: state.address,
      shipToCity: state.city,
      shipToState: state.state,
      shipToZip: state.zip,
      email: state.email,
      trackingNumber: 'EV938507560CN',
      shipMethod: state.shipping,
      paymentMethod: state.payment,
      userId: cart.userId,
    });

    const orderId = newOrder.id;

    if (cart.userId === 0) {
        for (let i = 0; i < cart.orderlines.length; i++) {
            let orderline = cart.orderlines[i];
            await axios.post('/api/orders/line', {
                lineNbr: i+1,
                quantity: orderline.quantity,
                price: orderline.price,
                orderId: orderId,
                productId: orderline.productId
            });    
        }
       
    }

}

createOrder(cart, state);

const updateInventory = async(cart) => {
    for (let i = 0; i < cart.orderlines.length; i++) {
        let orderline = cart.orderlines[i];
        await axios.put(`/api/products/${orderline.productId}`, {
            inventory: orderline.product.inventory - orderline.quantity
        }) 
    }
}

const oldCart = {...cart};

window.localStorage.removeItem('cart');

updateInventory(cart);
props.getCart(cart.userId);

    
    

    return (
        <Redirect to = {{pathname: '/orderconfirmation', state: Object.assign({}, state, {orderlines: oldCart.orderlines} )}}/>
    );

}


// const mapStateToProps = ({ auth, cart }, { location }) => {
//     const userId = auth.id;
//     const state = location.state;
//     return {
//       userId,
//       cart,
//       state
//     };
//   };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getCart: (userId) => dispatch(getCart(userId))
    };
  };
  
  export default connect(null, mapDispatchToProps)(CheckoutDbUpdate);