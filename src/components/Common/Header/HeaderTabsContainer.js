import React from "react";
import {connect} from "react-redux";
import HeaderTabs from "./HeaderTabs";
import {setMode} from "../../../redux/reducers/mainReducer";

const HeaderTabsContainer = ({mode, setMode, disabledTabs, coins}) => {
    const handleChange = (event, newValue) => {
        setMode(newValue);
    };

    return (
        <HeaderTabs activeTab={mode}
                    handleChange={handleChange}
                    coins={coins}
                    disabledTabs={disabledTabs}/>
    )
};

const mapStateToProps = (state) => {
    return {
        mode: state.mainScreen.mode,
        disabledTabs: state.mainScreen.disabledTabs,
        coins: state.user.coins
    }
};

export default connect(mapStateToProps, {setMode})(HeaderTabsContainer);

