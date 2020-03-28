import React, {useEffect} from "react";
import {connect} from "react-redux";
import Tests from "./Tests";
import {getTests, setTestMode} from "../../redux/reducers/mainReducer";
import {setTestTC} from "../../redux/reducers/testReducer";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";

const TestsContainer = ({tests, setTestTC, getTests, mode, isLoaded}) => {


    useEffect(() => {
        console.log('gettests')
           getTests(); //ВКЛЮЧИТЬ
    },[]);

    if(isLoaded) {
        return  <Tests tests={tests}
                       activeTab={mode}
                       setTestTC={setTestTC}
        />
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
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
