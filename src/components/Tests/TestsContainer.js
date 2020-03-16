import React, {useEffect} from "react";
import {connect} from "react-redux";
import Tests from "./Tests";
import {getTests, setTestMode} from "../../redux/reducers/mainReducer";
import {setTestTC} from "../../redux/reducers/testReducer";
import Preloader from "../Common/Preloader";

const TestsContainer = ({tests, setTestTC, getTests, mode, isLoaded}) => {
    const handleTestClick = (id) => {
        setTestTC(id);
    };

    useEffect(() => {
        console.log('gettests')
        getTests();
    },[]);

    if(isLoaded) {
        return  <Tests tests={tests} activeTab={mode} handleTestClick={handleTestClick}/>
    } else {
        return <Preloader/>
    }
};

const mapStateToProps = (state) => {
    return {
        tests: state.mainScreen.tests,
        testMode: state.mainScreen.testMode,
        mode: state.mainScreen.mode,
        isLoaded: state.mainScreen.isLoaded
    }
};

export default connect(mapStateToProps, {setTestMode, getTests, setTestTC})(TestsContainer);
