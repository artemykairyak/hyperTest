import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAllTests, setDisabledTabs} from "../../redux/reducers/mainReducer";
import AllTests from "./AllTests";
import {setTestTC} from "../../redux/reducers/testReducer";

const AllTestsContainer = ({tests, setDisabledTabs, setTestTC, getAllTests, isLoaded}) => {
    let [beginPopupState, setBeginPopupState] = useState(false);
    let [propsObj, setPropsObj] = useState(null);

    useEffect(() => {
        console.log('GETTESTS')
        setDisabledTabs([]);
        getAllTests(); //ВКЛЮЧИТЬ
    }, []);

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
        />
    )
};

const mapStateToProps = (state) => {
    return {
        tests: state.mainScreen.tests,
        mode: state.mainScreen.mode,
        isLoaded: state.mainScreen.isLoaded
    }
};

export default connect(mapStateToProps, {
    setDisabledTabs, setTestTC, getAllTests
})(AllTestsContainer);