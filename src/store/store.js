import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../services/product/reducers";
import createSagaMiddleware from "redux-saga";
import saga from "../services/product/saga";

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(initialiseSagaMiddleware)
  )
);

initialiseSagaMiddleware.run(saga);

export default store;
