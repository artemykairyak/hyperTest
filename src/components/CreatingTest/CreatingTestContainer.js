import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreatingTest from './CreatingTest';
import { addGender, addTitle, addPicture } from './../../redux/reducers/testReducer';
import {deleteQuestion, setPopupDisplayed} from "../../redux/reducers/testReducer";

const CreatingTestContainer = ({ addGender, addTitle, addPicture, test, deleteQuestion, setPopupDisplayed , popupDisplayed}) => {
    useEffect(() => {
        console.log(test);
    }, [test]);

    const deleteVar = (qIndex) => {
        console.log(test.questions[qIndex])
        deleteQuestion(qIndex)
    };


    return <CreatingTest
        test={test}
        addGender={addGender}
        addTitle={addTitle}
        addPicture={addPicture}
        deleteVar={deleteVar}
        setPopupDisplayed={setPopupDisplayed}/>
}


const mapStateToProps = (state) => {
    return {
        popupDisplayed: state.testScreen.popupDisplayed,
        test: state.testScreen.test
    }
};

export default connect(mapStateToProps, { addGender, addTitle, addPicture, deleteQuestion, setPopupDisplayed })(CreatingTestContainer);