import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CreatingTest from './CreatingTest';
import {addGender, addTitle, addPicture} from './../../redux/reducers/testReducer';
import {
    addDescription,
    addQuestion,
    addResult, createTestTC,
    deleteQuestion, deleteResult, editQuestion, editResult, publishMyEditedTest, setEmptyTest,
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
                                   createTestTC,
                                   addDescription,
                                   token,
                                   testEditMode,
                                   publishMyEditedTest
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

    const isCorrect = () => {
        let assignedResultsCount = 0;
        let emptyResultsCount = 0;

        for (let i = 0; i < test.questions.length; i++) {
            for (let j = 0; j < test.questions[i].vars.length; j++) {
                if(test.questions[i].vars[j].res !== null) {
                    assignedResultsCount = assignedResultsCount + 1;
                } else {
                    emptyResultsCount = emptyResultsCount + 1;
                }
            }
        }

        return assignedResultsCount > emptyResultsCount;
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
        addDescription={addDescription}
        editResult={_editResult}
        isCorrect={isCorrect}
        questionsWithDeletedResults={questionsWithDeletedResults}
        setQuestionsWithDeletedResults={setQuestionsWithDeletedResults}
        token={token}
        testEditMode={testEditMode}
        publishMyEditedTest={publishMyEditedTest}
    />
};



const mapStateToProps = (state) => {
    return {
        popupDisplayed: state.testScreen.popupDisplayed,
        test: state.testScreen.test,
        token: state.user.token,
        testEditMode: state.testScreen.testEditMode
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
    createTestTC,
    addDescription,
    publishMyEditedTest
})(CreatingTestContainer);