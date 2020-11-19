import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { Badge } from 'antd';
import Cart from '../cart/Cart';
import { orderAmount ,orderedQuantity} from '../../services/product/reducers';
import logo from '../../assests/images/logo.png'

const Header = (props) => {
    const [ visible, setVisible ] = useState(false);
    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper cyan">
                <div className="container ">
                    <Link to="/" className="brand-logo">
                        <img className="logo"
                        src={logo} alt="logo" />
                    </Link>
                        <Badge count={props.orderedQuantity} showZero offset={[ 10, 20 ]}
                            onClick={() => setVisible(true)} className="right">
                            <span ><i className="material-icons">shopping_cart</i></span>
                        </Badge>
                    <Modal
                        title={<h5>You have ordered:</h5>}
                        centered
                        visible={visible}
                        onCancel={()=>setVisible(false)}
                        width="90%"
                        footer={[
                            <Button className="tela" key="submit" type="primary" onClick={() => setVisible(false)}
                                size="large">
                                Checkout
                        </Button>,
                        ]}
                    >
                        <Cart />
                    </Modal>
                </div>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orderAmount: orderAmount(state),
        orderedQuantity: orderedQuantity(state)
    };
};


export default connect(mapStateToProps, null)(Header);