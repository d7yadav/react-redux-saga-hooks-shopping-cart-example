import React from 'react';
import { connect } from 'react-redux';
import { orderAmount } from '../../services/product/reducers';

const Recipe =(props)=> {
    return (
            <div className="collection">
                <div className="collection-item"><b>Total in Rs: {props.orderAmount}</b></div>
            </div>
        );
}

const mapStateToProps = (state) => {
    return {
        orderAmount: orderAmount(state)
    };
};


export default connect(mapStateToProps, null)(Recipe);
