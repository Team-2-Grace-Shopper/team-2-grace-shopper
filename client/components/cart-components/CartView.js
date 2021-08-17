import React from 'react';
import { connect } from 'react-redux';
import { getCart, deleteCartItem } from '../../store/cart'
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Icon } from '@iconify/react';

class CartView extends React.Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        await this.props.getCart(this.props.userId);
    }

    render() {
        if (!this.props.userCart) {
            return <h3>You have no items in your cart.</h3>
        }


        const { orderlines } = this.props.userCart;

        const total = orderlines.reduce((acc, orderline) => {
            acc.value += (orderline.price * orderline.quantity);
            acc.number += orderline.quantity;
            return acc;
        }, { value: 0, number: 0 });
        const subTotal = <NumberFormat value={total.value}
            thousandSeparator=','
            prefix='$'
            fixedDecimalScale={true}
            decimalScale={2}
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
            <div id="content-wrapper">
                <div id="profilecontainer" className="cartview">
                    <div className="container" id="profileleft">
                        <h2 className="profilehdr">Cart</h2>
                    </div>

                    <div className="container" id="profileright">
                        <div className="itemList-admin">
                            <div>
                                {orderlines.map(orderline =>
                                    <div className='cartItem' key={orderline.id}>
                                        <div>
                                            {orderline.product.type === 'coffee' ?
                                                (<Link to={`/coffees/${orderline.product.id}`}>
                                                    <img src={orderline.product.imageUrl1} />
                                                    {/* <h3>{orderline.product.name}</h3> */}
                                                </Link>
                                                ) : (
                                                    <Link to={`/accessories/${orderline.product.id}`}>
                                                        <img src={orderline.product.imageUrl1} />
                                                        {/* <h3>{orderline.product.name}</h3> */}
                                                    </Link>
                                                )
                                            }
                                        </div>

                                        <div>
                                            <h3>{orderline.product.name}</h3>
                                            <p>Quantity: {orderline.quantity}</p>
                                        </div>

                                        <p>Price:
                                    <NumberFormat value={orderline.price}
                                                thousandSeparator=','
                                                prefix=' $'
                                                fixedDecimalScale={true}
                                                decimalScale={2}
                                                displayType='text'
                                            />
                                        </p>
                                        <button className='delete' onClick={() => this.props.deleteCartItem(orderline)}>
                                            <Icon icon="fe:trash" width="10" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <br />
                            <div className="cart-checkout">
                                <h2><span>Subtotal {quanTotal} :</span> {subTotal}</h2>
                                <button className={orderlines.length > 0 ? 'cta' : 'ctadisabled'}
                                // onClick={() => checkout()}
                                >CHECKOUT</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, cart }) => {
    const userId = auth.id;
    const userCart = cart[0];
    return ({
        userId,
        userCart
    })
}

const mapDispatchToProps = (dispatch) => ({
    getCart: (userId) => dispatch(getCart(userId)),
    deleteCartItem: (cartItem) => dispatch(deleteCartItem(cartItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView);