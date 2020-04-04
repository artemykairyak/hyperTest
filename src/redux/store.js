import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import testReducer from "./reducers/testReducer";
import mainReducer from "./reducers/mainReducer";
import userReducer from "./reducers/userReducer";
import myTestsReducer from "./reducers/myTestsReducer";

let reducers = combineReducers({
    testScreen: testReducer,
    mainScreen: mainReducer,
    user: userReducer,
    myTests: myTestsReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;