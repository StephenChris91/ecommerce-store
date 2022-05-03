import axios from 'axios';
import {
     PRODUCT_REQUEST, 
     PRODUCT_REQUEST_SUCCESS, 
     PRODUCT_REQUEST_FAILURE,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAILURE,
     CLEAR_PRODUCT_DETAILS,
     } from '../constants/actionTypes';


export const listProducts = () => async (dispatch) =>  {
    try {
        dispatch({ type: PRODUCT_REQUEST });
        const { data } = await axios.get('/api/products');

        dispatch({ 
            type: PRODUCT_REQUEST_SUCCESS, 
            payload: data 
        });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_REQUEST_FAILURE, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAILURE, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message});
    }
}

export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_DETAILS, payload: {} });
};