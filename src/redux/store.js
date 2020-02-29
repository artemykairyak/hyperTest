import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import testReducer from "./reducers/testReducer";
import mainReducer from "./reducers/mainReducer";

let reducers = combineReducers({
    testScreen: testReducer,
    mainScreen: mainReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;