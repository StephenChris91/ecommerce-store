import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}