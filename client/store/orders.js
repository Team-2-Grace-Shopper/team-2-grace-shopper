import axios from 'axios';

// import history from '../history';
/* 
not sure if we need to import this -- didn't think we needed it but
the auth store file imports it so I'm dropping it here for now 
*/


//ACTION TYPES
 
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
 
//ACTION CREATORS

const _getOrders = (orders) => {
    return {
        type: GET_ORDERS, 
        orders
    };
};

const _createOrder = (order) => {
    return {
        type: CREATE_ORDER, 
        order
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

export const createOrder = (order, history) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/orders', order);
        dispatch(_createOrder(created));
        history.push('/orders'); /* Wherever we want to redirect! */ 
    };
};



//REDUCER

export const ordersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;
        case CREATE_ORDER:
            return [...state, action.order];
        default:
            return state
    };
};