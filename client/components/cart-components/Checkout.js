import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Checkout = ({  }) => {

    return (
        <div>
            <div className='itemList'>
                <h2>Checkout</h2>
            </div>
        </div>
    )
}

const mapStateToProps = ({ orders }) => {
    
    return({
        orders
    })
}

export default connect(mapStateToProps)(Checkout);

