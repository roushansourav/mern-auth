import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

//Register User

export const registerUser = (userData, history) => dispatch => {
    console.log(userData);
    axios
    .post('http://localhost:5000/api/users/register', userData)
    .then(res => history.push('/login'))//redirect to login on successful register
    .catch(
        err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    );
};

//Login User -get user Token

export const loginUser = userData => dispatch =>{
    axios.post('http://localhost:5000/api/users/login', userData)
    .then(res=> {
        //Save to local storage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        //set token to Auth header
        setAuthToken(token);
        //Decode token to get userData
        const decoded = jwt_decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));

    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    );
};

//Set logged in user
export const setCurrentUser = decoded =>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    };
};
//user loading
export const setUserLoading = () =>{
    return {
        type: USER_LOADING
    };
};

//User logout

export const logoutUser = () => dispatch =>{
    //Remove token from local storage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};