import { CART_ADD_ITEM, 
    REMOVE_CART_ITEM,
    RESET_CART_ITEM,
    SAVE_SHIPPING_ADDRESS, 
    SAVE_SHIPPING_PAYMENT_METHOD } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === item.product ? item : x)
                }
            } else {
               return { ...state,
                cartItems: [...state.cartItems, item]
               }
            }

        case REMOVE_CART_ITEM:
            return { 
                ...state, 
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case RESET_CART_ITEM: 
        return {
            ...state,
            cartItems: []
        }

        case SAVE_SHIPPING_ADDRESS:
            return { 
                ...state, 
                shippingAddress: action.payload 
            }
        case SAVE_SHIPPING_PAYMENT_METHOD:
            return { 
                ...state, 
                paymentMethod: action.payload 
            }
        default:
        return state;
    }
}