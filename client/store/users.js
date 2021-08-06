import axios from 'axios';

// import history from '../history';
/* 
not sure if we need to import this -- didn't think we needed it but
the auth store file imports it so I'm dropping it here for now 
*/


//ACTION TYPES
 
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
 
//ACTION CREATORS

const _getUsers = (users) => {
    return {
        type: GET_USERS, 
        users
    };
};

const _createUser = (user) => {
    return {
        type: CREATE_USER, 
        user
    };
};
 

//THUNK CREATORS

export const getUsers = () => {
    return async (dispatch) => {
        const { data: users } = await axios.get('/api/users');
        dispatch(_getUsers(users));
        /*history.push('/users') Wherever we want to redirect!*/
    };
};

export const createUser = (user, history) => {
    return async (dispatch) => {
        const { data: created } = await axios.post('/api/users', user);
        dispatch(_createUser(created));
        history.push('/users'); /* Wherever we want to redirect! */ 
    };
};



//REDUCER

export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        default:
            return state
    };
};