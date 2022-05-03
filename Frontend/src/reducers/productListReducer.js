import {
    PRODUCT_REQUEST, 
    PRODUCT_REQUEST_SUCCESS, 
    PRODUCT_REQUEST_FAILURE } from '../constants/actionTypes';

export const productListReducer = (state = {products:  []}, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_REQUEST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_REQUEST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}