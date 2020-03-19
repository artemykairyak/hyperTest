import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CreatingTest from './CreatingTest';
import {addGender, addTitle, addPicture} from './../../redux/reducers/testReducer';
import {
    addQuestion,
    addResult, createTestTC,
    deleteQuestion, deleteResult, editQuestion, editResult, setEmptyTest,
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
                                   editQuestion,
                                   editResult,
                                   deleteResult,
                                   setPopupDisplayed,
                                   setQuestions,
                                   setEmptyTest,
                                   createTestTC
                               }) => {

    let [questionsWithDeletedResults, setQuestionsWithDeletedResults] = useState(null);

    useEffect(() => {
        console.log(test);
    }, [test]);

    useEffect(() => {
        console.log('deletedResQ', questionsWithDeletedResults)
    },[questionsWithDeletedResults])

    useEffect(() => {
        console.log('setempty')
        setEmptyTest();
    }, []);

    const validation = () => {
            return (test.title && test.picture && test.results.length > 0 && test.questions.length > 0);
    };

    const _deleteQuestion = (qIndex) => {
        deleteQuestion(qIndex)
    };


    const _editQuestion = (newQuestion) => {
        editQuestion(newQuestion)
    };

    const _editResult = (newResult) => {
        editResult(newResult)
    };

    const _deleteResult = (resId) => {
        let questionsCopy = test.questions;
        let questionsWithDeletedResultsIds = new Set();
        for (let i = 0; i < questionsCopy.length; i++) {
            for (let j = 0; j < questionsCopy[i].vars.length; j++) {
                if (questionsCopy[i].vars[j].res === resId) {
                    questionsCopy[i].vars[j].res = null;
                    questionsWithDeletedResultsIds.add(questionsCopy[i].qId)
                }
            }
        }
        deleteResult(resId);
        setQuestions(questionsCopy);
        setQuestionsWithDeletedResults(questionsWithDeletedResultsIds);
    };

    return <CreatingTest
        validation={validation}
        test={test}
        addGender={addGender}
        addTitle={addTitle}
        addPicture={addPicture}
        deleteQuestion={_deleteQuestion}
        deleteResult={_deleteResult}
        editQuestion={_editQuestion}
        addQuestion={addQuestion}
        setPopupDisplayed={setPopupDisplayed}
        addResult={addResult}
        createTest={createTestTC}
        editResult={_editResult}
        questionsWithDeletedResults={questionsWithDeletedResults}
        setQuestionsWithDeletedResults={setQuestionsWithDeletedResults}
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
    editQuestion,
    editResult,
    deleteResult,
    setPopupDisplayed,
    addQuestion,
    addResult,
    setQuestions,
    setEmptyTest,
    createTestTC
})(CreatingTestContainer);