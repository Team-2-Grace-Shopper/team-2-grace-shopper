import React from 'react';
import { connect } from 'react-redux';
import { getCart, deleteCartItem } from '../../store/cart'
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';

class CartView extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() { 
        const { userId } = this.props;
        if (userId) {
            this.props.getCart(userId);
        }
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.userId !== this.props.userId) {
            this.props.getCart(this.props.userId);
        }
    }

    render () {
        if (!this.props.cart[0]) {
            return <h3>You have no items in your cart.</h3>
        }
        
        
        const { orderlines } = this.props.cart[0];

        const total = orderlines.reduce((acc, orderline) => {
            acc.value += (orderline.price * orderline.quantity);
            acc.number += orderline.quantity;
            return acc;
        }, {value: 0, number: 0});
        const subTotal = <NumberFormat value={total.value} 
                            thousandSeparator=',' 
                            prefix='$' 
                            fixedDecimalScale={ true }
                            decimalScale={ 2 }
                            displayType='text'
                            />
        const quanTotal = <NumberFormat value={total.number} 
                            thousandSeparator=',' 
                            prefix='('
                            suffix=' items)'
                            displayType='text'
                            />

        // console.log('This is props', this.props)
        // console.log('This is local Storage', window.localStorage)

        return (
            <div>
                <div className='itemList'>
                    <h2>Shopping Cart</h2>
                    <div id= 'cartItems'>
                        { 
                        orderlines.map( orderline => 
                            <div className= 'cartItem' key={orderline.id}>
                                <div>                                   
                                    {
                                    //would like to dry this out
                                    orderline.product.type === 'coffee' ?  
                                        (<Link to= {`/coffees/${orderline.product.id}`}> 
                                            <img src= {orderline.product.imageUrl1} />
                                            <h3>{orderline.product.name}</h3>
                                        </Link>
                                        ):( 
                                        <Link to= {`/accessories/${orderline.product.id}`}>
                                            <img src= {orderline.product.imageUrl1} />
                                            <h3>{orderline.product.name}</h3>
                                        </Link>
                                        )
                                    }
                                </div>
                                <p>Quantity: {orderline.quantity}</p>
                                <p>Price: 
                                    <NumberFormat value= {orderline.price}
                                        thousandSeparator=',' 
                                        prefix=' $' 
                                        fixedDecimalScale={ true }
                                        decimalScale={ 2 }
                                        displayType='text'/>
                                </p>
                                <p>Delete Item: </p>
                                <button className= 'delete' onClick= {()=>this.props.deleteCartItem(orderline)}>
                                    X
                                </button>
                            </div>
                        )}
                    </div>

                    <h3>Subtotal {quanTotal} : {subTotal}</h3>

                    <div>
                        <button 
                            className={orderlines.length > 0 ? 'cta' : 'ctadisabled'}
                        >
                            <Link to = '/cart/checkout/information'>CHECKOUT</Link>
                        </button>
                    </div>  
                </div>
                    
            </div>
            
        )
    }
}

const mapStateToProps = ({ auth, cart }) => {
    const userId = auth.id;
    return({
        auth,
        userId,
        cart
    })
}

const mapDispatchToProps = (dispatch) => ({
    getCart: (userId) => dispatch(getCart(userId)),
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView);