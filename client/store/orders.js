import axios from 'axios';

// import history from '../history';
/* 
not sure if we need to import this -- didn't think we needed it but
the auth store file imports it so I'm dropping it here for now 
*/


//ACTION TYPES
 
const GET_ORDERS = 'GET_ORDERS';

 
//ACTION CREATORS

const _getOrders = (orders) => {
    return {
        type: GET_ORDERS, 
        orders
    };
};


//THUNK CREATORS

export const getOrders = () => {
    return async (dispatch) => {
        const { data: orders } = await axios.get('/api/orders');
        dispatch(_getOrders(orders));
        /*history.push('/orders') Wherever we want to redirect!*/
    };
};

export const getOrdersForPage = (parms) => {
    console.log('in thunk - PARMS:', parms)
    return async (dispatch) => {
        const { data: orders } = await axios.get('/api/orders/page', {params: parms})
        console.log('ORDERS', orders)
        dispatch(_getOrders(orders));
    }
}


//REDUCER

export const ordersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;
        default:
            return state
    };
};