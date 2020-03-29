import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import testReducer from "./reducers/testReducer";
import mainReducer from "./reducers/mainReducer";
import userReducer from "./reducers/userReducer";

let reducers = combineReducers({
    testScreen: testReducer,
    mainScreen: mainReducer,
    user: userReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;