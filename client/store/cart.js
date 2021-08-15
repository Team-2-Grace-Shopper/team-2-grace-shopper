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
        }
        return;
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



// below function is not a thunk and not called with dispatch (does not update state)

export const addToCart = async (userId, productId, quantity, price, product) => {

  let myCart;

  switch (userId){
    case undefined:  // guest or non-logged in user with a cart
    case 0:          //    "
      if (window.localStorage.getItem('cart')) {
        myCart = JSON.parse(window.localStorage.getItem('cart'));
      } else {
        myCart = { userId: 0, orderlines: [] }; 
      }
      const productIdx = myCart.orderlines.findIndex(c => c.productId === productId)
      if (productIdx === -1){
        myCart.orderlines.push({ productId, quantity, price, product });
      } else {
        myCart.orderlines[productIdx].quantity += quantity;
      }
      window.localStorage.setItem('cart', JSON.stringify(myCart))
      break;

    default:  // registered user - see if there is an existing cart
        const { data: cart } = await axios.get('/api/cart', { params: { userId } })
        let id;
        let lineNbr;
        if (cart.length === 0){
            // no cart so create one
            const {data: cart2 } = await axios.post('/api/cart', {userId: userId, status: 'open', type: 'cart', shipToName: 'BILLL'})
            id = cart2.id;    // use the ID of the new order(cart)
            lineNbr = 1;
        } else {
            id = cart[0].id;  // use the ID of the existing order(cart)
            lineNbr = cart[0].orderlines.length + 1;
        }
        const newLine = await axios.post('/api/cart/line', { lineNbr: lineNbr, orderId: id, productId: productId, quantity: quantity, price: price })
        break;
    }
    getCart(userId); // this is done to update state with the cart so Nav can show the cart items
}


//REDUCER

export const cartReducer = (state = [], action) => {
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