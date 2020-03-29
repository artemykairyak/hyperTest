import React from "react";
import {connect} from "react-redux";
import HeaderTabs from "./HeaderTabs";
import {setMode} from "../../../redux/reducers/mainReducer";

const HeaderTabsContainer = ({mode, setMode, disabledTabs}) => {
    const handleChange = (event, newValue) => {
        setMode(newValue);
    };

    return (
        <HeaderTabs activeTab={mode}
                    handleChange={handleChange}
                    disabledTabs={disabledTabs}/>
    )
};

const mapStateToProps = (state) => {
    return {
        mode: state.mainScreen.mode,
        disabledTabs: state.mainScreen.disabledTabs
    }
};

export default connect(mapStateToProps, {setMode})(HeaderTabsContainer);

