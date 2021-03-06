import axios from 'axios';
import store from './index';

//ACTION TYPES
 
const GET_CART = 'GET_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART_INFO = 'UPDATE_CART_INFO';
 
//ACTION CREATORS

const _getCart = (cart) => {
    console.log('IN _getCart', cart)
    return {
        type: GET_CART, 
        cart
    };
};

const _deleteCartItem = (cartItem) => {
    return {
      type: DELETE_CART_ITEM,
      cartItem
    };
};

const _updateCartInfo = (info) => {
    return {
      type: UPDATE_CART_INFO,
      info
    };
};

//THUNK CREATORS

export const getCart = (userId) => {
    console.log('id', userId)
    if (!userId){
        if (window.localStorage.getItem('cart')) {
            store.dispatch(_getCart([JSON.parse(window.localStorage.getItem('cart'))])) ;
        } else {
            store.dispatch(_getCart([])); 
        }
        return;
    }
    return async (dispatch) => {
        const { data: cart } = await axios.get('/api/cart', {params: {userId} })
        console.log('THIS IS IN GET CART LOGGED IN', cart)
        dispatch(_getCart(cart));
    }
}

export const updateCartInfo = (info) => {
    return async(dispatch) => {
        const { data: updated } = await axios.put('api/cart', info);
        dispatch(_updateCartInfo(updated));
    };
};

export const deleteCartItem = (cartItem, userId) => {
    if (!userId || userId === 0) {
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        const newLines = cart.orderlines.filter((orderline) => orderline.productId !== cartItem.productId);
        cart.orderlines = newLines;
        
        window.localStorage.setItem('cart', JSON.stringify(cart));
        return (dispatch) => {
            dispatch(_deleteCartItem(cartItem));
        }        
     }
    return async (dispatch) => {
        await axios.delete(`/api/cart/cartItems/${cartItem.id}`);
        dispatch(_deleteCartItem(cartItem));
    };
};

export const addToCart = async (userId, productId, quantity, price, product) => {

  let myCart;

  switch (userId){
    case undefined:  // guest or non-logged in user with a cart
    case 0:          //    "
      if (window.localStorage.getItem('cart')) {
        myCart = JSON.parse(window.localStorage.getItem('cart'));
      } else {
        myCart = [{ userId: 0, orderlines: [] }]; 
      }
      const productIdx = myCart[0].orderlines.findIndex(c => c.productId === productId)
      if (productIdx === -1){
        myCart[0].orderlines.push({ productId, quantity, price, product });
      } else {
        myCart[0].orderlines[productIdx].quantity += quantity;
      }
      window.localStorage.setItem('cart', JSON.stringify(myCart))
      break;

    default:  // registered user - see if there is an existing cart
        let { data: cart } = await axios.get('/api/cart', { params: { userId } })
        let id;
        let lineNbr;
        if (cart.length === 0){
            // no cart so create one
            const {data: cart2 } = await axios.post('/api/cart', {userId: userId, status: 'open', type: 'cart', shipToName: 'BILLL'})
            console.log('this is cart2 --------->', cart2)
            id = cart2.id;    // use the ID of the new order(cart)
            lineNbr = 1;
            cart = new Array();
            cart.push(cart2);
            cart[0].orderlines = [];
        } else {
            id = cart[0].id;  // use the ID of the existing order(cart)
            lineNbr = cart[0].orderlines.length + 1;
        }
        const newLine = await axios.post('/api/cart/line', { lineNbr: lineNbr, orderId: id, productId: productId, quantity: quantity, price: price });
        cart[0].orderlines.push(newLine.data)
        myCart = cart;
        break;
    }
    store.dispatch(_getCart(myCart));    
}

//REDUCER

export const cartReducer = (state = [], action) => {
    
    switch (action.type) {
        case GET_CART:
            return action.cart;
        case DELETE_CART_ITEM:
            const newState = [...state];
            const newLines = newState[0].orderlines.filter((orderline) => orderline.productId !== action.cartItem.productId);
            newState[0].orderlines = newLines;
            return newState;
        case UPDATE_CART_INFO:
            return state.map(cart => cart) 
        default:
            return state
  };
};

//{ userId: 0, orderlines: [], type: 'cart' }