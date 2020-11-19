import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getData, addToCart } from '../../services/product/actions';
import { getOrdered,getItems,isProductLoading } from '../../services/product/reducers';

const Products = (props) => {

    useEffect(() => {
        props.getData ();
    }, []);
    
    const handleClick = (id) => {
        props.addToCart(id);
    };
 
    let productList = props.items && props.items.map(item => {
        return (
            <div className="card " key={item.id}>
                <div className="card-image">
                    <img src={item.image} alt={item.name} />    
                </div>
                <div className="card-content card-body">
                    <span className="card-title"><b className="cyan-text">{item.name}</b></span>
                    <p>{item.description}</p>
                    <p><b>Rs. {item.price}</b></p>
                    <p><b>Avaiable quantity. {item.quantity-item.orderedQuantity}</b></p>
                </div>
                <div className="card-action card-actions">
                    <button className={"waves-effect waves-light btn add-cart cyan"}
                        onClick={() => {
                            handleClick(item.id);
                        }}
                        disabled={item.orderedQuantity >= item.quantity}
                    >
                        <i className="material-icons right">
                            shopping_cart
                        </i>
                        Add to cart       
                </button>
                </div>
            </div >
        );
    });
    return (
        <div className="container" >
            <div className="row">
                <div className="col-lg-12">
                    <div className="box centre">
                        {props.isProductLoading?<div className="centre"><h5>loading...</h5></div>:productList}
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        addedItems: getOrdered(state),
        items: getItems(state) ,
        isProductLoading:isProductLoading(state)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id)),
        getData: () => dispatch(getData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);