import axios from 'axios';


//ACTION TYPES
 
const GET_CART = 'GET_CART';
const CREATE_CART = 'CREATE_CART';
 
//ACTION CREATORS

const _getCart = (cart) => {
    return {
        type: GET_CART, 
        cart
    };
};

const _createCart = (cart) => {
    return {
        type: CREATE_CART, 
        cart
    };
};

//THUNK CREATORS


// export const createOrder = (order, history) => {
//     return async (dispatch) => {
//         const { data: created } = await axios.post('/api/orders', order);
//         dispatch(_createOrder(created));
//         history.push('/orders'); /* Wherever we want to redirect! */ 
//     };
// };





export const getCart = (userId) => {
    return async (dispatch) => {
        const { data: cart } = await axios.get('/api/cart', {params: {userId} })
        dispatch(_getCart(cart));
    }
}



//REDUCER

export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        case CREATE_CART:
            return [...state, action.cart];
        default:
            return state
    };
};