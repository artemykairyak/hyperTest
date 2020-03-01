import React from "react";
import {connect} from "react-redux";
import ResultPage from "./ResultPage";
import {setTestMode} from "./../../redux/reducers/mainReducer";
import {setComplete, setTest} from "./../../redux/reducers/testReducer";

const ResultPageContainer = ({test, answers, setTestMode, setTest, setComplete}) => {
    let result = null;

    const generateResult = () => {
        console.log(test);
        console.log(answers);
        let counts = {},
            res = [];
        for (let i in answers) {
            counts[answers[i]] = (counts[answers[i]] || 0) + 1;
        }
        Object.keys(counts).sort(function (a, b) {
            return counts[b] - counts[a]
        }).forEach(function (el, idx, arr) {
            res.push([el, counts[el]]);
        });

        result = test.results[res[0][0]];
    };

    generateResult();

    const back = () => {
        setTestMode(false);
        setTest(null);
        setComplete(false);
    }

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

export default connect(mapStateToProps, {setTestMode, setTest, setComplete})(ResultPageContainer);
