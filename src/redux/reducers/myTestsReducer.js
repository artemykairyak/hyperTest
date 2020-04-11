import {myTestsAPI, testsAPI} from "../../api/api";

const SET_MY_UNPUBLISHED_TESTS = 'SET_MY_UNPUBLISHED_TESTS';
const SET_MY_PUBLISHED_TESTS = 'SET_MY_PUBLISHED_TESTS';
const SET_IS_LOADED = 'SET_IS_LOADED';
const PUBLISH_TEST = 'PUBLISH_TEST';
const SET_CURRENT_PUBLISHED_PAGE = 'SET_CURRENT_PUBLISHED_PAGE';
const SET_CURRENT_UNPUBLISHED_PAGE = 'SET_CURRENT_UNPUBLISHED_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const CLEAR_MY_TESTS = 'CLEAR_MY_TESTS';
const DELETE_PUBLISHED_TEST = 'DELETE_PUBLISHED_TEST';

let initialState = {
    isLoaded: false, // вернуть фолс
    currentUnpublishedPage: 1,
    currentPublishedPage: 1,
    publishedTest: null,
    myUnpublishedTests: [],
    myPublishedTests: [],
    totalPages: null
};

const myTestsReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case CLEAR_MY_TESTS:
            return {
                ...state,
                myPublishedTests: []
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
export const setIsLoaded = (isLoaded) => ({type: SET_IS_LOADED, isLoaded});
export const setCurrentUnpublishedPage = (currentPage) => ({type: SET_CURRENT_UNPUBLISHED_PAGE, currentPage});
export const setCurrentPublishedPage = (currentPage) => ({type: SET_CURRENT_PUBLISHED_PAGE, currentPage});
export const deletePublishedTest = (id) => ({type: DELETE_PUBLISHED_TEST, id});
export const clearMyTests = () => ({type: CLEAR_MY_TESTS});

export const getMyUnpublishedTests = (page = 1) => async (dispatch) => {
    dispatch(setCurrentUnpublishedPage(page));
    dispatch(setIsLoaded(false));
    let response = await myTestsAPI.getMyUnpublishedTests(page);
    console.log(response)

    dispatch(setMyUnpublishedTests(response.items));
    // // dispatch(setTotalUsers(response.totalCount));
    // // dispatch(setCurrentPage(page));

    dispatch(setIsLoaded(true));

};

export const getMyPublishedTests = (page = 1) => async (dispatch) => {
    dispatch(setCurrentPublishedPage(page));
    dispatch(setIsLoaded(false));
    let response = await myTestsAPI.getMyPublishedTests(page);
    console.log(response)

    dispatch(setMyPublishedTests(response.items));
    // // dispatch(setTotalUsers(response.totalCount));
    // // dispatch(setCurrentPage(page));

    dispatch(setIsLoaded(true));

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