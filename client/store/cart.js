import axios from 'axios';
import store from './index';

//ACTION TYPES
 
const GET_CART = 'GET_CART';
const CREATE_CART = 'CREATE_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
 
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

const _deleteCartItem = (cartItem) => {
    return {
      type: DELETE_CART_ITEM,
      cartItem
    };
};

//THUNK CREATORS

// needs refactoring for localStorage version
// export const createCart = (order) => {
//     return async (dispatch) => {
//         const { data: created } = await axios.post('/api/orders', order);
//         dispatch(_createCart(created));
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

export const deleteCartItem = (cartItem) => {
  return async (dispatch) => {
      await axios.delete(`/api/cart/cartItems/${cartItem.id}`);
      dispatch(_deleteCartItem(cartItem));
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


//REDUCER

export const cartReducer = (state = [], action) => {
  console.log(state)
  switch (action.type) {
      case GET_CART:
          return action.cart;
      case CREATE_CART:
          return [...state, action.cart];
      case DELETE_CART_ITEM:
          return state[0].orderlines.filter((orderline) => orderline.id !== action.cartItem.id);
      default:
          return state
  };
};