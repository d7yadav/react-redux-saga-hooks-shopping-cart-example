//Types should be in const to avoid typos and duplication since it's a string and could be easily miss spelled
export const DATA_REQUESTED = 'DATA_REQUESTED';
export const DATA_LOADED = 'DATA_LOADED';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const API_ERRORED = 'API_ERRORED';

//load products action
export const getData = () => {
    return { type: DATA_REQUESTED };
};

//load product success action
export const dataLoaded = (payload) => {
    console.log(payload);
    return {
        type: DATA_LOADED,
        payload
    };
};

//load product errored action
export const dataErrored = (payload) => {
    return {
        type: API_ERRORED,
        payload
    };
};

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    };
};
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    };
};
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    };
};
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    };
};
