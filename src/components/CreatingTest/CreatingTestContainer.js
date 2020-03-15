import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import CreatingTest from './CreatingTest';
import {addGender, addTitle, addPicture} from './../../redux/reducers/testReducer';
import {
    addQuestion,
    addResult,
    deleteQuestion, deleteResult,
    setPopupDisplayed, setQuestions
} from "../../redux/reducers/testReducer";
import * as axios from "axios";

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
                                   setQuestions
                               }) => {
    useEffect(() => {
        console.log(test);
    }, [test]);

    const _deleteQuestion = (qIndex) => {
        console.log(test.questions[qIndex])
        deleteQuestion(qIndex)
    };

    const _deleteResult = (resId) => {
        let questionsCopy = test.questions;
        for (let i = 0; i < questionsCopy.length; i++) {
            for (let j = 0; j < questionsCopy[i].vars.length; j++) {
                console.log(j)
                if (questionsCopy[i].vars[j].res === resId) {
                    questionsCopy[i].vars[j].res = null;
                }
            }
        }
        deleteResult(resId);
        setQuestions(questionsCopy);

    };

    // const testA = () => {
    //     let data = test;
    //     console.log(data);
    //     axios.post('https://cors-anywhere.herokuapp.com/http://37.230.114.75:8000/api/tests', data)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    //
    // testA();

    return <CreatingTest
        test={test}
        addGender={addGender}
        addTitle={addTitle}
        addPicture={addPicture}
        deleteQuestion={_deleteQuestion}
        deleteResult={_deleteResult}
        addQuestion={addQuestion}
        setPopupDisplayed={setPopupDisplayed}
        addResult={addResult}
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
    setQuestions
})(CreatingTestContainer);