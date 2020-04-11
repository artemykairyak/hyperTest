import React, {useEffect} from "react";
import {connect} from "react-redux";
import MyTests from "./MyTests";
import {
    deleteMyTest,
    getMyPublishedTests,
    getMyUnpublishedTests,
    publishMyTest
} from "../../redux/reducers/myTestsReducer";
import {editTestTC} from "../../redux/reducers/testReducer";

const MyTestsContainer = ({publishMyTest,
                              myUnpublishedTests,
                              myPublishedTests,
                              getMyUnpublishedTests,
                              getMyPublishedTests,
                              editTestTC,
                              deleteMyTest,
                              isLoaded}) => {

    useEffect(() => {
        console.log('GETMYTESTS')
        getMyUnpublishedTests();
        getMyPublishedTests();
    },[]);

    const handleTestClick = () => {
        console.log(1);
    };

    return (
        <MyTests myUnpublishedTests={myUnpublishedTests}
                 myPublishedTests={myPublishedTests}
                 isLoaded={isLoaded}
                 publishMyTest={publishMyTest}
                 editTest={editTestTC}
                 deleteMyTest={deleteMyTest}
                 handleTestClick={handleTestClick}/>
    )
};

const mapStateToProps = (state) => {
    return {
        myUnpublishedTests: state.myTests.myUnpublishedTests,
        myPublishedTests: state.myTests.myPublishedTests,
        isLoaded: state.myTests.isLoaded
    }
};

export default connect(mapStateToProps, {
    getMyUnpublishedTests, getMyPublishedTests, publishMyTest, editTestTC, deleteMyTest
})(MyTestsContainer);
