import {myTestsAPI, testsAPI} from "../../api/api";

const SET_MY_UNPUBLISHED_TESTS = 'SET_MY_UNPUBLISHED_TESTS';
const SET_MY_PUBLISHED_TESTS = 'SET_MY_PUBLISHED_TESTS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const SET_MY_PASSED_TESTS = 'SET_MY_PASSED_TESTS';
const SET_CURRENT_PUBLISHED_PAGE = 'SET_CURRENT_PUBLISHED_PAGE';
const SET_CURRENT_UNPUBLISHED_PAGE = 'SET_CURRENT_UNPUBLISHED_PAGE';
const SET_UNPUBLISHED_PORTION = 'SET_UNPUBLISHED_PORTION';
const SET_PUBLISHED_PORTION = 'SET_PUBLISHED_PORTION';
const SET_TOTAL_UNPUBLISHED_TESTS = 'SET_TOTAL_UNPUBLISHED_TESTS';
const SET_TOTAL_PUBLISHED_TESTS = 'SET_TOTAL_PUBLISHED_TESTS';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const DELETE_PUBLISHED_TEST = 'DELETE_PUBLISHED_TEST';

let initialState = {
    isLoaded: false, // вернуть фолс
    currentUnpublishedPage: 1,
    currentPublishedPage: 1,
    publishedTest: null,
    myUnpublishedTests: [],
    myPublishedTests: [],
    totalUnpublishedTests: 0,
    totalPublishedTests: 0,
    pageSize: 6,
    unpublishedPortion: 1,
    publishedPortion: 1,
    totalUnpublishedPages: 0,
    totalPublishedPages: 0,
    myPassedTests: [],

};

const myTestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_PASSED_TESTS:
            return {
                ...state,
                myPassedTests: [...action.myPassedTests]
            };
        case SET_MY_UNPUBLISHED_TESTS:
                return {
                    ...state,
                    myUnpublishedTests: [...action.myUnpublishedTests]
                };
        case SET_MY_PUBLISHED_TESTS:
            return {
                ...state,
                myPublishedTests: [...action.myPublishedTests]
            };
        case SET_IS_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            };
        case SET_CURRENT_UNPUBLISHED_PAGE:
            return {
                ...state,
                currentUnpublishedPage: action.currentPage
            };
        case SET_CURRENT_PUBLISHED_PAGE:
            return {
                ...state,
                currentPublishedPage: action.currentPage
            };
        case SET_UNPUBLISHED_PORTION:
            return {
                ...state,
                unpublishedPortion: action.portion
            };
        case SET_PUBLISHED_PORTION:
            return {
                ...state,
                publishedPortion: action.portion
            };
        case SET_TOTAL_UNPUBLISHED_TESTS:
            return {
                ...state,
                totalUnpublishedTests: action.totalTests
            };
        case SET_TOTAL_PUBLISHED_TESTS:
            return {
                ...state,
                totalPublishedTests: action.totalTests
            };
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            };
        case DELETE_PUBLISHED_TEST:
            let newMyTestsArr = state.myUnpublishedTests.filter(item => {
                if(item.id !== action.id) {
                    return item;
                }

            });
            return {
                ...state,
                myUnpublishedTests: newMyTestsArr
            };
        default:
            return state;
    }
};

export const setMyUnpublishedTests = (myUnpublishedTests) => ({type: SET_MY_UNPUBLISHED_TESTS, myUnpublishedTests});
export const setMyPublishedTests = (myPublishedTests) => ({type: SET_MY_PUBLISHED_TESTS, myPublishedTests});
export const setMyPassedTests = (myPassedTests) => ({type: SET_MY_PASSED_TESTS, myPassedTests});

export const setUnpublishedPortion = (portion) => ({type: SET_UNPUBLISHED_PORTION, portion});
export const setPublishedPortion = (portion) => ({type: SET_PUBLISHED_PORTION, portion});

export const setTotalUnpublishedTests = (totalTests) => ({type: SET_TOTAL_UNPUBLISHED_TESTS, totalTests});
export const setTotalPublishedTests = (totalTests) => ({type: SET_TOTAL_PUBLISHED_TESTS, totalTests});

export const setPageSize = (pageSize) => ({type: SET_PAGE_SIZE, pageSize});
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});
export const setCurrentUnpublishedPage = (currentPage) => ({type: SET_CURRENT_UNPUBLISHED_PAGE, currentPage});
export const setCurrentPublishedPage = (currentPage) => ({type: SET_CURRENT_PUBLISHED_PAGE, currentPage});
export const deletePublishedTest = (id) => ({type: DELETE_PUBLISHED_TEST, id});


export const getMyUnpublishedTests = (page = 1) => async (dispatch) => {
    dispatch(setCurrentUnpublishedPage(page));

    let response = await myTestsAPI.getMyUnpublishedTests(page);
    console.log(response)

    dispatch(setMyUnpublishedTests(response.items));
    dispatch(setTotalUnpublishedTests(response._metadata.total_items));

};

export const getMyPublishedTests = (page = 1) => async (dispatch) => {
    dispatch(setCurrentPublishedPage(page));
    let response = await myTestsAPI.getMyPublishedTests(page);

    dispatch(setMyPublishedTests(response.items));
    dispatch(setTotalPublishedTests(response._metadata.total_items));
};

export const getMyPassedTests = (page = 1) => async (dispatch) => {
    let response = await myTestsAPI.getMyPassedTests(page);
    dispatch(setMyPassedTests(response.items));
};

export const publishMyTest = (id) => async (dispatch) => {
    // console.log('PUB', test);
    // dispatch(setIsLoaded(false));
    let test = await myTestsAPI.getMyTest(id);
    test.isPublished = true;
    let response = await myTestsAPI.publishMyTest(id, test);
    console.log(response)
    dispatch(deletePublishedTest(id));
     // dispatch(setMyUnpublishedTests(response.items));

    // dispatch(setIsLoaded(true));

};

export const deleteMyTest = (id) => async (dispatch) => {
    await myTestsAPI.deleteMyTest(id);
    dispatch(deletePublishedTest(id));
    dispatch(deletePublishedTest(id));
   // dispatch(setMyUnpublishedTests(response.items));

    // dispatch(setIsLoaded(true));

};

// export const setCurrentPage = (page) => async (dispatch) => {
//     console.log('page')
//     let response = await myTestsAPI.getMyUnpublishedTests(page);
//     console.log(response)
//
//     dispatch(setMyTests(response.items));
//     // // dispatch(setTotalUsers(response.totalCount));
//     // // dispatch(setCurrentPage(page));
//     dispatch(setIsLoaded(true));
//
// };

export default myTestsReducer;