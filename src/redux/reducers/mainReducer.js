import {testsAPI} from "../../api/api";

const SET_TESTS = 'SET_TESTS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_TEST_MODE = 'SET_TEST_MODE';
const SET_MODE = 'SET_MODE';
const SET_DISABLED_TABS = 'SET_DISABLED_TABS';
const SET_TOTAL_TESTS = 'SET_TOTAL_TESTS';
const LOAD_MORE_TESTS = 'LOAD_MORE_TESTS';

let initialState = {
    isLoaded: false, // вернуть фолс
    mode: 0, // вернуть 0
    testMode: false, //вернуть фолс
    disabledTabs: [],
    tests: [],
    totalTests: null,
    currentPage: 1
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TESTS:
            console.log('set')
            return {
                ...state,
                currentPage: action.currentPage,
                tests: [...action.tests]
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
        case SET_TOTAL_TESTS:
            return {
                ...state,
                totalTests: action.totalTests

            };
        case LOAD_MORE_TESTS:
            return {
                ...state,
                currentPage: action.page,
                tests: [...action.loadedTests]


            };
        default:
            return state;
    }
};

export const setTests = (tests, currentPage) => ({type: SET_TESTS, tests, currentPage});
export const setTestMode = (testMode) => ({type: SET_TEST_MODE, testMode});
export const setMode = (mode) => ({type: SET_MODE, mode});
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});
export const setDisabledTabs = (disabledTabs) => ({type: SET_DISABLED_TABS, disabledTabs});
export const setTotalTests = (totalTests) => ({type: SET_TOTAL_TESTS, totalTests});
export const loadMoreTests = (page, loadedTests) => ({type: LOAD_MORE_TESTS, page, loadedTests});

export const getAllTests = (page = 1) => async (dispatch) => {
    let response = null;
    console.log('PAGE', page)
    if(page > 1) {
        console.log('PAGE > 1')
        let allTestsArr = [];
        for(let i = 1; i <= page; i++) {
            console.log('i', i)
            response = await testsAPI.getAllTests(i);
            allTestsArr.push(...response.items);
        }
        console.log('ALL TESTS', allTestsArr);

        dispatch(setTests(allTestsArr, page))
    } else {
        console.log('PAGE = 1')
        dispatch(setIsLoaded(false));
        response = await testsAPI.getAllTests(page);
        dispatch(setTests(response.items, page));
        dispatch(setIsLoaded(true));
    }
    console.log(response);

    dispatch(setTotalTests(response._metadata.total_items));
    // dispatch(setTotalUsers(response.totalCount));
    // dispatch(setCurrentPage(page));

};

export default mainReducer;