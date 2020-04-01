import React, {useEffect} from "react";
import {connect} from "react-redux";
import MyTests from "./MyTests";
import {getMyTests} from "../../redux/reducers/mainReducer";

const MyTestsContainer = ({token, tests, getMyTests, isLoaded}) => {

    useEffect(() => {
        console.log('GETMYTESTS')
        getMyTests(token);
    },[]);

    const handleTestClick = () => {
        console.log(1);
    };

    return (
        <MyTests tests={tests} isLoaded={isLoaded} handleTestClick={handleTestClick}/>
    )
};

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        tests: state.mainScreen.tests,
        isLoaded: state.mainScreen.isLoaded
    }
};

export default connect(mapStateToProps, {
getMyTests
})(MyTestsContainer);
