import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const CartView = ({ orders }) => {

    return (
        <div>
            <div className='itemList'>
                <h2>Shopping Cart</h2>
                <div>
                    {/* { products.map( product => 
                        <div key={ product.name }>
                            <Link to={`products/${product.id}`}>
                                <img src={ product.imageUrl1 } />
                                <h3>{ product.name }</h3>
                            </Link>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ orders }) => {
    // const order = orders.find((order) => order.id) || {};
    return({
        orders
    })
}

export default connect(mapStateToProps)(CartView);