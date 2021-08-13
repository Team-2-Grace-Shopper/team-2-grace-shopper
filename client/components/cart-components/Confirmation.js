import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Confirmation = ({ orders }) => {

    return (
        <div>
            <div className='itemList'>
                <h2>Order Confirmation</h2>
                <p>Congratulations! You've successfully placed your order.</p>
            </div>
        </div>
    )
}

const mapStateToProps = ({ orders }) => {

    return({
        orders
    })
}

export default connect(mapStateToProps)(Confirmation);
