import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, addQuantity, subtractQuantity } from '../../services/product/actions';
import { orderedQuantity,getOrdered } from '../../services/product/reducers';

import Reciept from '../reciept/Reciept';
const Cart = (props) => {
    //to remove the item completely
    const handleRemove = (id) => {
        props.removeItem(id);
    };
    //to add the quantity
    const handleAddQuantity = (id) => {
        props.addQuantity(id);
    };
    //to substruct from the quantity
    const handleSubtractQuantity = (id) => {
        props.subtractQuantity(id);
    };
    let addedItems = props.addedItems.length ?
        (
            props.addedItems.map(item => {
                return (
                    <li className="collection-item " key={item.id}>
                        <div className="item-img">
                            <img src={item.image} alt={item.image}/>
                        </div>
                        <div className="item-desc">
                            <span className="title"><b>{item.name}</b></span>
                            <p>{item.description}</p>
                            <p><b>Rs. {item.price}</b></p>
                            <p>
                                <b>Quantity: {item.orderedQuantity}</b>
                            </p>
                            <div className="add-remove">
                                <Link to="#" disabled={item.orderedQuantity>=item.quantity}><i className="material-icons" onClick={() => { handleAddQuantity(item.id); }}>arrow_drop_up</i></Link>
                                <Link to="#"><i className="material-icons" onClick={() => { handleSubtractQuantity(item.id); }}>arrow_drop_down</i></Link>
                            </div>
                            <button className="waves-effect waves-light btn pink remove" onClick={() => { handleRemove(item.id); }}>Remove</button>
                        </div>
                    </li>
                );
            })
        )
        :
        (
            <p className="collection-item"><b>Nothing.</b></p>
        );
    return (
        <>
            <ul className="collection">
                {addedItems}
            </ul>
            <Reciept />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        addedItems: getOrdered(state),
        orderedQuantity:orderedQuantity(state)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)); },
        addQuantity: (id) => { dispatch(addQuantity(id)); },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)); }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);