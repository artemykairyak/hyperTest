import {testsAPI} from "../../api/api";

const SET_TESTS = 'SET_TESTS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_TEST_MODE = 'SET_TEST_MODE';
const SET_MODE = 'SET_MODE';
const SET_DISABLED_TABS = 'SET_DISABLED_TABS';

let initialState = {
    isLoaded: false, // вернуть фолс
    mode: 0, // вернуть 0
    testMode: false, //вернуть фолс
    disabledTabs: [],
    tests: []
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TESTS:
            console.log('set')
            return {
                ...state,
                tests: action.tests
            };
        case SET_IS_LOADED:
            // debugger
            return {
                ...state,
                isLoaded: action.isLoaded
            };
        case SET_TEST_MODE:
            return {
                ...state,
                testMode: action.testMode
            };
        case SET_MODE:
            console.log('action', action.mode)
            return {
                ...state,
                mode: action.mode

            };
        case SET_DISABLED_TABS:
            console.log('DIS', action.disabledTabs)
            return {
                ...state,
                disabledTabs: action.disabledTabs

            };
        default:
            return state;
    }
};

export const setTests = (tests) => ({type: SET_TESTS, tests});
export const setTestMode = (testMode) => ({type: SET_TEST_MODE, testMode});
export const setMode = (mode) => ({type: SET_MODE, mode});
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});
export const setDisabledTabs = (disabledTabs) => ({type: SET_DISABLED_TABS, disabledTabs});

export const getAllTests = (token) => async (dispatch) => {
    dispatch(setIsLoaded(false));
    console.log()
    let response = await testsAPI.getAllTests(token);
    console.log(response);
    dispatch(setTests(response.items));
    // dispatch(setTotalUsers(response.totalCount));
    // dispatch(setCurrentPage(page));
    dispatch(setIsLoaded(true));
};

export const getMyTests = (token) => async (dispatch) => {
    console.log('here')
    dispatch(setIsLoaded(false));
    let response = await testsAPI.getMyTests(token);
    console.log(response)

    dispatch(setTests(response.items));
    // // dispatch(setTotalUsers(response.totalCount));
    // // dispatch(setCurrentPage(page));
    dispatch(setIsLoaded(true));

};

export default mainReducer;