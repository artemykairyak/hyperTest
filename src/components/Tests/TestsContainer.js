import React from "react";
import {connect} from "react-redux";
import Tests from "./Tests";

const TestsContainer = ({mode}) => {
        return <Tests
                      activeTab={mode}

        />
};

const mapStateToProps = (state) => {
    return {
        mode: state.mainScreen.mode,
          }
};

export default connect(mapStateToProps, {})(TestsContainer);
