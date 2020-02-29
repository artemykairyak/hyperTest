import React from "react";
import {connect} from "react-redux";
import Test from "./Test";
import {pushAnswer, setComplete, setCurrentQuestion, setIsAnswered} from "../../redux/reducers/testReducer";

const TestContainer = ({test,
                           currentQuestion,
                           setCurrentQuestion,
                           setIsAnswered,
                           isAnswered,
                           pushAnswer,
                           answers,
                           complete,
                           setComplete}) => {

    return (
        <Test test={test}
              currentQuestion={currentQuestion}
              isAnswered={isAnswered}
              setCurrentQuestion={setCurrentQuestion}
              setIsAnswered={setIsAnswered}
              pushAnswer={pushAnswer}
              answers={answers}
              complete={complete}
              setComplete={setComplete}/>
    )
};

const mapStateToProps = (state) => {
    return {
        test: state.testScreen.test,
        currentQuestion: state.testScreen.currentQuestion,
        isAnswered: state.testScreen.isAnswered,
        complete: state.testScreen.complete,
        answers: state.testScreen.answers //ТОЛЬКО ДЛЯ ДЕБАГА
    }
};

export default connect(mapStateToProps, {setCurrentQuestion, setIsAnswered, pushAnswer, setComplete})(TestContainer);
