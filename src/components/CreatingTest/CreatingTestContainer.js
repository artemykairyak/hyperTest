import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CreatingTest from './CreatingTest';
import {addGender, addTitle, addPicture} from './../../redux/reducers/testReducer';
import {
    addQuestion,
    addResult, createTestTC,
    deleteQuestion, deleteResult, setEmptyTest,
    setPopupDisplayed, setQuestions
} from "../../redux/reducers/testReducer";

const CreatingTestContainer = ({
                                   addGender,
                                   addTitle,
                                   addResult,
                                   addQuestion,
                                   addPicture,
                                   test,
                                   deleteQuestion,
                                   deleteResult,
                                   setPopupDisplayed,
                                   setQuestions,
                                   setEmptyTest,
                                   createTestTC
                               }) => {
    useEffect(() => {
        console.log(test);
    }, [test]);

    useEffect(() => {
        console.log('setempty')
        setEmptyTest();
    }, []);

    const validation = () => {
        console.log('title', !!test.title);
        console.log('picture', !!test.picture);
        console.log('results', test.results.length > 0);
        console.log('questions', test.questions > 0);

            return (test.title && test.picture && test.results.length > 0 && test.questions.length > 0);
    };

    const _deleteQuestion = (qIndex) => {
        deleteQuestion(qIndex)
    };

    const _deleteResult = (resId) => {
        let questionsCopy = test.questions;
        for (let i = 0; i < questionsCopy.length; i++) {
            for (let j = 0; j < questionsCopy[i].vars.length; j++) {
                if (questionsCopy[i].vars[j].res === resId) {
                    questionsCopy[i].vars[j].res = null;
                }
            }
        }
        deleteResult(resId);
        setQuestions(questionsCopy);
    };

    return <CreatingTest
        validation={validation}
        test={test}
        addGender={addGender}
        addTitle={addTitle}
        addPicture={addPicture}
        deleteQuestion={_deleteQuestion}
        deleteResult={_deleteResult}
        addQuestion={addQuestion}
        setPopupDisplayed={setPopupDisplayed}
        addResult={addResult}
        createTest={createTestTC}
    />
};



const mapStateToProps = (state) => {
    return {
        popupDisplayed: state.testScreen.popupDisplayed,
        test: state.testScreen.test
    }
};

export default connect(mapStateToProps, {
    addGender,
    addTitle,
    addPicture,
    deleteQuestion,
    deleteResult,
    setPopupDisplayed,
    addQuestion,
    addResult,
    setQuestions,
    setEmptyTest,
    createTestTC
})(CreatingTestContainer);