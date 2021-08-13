import axios from 'axios';
import store from './index';

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
    if (!userId){
        if (window.localStorage.getItem('cart')) {
            store.dispatch(_getCart([JSON.parse(window.localStorage.getItem('cart'))])) ;
        } else {
            store.dispatch(_getCart([{ userId: 0, orderlines: [] }])); 
            return;
        }
    }
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

export const addToCart = (userId, productId, quantity, price) => {

  let myCart;
  switch (userId){
    case undefined:  // guest user
    case 0:          // guest user
      if (window.localStorage.getItem('cart')) {
        myCart = JSON.parse(window.localStorage.getItem('cart'));
      } else {
        myCart = { userId: 0, orderlines: [] }; 
      }
      const productIdx = myCart.orderlines.findIndex(c => c.productId === productId)
      if (productIdx === -1){
        myCart.orderlines.push({ productId, quantity, price});
      } else {
        myCart.orderlines[productIdx].quantity += quantity;
      }
      window.localStorage.setItem('cart', JSON.stringify(myCart))

    default:  // registered user
      // let cart = *** read cart from DB
      // if no cart, insert one into DB and "let cart = <the data>
        // myCart = {userId: userId, orderlines: []}; 
        // myCart.orderlines.push({ productId, quantity, price});
        // write to DB (orders and orderlines)
    }

}
