import React, {useEffect} from "react";
import {connect} from "react-redux";
import MyTests from "./MyTests";
import {getMyUnpublishedTests, publishMyTest} from "../../redux/reducers/myTestsReducer";
import {editTestTC} from "../../redux/reducers/testReducer";

const MyTestsContainer = ({publishMyTest, myUnpublishedTests, getMyUnpublishedTests, editTestTC, isLoaded}) => {

    useEffect(() => {
        console.log('GETMYTESTS')
        getMyUnpublishedTests();
    },[]);

    useEffect(() => {
        console.log('MUTAAATE', myUnpublishedTests);
    },[myUnpublishedTests])

    const handleTestClick = () => {
        console.log(1);
    };

    return (
        <MyTests myUnpublishedTests={myUnpublishedTests}
                 isLoaded={isLoaded}
                 publishMyTest={publishMyTest}
                 editTest={editTestTC}
                 handleTestClick={handleTestClick}/>
    )
};

const mapStateToProps = (state) => {
    return {
        myUnpublishedTests: state.myTests.myUnpublishedTests,
        isLoaded: state.myTests.isLoaded
    }
};

export default connect(mapStateToProps, {
    getMyUnpublishedTests, publishMyTest, editTestTC
})(MyTestsContainer);
