import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../../store/cart'
import {Link} from 'react-router-dom';

class CartView extends React.Component {
    constructor() {
        super();
    }

   async componentDidMount() {
        const { userId } = this.props;
        await this.props.getCart(userId);
       
        // else {
        //     local storage something?
        // }
    }

    render () {
        if (!this.props.newCart) {
            return <h1>Loading your cart...</h1>
        }
        const { userId } = this.props;
        const { newCart } = this.props;
        console.log('This is props', this.props)
        
        return (
            <div>
                <div className='itemList'>
                    <h2>Shopping Cart</h2>
                    <div>
                           { 
                           newCart.orderlines.map( orderline => 
                               <div key={orderline.id}>
                                   <p>{orderline.lineNbr}</p>
                                   {/* <Link to={`products/${orderline.productId}`}>
                                       <p>{ product.name }</p>
                                   </Link> */}
                                   <p>Quantity: {orderline.quantity}</p>
                                   <p>Price: {orderline.price}</p>
                                   <p>Line Total: {orderline.price * orderline.quantity}</p>
                               </div>
                           )}
                    </div>
                </div>
            </div>
        )
    }
       
   
}

const mapStateToProps = ({ auth, cart }) => {
   const userId = auth.id;
   const newCart = cart[0];
    return({
        userId,
        newCart
    })
}

const mapDispatchToProps = (dispatch) => ({
    getCart: (userId) => dispatch(getCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView);