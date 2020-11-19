import { DATA_LOADED, DATA_REQUESTED, ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY } from './actions';

const initialState = {
    items: [],
    addedItems: [],
    total: 0,
    isProductLoading: false
};
//to increase item qt by 1
const addProduct = (state, id) => {
    let data = state.items.map(item => {
        if (item.id === id)
            return { ...item, orderedQuantity: item.orderedQuantity + 1 };
        return item;
    });
    return data;
};

//to decrease item qt by 1
const subProduct = (state, id) => {
    let data = state.items.map(item => {
        if (item.id === id)
            return { ...item, orderedQuantity: item.orderedQuantity - 1 };
        return item;
    });
    return data;
};

//to set item qt to 0
const removeProduct = (state, id) => {
    let data = state.items.map(item => {
        if (item.id === id)
            return { ...item, orderedQuantity: 0 };
        return item;
    });
    return data;
};

const rootReducer = (state = initialState, { type, id, payload }) => {
    switch (type) {
        //to request data and set loading state to true
        case DATA_REQUESTED:
            return {
                ...state,
                isProductLoading: true
            };
        case DATA_LOADED:
            return {
                ...state,
                items: payload,
                isProductLoading: false
            };

        //INSIDE HOME COMPONENT
        case ADD_TO_CART:
            //check if the action id exists in the addedItems
            let existItemIndex = state.addedItems.findIndex(item => id === item.id);
            if (existItemIndex > -1) {
                const afterUpdate = addProduct(state, id);
                let addedItems = [ ...state.addedItems ];
                addedItems[ existItemIndex ].orderedQuantity = addedItems[ existItemIndex ].orderedQuantity + 1;
                return {
                    ...state,
                    addedItems: addedItems,
                    items: afterUpdate,
                    //calculating the total
                    total: state.total + Number(addedItems[ existItemIndex ].price)
                };
            }
            else {
                let afterAdd = addProduct(state, id);
                let addedItem = afterAdd.find(item => item.id === id);
                //calculating the total
                let newTotal = state.total + Number(addedItem.price);
                return {
                    ...state,
                    items: afterAdd,
                    addedItems: [ ...state.addedItems, addedItem ],
                    total: newTotal
                };
            }
        //Remove Button
        case REMOVE_ITEM:
            //get item to remove from action id
            let removeIndex = state.addedItems.findIndex(item => id === item.id);
            let updateAddedItems = state.addedItems.filter(item => id !== item.id);
            //reset the order count
            let afterRemove = removeProduct(state, id);
            //calculating the total
            let newTotal = state.total - (state.addedItems[ removeIndex ].price * state.addedItems[ removeIndex ].orderedQuantity);
            console.log(removeIndex);
            return {
                ...state,
                items: afterRemove,
                addedItems: updateAddedItems,
                total: newTotal
            };
        //INSIDE CART COMPONENT
        case ADD_QUANTITY:
            //get item to add from action id
            let itemIndex = state.addedItems.findIndex(item => id === item.id);
            let afterQuantityUpdate = addProduct(state, id);
            let addedItems = [ ...state.addedItems ];
            addedItems[ itemIndex ].orderedQuantity = addedItems[ itemIndex ].orderedQuantity + 1;
            return {
                ...state,
                addedItems: addedItems,
                items: afterQuantityUpdate,
                total: state.total + Number(addedItems[ itemIndex ].price)
            };
        case SUB_QUANTITY:
            let existedItem = state.addedItems.find(item => item.id === id);
            //if the qt == 0 then it should be removed
            if (existedItem.orderedQuantity === 1) {
                let newItems = state.addedItems.filter(item => item.id !== id);
                //reset the order count
                let afterRemove = removeProduct(state, id);
                let newTotal = state.total - Number(existedItem.price);
                return {
                    ...state,
                    items: afterRemove,
                    addedItems: newItems,
                    total: newTotal
                };
            }
            else {
                let existedItemIndex = state.addedItems.findIndex(item => id === item.id);
                let newData = subProduct(state, id);
                let addedItems = [ ...state.addedItems ];
                addedItems[ existedItemIndex ].orderedQuantity = addedItems[ existedItemIndex ].orderedQuantity - 1;
                return {
                    ...state,
                    addedItems: addedItems,
                    items: newData,
                    total: state.total - Number(addedItems[ existedItemIndex ].price)
                };
            }
        default:
            return state;
    }
};


export const isProductLoading = (state => state.isProductLoading);
export const orderAmount = (state => state.total);
export const getOrdered = (state => state.addedItems);
export const orderedQuantity = (state => state.addedItems ? state.addedItems
    .reduce((a, b) => a + (b[ "orderedQuantity" ] || 0), 0) : 0);
export const getItems = state => (state.items ? state.items.map((object) => {
    return { ...object, key: object.id };
}) : []);

export default rootReducer;