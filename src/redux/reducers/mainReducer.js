import {testsAPI} from "../../api/api";

const SET_TESTS = 'SET_TESTS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_TEST_MODE = 'SET_TEST_MODE';
const SET_MODE = 'SET_MODE';

let initialState = {
    isLoaded: false,
    mode: 0,
    testMode: false, //вернуть фолс
    tests: [
        {
            id: 0,
            title: 'Тест1',
            picture: 'пикча',
            vip: false,
            description: 'описание',
            price: 0
        },
        {
            id: 1,
            title: 'Тест2',
            picture: 'пикча2',
            description: 'описание2',
            vip: false,
            price: 0
        },
        {
            id: 2,
            title: 'Тест3',
            description: 'описание3',
            picture: 'Пикча3',
            vip: false,
            price: 0
        }
    ]
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TESTS:
            return {
                ...state,
                tests: action.tests
            };
        case SET_IS_LOADED:
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
        default:
            return state;
    }
};

export const setTests = (tests) => ({type: SET_TESTS, tests});
export const setTestMode = (testMode) => ({type: SET_TEST_MODE, testMode});
export const setMode = (mode) => ({type: SET_MODE, mode});
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});

export const getTests = () => async (dispatch) => {
    dispatch(setIsLoaded(false));
    let response = await testsAPI.getTests();
    console.log(response);
    dispatch(setTests(response.items));
    // dispatch(setTotalUsers(response.totalCount));
    // dispatch(setCurrentPage(page));
    dispatch(setIsLoaded(true));
};

export default mainReducer;