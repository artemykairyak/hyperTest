import React, {useEffect} from "react";
import {connect} from "react-redux";
import MyTests from "./MyTests";
import {
    deleteMyTest, getMyPassedTests,
    getMyPublishedTests,
    getMyUnpublishedTests,
    publishMyTest, setPublishedPortion, setUnpublishedPortion
} from "../../redux/reducers/myTestsReducer";
import {editTestTC} from "../../redux/reducers/testReducer";

const MyTestsContainer = ({
                              publishMyTest,
                              myUnpublishedTests,
                              myPublishedTests,
                              myPassedTests,
                              getMyPassedTests,
                              getMyUnpublishedTests,
                              getMyPublishedTests,
                              editTestTC,
                              deleteMyTest,
                              currentPublishedPage,
                              currentUnpublishedPage,
                              pageSize,
                              totalUnpublishedTests,
                              totalPublishedTests,
                              unpublishedPortion,
                              publishedPortion,
                              setUnpublishedPortion,
                              setPublishedPortion,
                              isLoaded
                          }) => {

    useEffect(() => {
        getMyUnpublishedTests(currentUnpublishedPage);
        getMyPublishedTests(currentPublishedPage);
        getMyPassedTests();
    }, []);

    const handleTestClick = () => {
        console.log(1);
    };

    const onPublishedPageChange = (page) => {
        getMyPublishedTests(page);
    };

    const onUnpublishedPageChange = (page) => {
        getMyPublishedTests(page);
    };

    return (
        <MyTests myUnpublishedTests={myUnpublishedTests}
                 myPublishedTests={myPublishedTests}
                 myPassedTests={myPassedTests}
                 isLoaded={isLoaded}
                 publishMyTest={publishMyTest}
                 editTest={editTestTC}
                 deleteMyTest={deleteMyTest}
                 currentPublishedPage={currentPublishedPage}
                 currentUnpublishedPage={currentUnpublishedPage}
                 pageSize={pageSize}
                 totalUnpublishedTests={totalUnpublishedTests}
                 totalPublishedTests={totalPublishedTests}
                 unpublishedPortion={unpublishedPortion}
                 publishedPortion={publishedPortion}
                 setUnpublishedPortion={setUnpublishedPortion}
                 setPublishedPortion={setPublishedPortion}
                 onPublishedPageChange={onPublishedPageChange}
                 onUnpublishedPageChange={onUnpublishedPageChange}
                 handleTestClick={handleTestClick}/>
    )
};

const mapStateToProps = (state) => {
    return {
        myUnpublishedTests: state.myTests.myUnpublishedTests,
        myPublishedTests: state.myTests.myPublishedTests,
        myPassedTests: state.myTests.myPassedTests,
        currentPublishedPage: state.myTests.currentPublishedPage,
        currentUnpublishedPage: state.myTests.currentUnpublishedPage,
        totalUnpublishedTests: state.myTests.totalUnpublishedTests,
        totalPublishedTests: state.myTests.totalPublishedTests,
        unpublishedPortion: state.myTests.unpublishedPortion,
        publishedPortion: state.myTests.publishedPortion,
        pageSize: state.myTests.pageSize,
        isLoaded: state.myTests.isLoaded
    }
};

export default connect(mapStateToProps, {
    getMyUnpublishedTests, getMyPublishedTests, publishMyTest, editTestTC, deleteMyTest,
    setUnpublishedPortion, setPublishedPortion, getMyPassedTests
})(MyTestsContainer);
