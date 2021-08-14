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

export const addToCart = async (userId, productId, quantity, price) => {

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
        myCart.orderlines.push({ productId, quantity, price});
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

}
