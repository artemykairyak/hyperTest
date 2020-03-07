const SET_TESTS = 'SET_TESTS';
const SET_TEST_MODE = 'SET_TEST_MODE';
const SET_MODE = 'SET_MODE';

let initialState = {
    mode: 2,
    testMode: false, //вернуть фолс
    tests: [
        {
            testId: 0,
            testTitle: 'Тест1',
            testPic: 'пикча',
            vip: false,
            description: 'описание',
            price: 0
        },
        {
            testId: 1,
            testTitle: 'Тест2',
            testPic: 'пикча2',
            description: 'описание2',
            vip: false,
            price: 0
        },
        {
            testId: 2,
            testTitle: 'Тест3',
            description: 'описание3',
            testPic: 'Пикча3',
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

// export const getUsers = (page, pageSize) => async (dispatch) => {
//     dispatch(setFetching(false));
//     let response = await usersAPI.getUsers(page, pageSize)
//     dispatch(setUsers(response.items));
//     dispatch(setTotalUsers(response.totalCount));
//     dispatch(setCurrentPage(page));
//     dispatch(setFetching(true));
// };

export default mainReducer;