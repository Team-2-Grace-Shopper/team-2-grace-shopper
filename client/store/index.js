import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import { usersReducer } from './users'
import { productsReducer } from './products'
import { ordersReducer } from './orders'
import { cartReducer } from './cart'

//COMBINE REDUCERS

const reducer = combineReducers({ 
  auth,
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer,
  cart: cartReducer
 });

 //CREATE STORE

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
