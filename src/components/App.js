
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../pages/header/Header';
import Products from '../pages/products/Products';
import Footer from '../pages/footer/Footer';

const App = () => (
    <BrowserRouter>
        <div className="App">
            <Header />
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Products} />
                </Switch>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
);

export default App;