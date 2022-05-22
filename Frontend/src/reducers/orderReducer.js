import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_DETAILS_REQUEST,
  CREATE_ORDER_DETAILS_SUCCESS,
  CREATE_ORDER_DETAILS_FAILURE,
  ORDER_PAY_RESET,
  ORDER_PAY_FAILURE,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST_FAILURE,
  ORDER_LIST_MY_REQUEST_SUCCESS,
  ORDER_LIST_MY_REQUEST_REQUEST,
  ORDER_LIST_MY_RESET,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const createOrderDetails = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_REQUEST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_REQUEST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
