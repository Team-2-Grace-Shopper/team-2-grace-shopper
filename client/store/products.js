import axios from 'axios';

// import history from '../history';
/* 
not sure if we need to import this -- didn't think we needed it but
the auth store file imports it so I'm dropping it here for now 
*/


//ACTION TYPES
 
const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
 
//ACTION CREATORS

const _getProducts = (products) => {
    return {
        type: GET_PRODUCTS, 
        products
    };
};

const _createProduct = (product) => {
    return {
        type: CREATE_PRODUCT, 
        product
    };
};

//THUNK CREATORS

export const getProducts = () => {
    return async (dispatch) => {
        const { data: products } = await axios.get('/api/products');
        dispatch(_getProducts(products));
    };
};

export const createProduct = (product, history) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/products', product);
        dispatch(_createProduct(created));
        history.push('/products'); /* Wherever we want to redirect! */ 
    };
};


//REDUCER

export const productsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case CREATE_PRODUCT:
            return [...state, action.product];
        default:
            return state
    };
};