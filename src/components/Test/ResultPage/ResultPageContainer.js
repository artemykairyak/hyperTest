import React from "react";
import {connect} from "react-redux";
import ResultPage from "./ResultPage";
import {setTestMode} from "../../../redux/reducers/mainReducer";
import {setComplete} from "../../../redux/reducers/testReducer";
import {clearAnswers, setCurrentQuestion, setEmptyTest} from "../../../redux/reducers/testReducer";

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

        console.log('res', res);


        if(res[0][0] === 'null' && res.length === 1) {
            result = null;
        }   else  if(res[0][0] === 'null' && res.length > 1) {
            result = test.results[res[1][0]];
        } else {
            let resId = res[0][0];
            for(let j in test.results) {
                if(test.results[j].resId === +resId) {
                    result = test.results[j];
                    break;
                }
            }
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
        <ResultPage result={result} back={back} title={test.title}/>
    )
};

const mapStateToProps = (state) => {
    return {
        test: state.testScreen.test,
        answers: state.testScreen.answers,
    }
};

export default connect(mapStateToProps, {setTestMode, clearAnswers, setComplete, setCurrentQuestion, setEmptyTest})(ResultPageContainer);
