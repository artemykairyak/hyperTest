import React from "react";
import {connect} from "react-redux";
import ResultPage from "./ResultPage";
import {setTestMode} from "./../../redux/reducers/mainReducer";
import {setComplete} from "./../../redux/reducers/testReducer";
import {clearAnswers, setCurrentQuestion, setEmptyTest} from "../../redux/reducers/testReducer";

const ResultPageContainer = ({test, answers, setTestMode, setEmptyTest, setComplete, clearAnswers, setCurrentQuestion}) => {
    let result = null;

    const generateResult = () => {
        let counts = {},
            res = [];
        for (let i in answers) {
            counts[answers[i]] = (counts[answers[i]] || 0) + 1;
        }
        Object.keys(counts).sort(function (a, b) {
            return counts[b] - counts[a]
        }).forEach(function (el) {
            res.push([el, counts[el]]);
        });

        if(res[0][0] === 'null') {
            result = test.results[res[1][0]];
        } else {
            result = test.results[res[0][0]];
        }
    };

    generateResult();

    const back = () => {
        setTestMode(false);
        setCurrentQuestion(1);
        setEmptyTest();
        clearAnswers();
        setComplete(false);
    };

    return (
        <ResultPage result={result} back={back}/>
    )
};

const mapStateToProps = (state) => {
    return {
        test: state.testScreen.test,
        answers: state.testScreen.answers,
    }
};

export default connect(mapStateToProps, {setTestMode, clearAnswers, setComplete, setCurrentQuestion, setEmptyTest})(ResultPageContainer);
