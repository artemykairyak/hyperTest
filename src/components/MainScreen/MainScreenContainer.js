import React from "react";
import {connect} from "react-redux";
import MainScreen from "./MainScreen";

const MainScreenContainer = ({testMode}) => {
    return (
        <MainScreen testMode={testMode}/>
    )
};

const mapStateToProps = (state) => {
    return {
        testMode: state.mainScreen.testMode
    }
};

export default connect(mapStateToProps, {})(MainScreenContainer);
