import React from 'react';
import { connect } from 'react-redux';
import { getCart, deleteCartItem } from '../../store/cart'
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';

class CartView extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        await this.props.getCart(this.props.userId);
    }

    render () {
        if (!this.props.userCart) {
            return <h3>You have no items in your cart.</h3>
        }
        
        
        const { orderlines } = this.props.userCart;

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

        console.log('This is props', this.props)
        // console.log('This is local Storage', window.localStorage)

        return (
            <div>
                <div className='itemList'>
                    <h2>Shopping Cart</h2>
                    <div id= 'cartItems'>
                        { 
                        orderlines.map( orderline => 
                            <div className= 'cartItem' key={orderline.id}>
                                {/* <h3>{orderline.lineNbr}</h3> */}
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
                                            <h3>{orderline.product.name}</h3>                                            </Link>
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
                                        displayType='text'
                                    />
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
                            // onClick={() => checkout()}
                        >
                            CHECKOUT
                        </button>
                    </div>  
                </div>
                    
            </div>
            
        )
    }
}

const mapStateToProps = ({ auth, cart }) => {
   const userId = auth.id;
   const userCart = cart[0];
    return({
        userId,
        userCart
    })
}

const mapDispatchToProps = (dispatch) => ({
    getCart: (userId) => dispatch(getCart(userId)),
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView);