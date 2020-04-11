import {myTestsAPI, testAPI, testsAPI} from "../../api/api";
import {setMode, setTestMode} from "./mainReducer";
import {deletePublishedTest} from "./myTestsReducer";

const SET_TEST = 'SET_TEST';
const SET_EMPTY_TEST = 'SET_EMPTY_TEST';
const CLEAR_ANSWERS = 'CLEAR_ANSWERS';
const ADD_RESULT = 'ADD_RESULT';
const EDIT_RESULT = 'EDIT_RESULT';
const ADD_QUESTION = 'ADD_QUESTION';
const EDIT_QUESTION = 'EDIT_QUESTION';
const SET_QUESTIONS = 'SET_QUESTIONS';
const DELETE_QUESTION = 'DELETE_QUESTION';
const DELETE_RESULT = 'DELETE_RESULT';
const SET_EDIT_TEST_MODE = 'SET_EDIT_TEST_MODE';
const ADD_PICTURE = 'ADD_PICTURE';
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
const SET_ANSWERED = 'SET_ANSWERED';
const PUSH_ANSWER = 'PUSH_ANSWER';
const SET_COMPLETE = 'SET_COMPLETE';
const ADD_GENDER = 'SET_GENDER';
const ADD_TITLE = 'SET_TITLE';
const SET_ERRORS = 'SET_ERRORS';
const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
const SET_POPUP_DISPLAYED = 'SET_POPUP_DISPLAYED';

let template = {
    id: 0,
    isPublished: false,
    description: '',
    vip: false,
    price: 0,
    gender: 0,
    title: '',
    picture: null,
    results: [],
    questions: []
};

let initialState = {
    testEditMode: false,
    popupDisplayed: 0,
    currentQuestion: 1,
    complete: false,
    isAnswered: false,
    answers: [],
    errors: [],
    test: template
};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST:
            return {
                ...state,
                test: action.test
            };
        case SET_EMPTY_TEST:
            return {
                ...state,
                test: template
            };
        case SET_EDIT_TEST_MODE:
            return {
                ...state,
                testEditMode: action.editTestMode
            };
        case ADD_RESULT:
            console.log('RERER', action.result)
            return {
                ...state,
                test: {...state.test, results: [...state.test.results, action.result]}
            };
        case ADD_QUESTION:
            return {
                ...state,
                test: {...state.test, questions: [...state.test.questions, action.question]}
            };
        case DELETE_QUESTION:
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: [...state.test.questions.filter((item, index) => index !== action.qIndex)]
                },
            };
        case EDIT_QUESTION:
            let updatedQuestions = [];
            for (let i = 0; i < state.test.questions.length; i++) {
                if (state.test.questions[i].qId === action.newQuestion.qId) {
                    updatedQuestions.push(action.newQuestion)
                } else {
                    updatedQuestions.push(state.test.questions[i]);
                }
            }

            return {
                ...state,
                test: {
                    ...state.test,
                    questions: updatedQuestions
                },
            };
        case DELETE_RESULT:
            return {
                ...state,
                test: {
                    ...state.test,
                    results: [...state.test.results.filter((item) => item.resId !== action.resId)]
                },
            };
        case EDIT_RESULT:
            let updatedResults = [];
            for (let i = 0; i < state.test.results.length; i++) {
                if (state.test.results[i].resId === action.newResult.resId) {
                    updatedResults.push(action.newResult)
                } else {
                    updatedResults.push(state.test.results[i]);
                }
            }

            return {
                ...state,
                test: {
                    ...state.test,
                    results: updatedResults
                },
            };
        case ADD_GENDER:
            return {
                ...state,
                test: {...state.test, gender: action.gender},
            };
        case ADD_DESCRIPTION:
            return {
                ...state,
                test: {...state.test, description: action.description},
            };
        case SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.currentQuestion
            };
        case SET_ANSWERED:
            return {
                ...state,
                isAnswered: action.isAnswered
            };
        case SET_ERRORS:
            return {
                ...state,
                isAnswered: action.isAnswered
            };
        case PUSH_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.res]
            };
        case SET_COMPLETE:
            return {
                ...state,
                complete: action.complete
            };
        case SET_QUESTIONS:
            return {
                ...state,
                test: {...state.test, questions: action.questions}
            };
        case ADD_TITLE:
            return {
                ...state,
                test: {...state.test, title: action.title},
            };
        case ADD_PICTURE:
            return {
                ...state,
                test: {...state.test, picture: action.picture},
            };
        case CLEAR_ANSWERS:
            return {
                ...state,
                answers: [],
            };
        case SET_POPUP_DISPLAYED:
            return {
                ...state,
                popupDisplayed: action.popupId,
            };
        default:
            return state;
    }
};

export const setTest = (test) => ({type: SET_TEST, test});
export const setEmptyTest = () => ({type: SET_EMPTY_TEST});
export const addResult = (result) => ({type: ADD_RESULT, result});
export const addQuestion = (question) => ({type: ADD_QUESTION, question});
export const deleteQuestion = (qIndex) => ({type: DELETE_QUESTION, qIndex});
export const editQuestion = (newQuestion) => ({type: EDIT_QUESTION, newQuestion});
export const editResult = (newResult) => ({type: EDIT_RESULT, newResult});
export const deleteResult = (resId) => ({type: DELETE_RESULT, resId});
export const setIsAnswered = (isAnswered) => ({type: SET_ANSWERED, isAnswered});
export const setCurrentQuestion = (currentQuestion) => ({type: SET_CURRENT_QUESTION, currentQuestion});
export const pushAnswer = (res) => ({type: PUSH_ANSWER, res});
export const setComplete = (complete) => ({type: SET_COMPLETE, complete});
export const addGender = (gender) => ({type: ADD_GENDER, gender});
export const addTitle = (title) => ({type: ADD_TITLE, title});
export const addDescription = (description) => ({type: ADD_DESCRIPTION, description});
export const addPicture = (picture) => ({type: ADD_PICTURE, picture});
export const setPopupDisplayed = (popupId) => ({type: SET_POPUP_DISPLAYED, popupId});
export const setQuestions = (questions) => ({type: SET_QUESTIONS, questions});
export const setEditTestMode = (editTestMode) => ({type: SET_EDIT_TEST_MODE, editTestMode});
export const clearAnswers = () => ({type: CLEAR_ANSWERS});

export const setTestTC = (id) => async (dispatch) => {
    let response = await testsAPI.getTest(id);
    dispatch(clearAnswers());
    dispatch(setCurrentQuestion(1));
    console.log(response);
    dispatch(setTest(response));
    dispatch(setTestMode(true))
};

export const testCompleted = (id, resId) => async (dispatch) => {
    console.log('COMPLETED', id)

    dispatch(setComplete(true));
    await testAPI.testPassed(id, resId);
};

const errorsObjConstructor = (errors) => {
    let errorsObj = {};

    for (let key in errors) {
        console.log('key', key);
        if (Array.isArray(key)) {

        } else {
            for (let innerKey in key) {
                console.log('innerKey', innerKey)
                // errorsObj[ky] =
            }
        }
    }
    if (errors.picture) {
        errorsObj['picture'] = errors.picture;
    }

    if (errors.results) {
        errorsObj['results'] = [];
        errors.results.forEach((item, index) => {
            errorsObj['results'].push({index: index, message: item});
        });
    }

    if (errors.questions) {
        errorsObj['questions'] = [];
        errors.questions.forEach((item, index) => {
            errorsObj['questions'].push({index: index, message: item});
        });
    }

    console.log('ERRORS', errorsObj);
}

export const createTestTC = (test) => async (dispatch) => {

    let response = await testsAPI.createTest(test);
    if (response.errors) {
        // errorsObjConstructor(response.errors.fields)
    } else {
        dispatch(setEmptyTest());
        dispatch(setMode(1));

        // dispatch(getAllTests());
    }
    console.log(response);

};

export const editTestTC = (id) => async (dispatch) => {
    let response = await myTestsAPI.getMyTest(id);
    if (response.errors) {
        // errorsObjConstructor(response.errors.fields)
    } else {
        dispatch(setMode(2));
        dispatch(setEditTestMode(true));
        dispatch(setTest(response));
    }
    console.log(response);

};

export const publishMyEditedTest = (id, test) => async (dispatch) => {
    console.log('EDIT');
    await myTestsAPI.publishMyTest(id, test);
    dispatch(setMode(1));
    dispatch(setEmptyTest());
    dispatch(setEditTestMode(false));

};

export default testReducer;