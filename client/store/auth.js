import axios from "axios";
import history from "../history";
import { addToCart } from './cart';

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { username, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());

    // User is now authenticated - if method = login -> check local storage for a cart and move to DB

    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if (cart){
      const { data: user } = await axios.get('/auth/me', {   // get the full user data so we have the id column
        headers: {
          authorization: res.data.token,
        },    })
 
      moveCartToDatabase(cart, user);
      window.localStorage.removeItem('cart');
    };

    history.push("/home");
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

 const moveCartToDatabase = async (cart, user) => {

  for (let i = 0; i < cart.orderlines.length; i++){
     await addToCart(user.id, cart.orderlines[i].productId, cart.orderlines[i].quantity, cart.orderlines[i].price);
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/home");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
