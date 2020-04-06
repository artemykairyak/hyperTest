import React from "react";
import {connect} from "react-redux";
import Test from "./Test";
import {
    pushAnswer,
    setCurrentQuestion,
    setEmptyTest,
    setIsAnswered, testCompleted
} from "../../redux/reducers/testReducer";
import {setDisabledTabs, setMode, setTestMode} from "../../redux/reducers/mainReducer";

const TestContainer = ({
                           test,
                           currentQuestion,
                           setCurrentQuestion,
                           setIsAnswered,
                           isAnswered,
                           pushAnswer,
                           answers,
                           complete,
                           setComplete,
                           setEmptyTest,
                           setMode,
                           setTestMode,
                           setDisabledTabs,
                           testCompleted
                       }) => {

    const closeTest = () => {
        setEmptyTest();
        setMode(0);
        setTestMode(false);
        setDisabledTabs([]);
    };

    return (
        <Test test={test}
              currentQuestion={currentQuestion}
              isAnswered={isAnswered}
              setCurrentQuestion={setCurrentQuestion}
              setIsAnswered={setIsAnswered}
              pushAnswer={pushAnswer}
              answers={answers}
              complete={complete}
              closeTest={closeTest}
              testCompleted={testCompleted}
        />
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

export default connect(mapStateToProps, {
    setCurrentQuestion,
    setIsAnswered,
    pushAnswer,
    setMode,
    setEmptyTest,
    setTestMode,
    setDisabledTabs,
    testCompleted
})(TestContainer);
