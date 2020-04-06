import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAllTests, setDisabledTabs} from "../../redux/reducers/mainReducer";
import AllTests from "./AllTests";
import {setTestTC} from "../../redux/reducers/testReducer";

const AllTestsContainer = ({tests, setDisabledTabs, setTestTC, getAllTests, isLoaded, token, totalTests, currentPage}) => {
    let [beginPopupState, setBeginPopupState] = useState(false);
    let [propsObj, setPropsObj] = useState(null);

    useEffect(() => {
        console.log('GETTESTS', token)
        setDisabledTabs([]);
        if(token) {
            getAllTests(currentPage); //ВКЛЮЧИТЬ
        }

    }, [token, currentPage]);

    const handleTestClick = (id, picture, title, description, price, creator) => {
        setPropsObj({
            picture, title, description, price, creator, beginTestFunc: () => {
                setTestTC(id)
            }, setBeginPopupState
        });
        setBeginPopupState(true);
    };

    return (
        <AllTests tests={tests}
                  handleTestClick={handleTestClick}
                  beginPopupState={beginPopupState}
                  setDisabledTabs={setDisabledTabs}
                  propsObj={propsObj}
                  isLoaded={isLoaded}
                  totalTests={totalTests}
                  getAllTests={getAllTests}
                  currentPage={currentPage}
        />
    )
};

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        tests: state.mainScreen.tests,
        mode: state.mainScreen.mode,
        isLoaded: state.mainScreen.isLoaded,
        totalTests: state.mainScreen.totalTests,
        currentPage: state.mainScreen.currentPage
    }
};

export default connect(mapStateToProps, {
    setDisabledTabs, setTestTC, getAllTests
})(AllTestsContainer);