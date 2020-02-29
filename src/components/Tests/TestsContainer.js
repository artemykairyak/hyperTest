import React from "react";
import {connect} from "react-redux";
import Tests from "./Tests";
import {setTestMode} from "../../redux/reducers/mainReducer";

const TestsContainer = ({tests, setTestMode, mode}) => {
    const handleTestClick = (id) => {
        setTestMode(true);
    };

    return (
        <Tests tests={tests} activeTab={mode} handleTestClick={handleTestClick}/>
    )
};

const mapStateToProps = (state) => {
    return {
        tests: state.mainScreen.tests,
        testMode: state.mainScreen.testMode,
        mode: state.mainScreen.mode,
    }
};

export default connect(mapStateToProps, {setTestMode})(TestsContainer);
