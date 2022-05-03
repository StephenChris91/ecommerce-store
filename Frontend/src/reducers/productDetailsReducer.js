import {
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAILURE,
    CLEAR_PRODUCT_DETAILS,
} from '../constants/actionTypes';

export const productDetailsReducer = (state ={product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, product: {reviews: []} };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAILURE:
            return { loading: false, error: action.payload };
        case CLEAR_PRODUCT_DETAILS:
            return { product: {reviews: []} };
        default:
            return state;
    }
}