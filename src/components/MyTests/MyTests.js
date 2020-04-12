import React, {useEffect, useState} from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import Container from "@material-ui/core/Container";
import styles from './MyTests.module.css'
import generalStyles from '../Common/generalStyles.module.css';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ConfirmPopup from "../Common/Popups/ConfirmPopup/ConfirmPopup";
import Pagination from "../Common/Pagination/Pagination";

const MyTests = ({
                     publishMyTest,
                     myUnpublishedTests,
                     myPublishedTests,
                     isLoaded,
                     handleTestClick,
                     editTest,
                     deleteMyTest,
                     pageSize,
                     onPublishedPageChange,
                     onUnpublishedPageChange,
                     unpublishedPortion,
                     setUnpublishedPortion,
                     setPublishedPortion,
                     publishedPortion,
                     totalUnpublishedTests,
                     totalPublishedTests,
                     currentUnpublishedPage,
                     currentPublishedPage,
                     myPassedTests,
                 }) => {
    let [deletePopupState, setDeletePopupState] = useState(false);
    let [publishPopupState, setPublishPopupState] = useState(false);
    let [publishedTestId, setPublishedTestId] = useState(null);
    let [publishedTest, setPublishedTest] = useState(null);

    const publishTest = (id, test) => {
        publishMyTest(id, test);
        setPublishPopupState(false);
    };

    const deleteTest = (id) => {
        deleteMyTest(id);
        setDeletePopupState(false);
    };

    if (isLoaded) {
        return (
            <>
                <Container className={styles.container}>
                    <Typography className={styles.label}>Неопубликованные</Typography>
                    <Divider/>
                    {totalUnpublishedTests > pageSize &&
                    <Pagination currentPage={currentUnpublishedPage}
                                onPageChanged={onUnpublishedPageChange}
                                pageSize={pageSize}
                                totalItems={totalUnpublishedTests}
                                portion={unpublishedPortion}
                                setPortion={setUnpublishedPortion}/>
                    }
                    <Container
                        className={generalStyles.grid}
                    >
                        {myUnpublishedTests.map(item => {
                            return <TestCard test={item}
                                             key={item.id}
                                             editTest={editTest}
                                             handleTestClick={handleTestClick}
                                             deleteIcon={true}
                                             editIcon={true}
                                             setDeletePopupState={setDeletePopupState}
                                             setPublishPopupState={setPublishPopupState}
                                             setPublishedTest={setPublishedTest}
                                             setPublishedTestId={setPublishedTestId}
                                             publishIcon={true}/>
                        })}
                    </Container>
                    {deletePopupState && <ConfirmPopup agreeText='Удалить'
                                                       text='Вы хотите удалить этот тест?'
                                                       onAgree={() => deleteTest(publishedTestId)}
                                                       onClose={() => setDeletePopupState(false)}/>}
                    {publishPopupState && <ConfirmPopup agreeText='Опубликовать'
                                                        text='Вы хотите опубликовать этот тест?'
                                                        additionalText='Тест больше нельзя будет отредактировать или удалить'
                                                        onAgree={() => publishTest(publishedTestId, publishedTest)}
                                                        onClose={() => setPublishPopupState(false)}/>}
                </Container>
                <Container className={styles.container}>
                    <Typography className={styles.label}>Опубликованные</Typography>
                    <Divider/>
                    {totalPublishedTests > pageSize &&
                    <Pagination currentPage={currentPublishedPage}
                                onPageChanged={onPublishedPageChange}
                                pageSize={pageSize}
                                totalItems={totalPublishedTests}
                                portion={publishedPortion}
                                setPortion={setPublishedPortion}/>
                    }
                    <Container
                        className={generalStyles.grid}
                    >
                        {myPublishedTests.map(item => {
                            return <TestCard test={item}
                                             key={item.id}
                                             handleTestClick={handleTestClick}
                            />
                        })}
                    </Container>
                </Container>
                <Container className={styles.container}>
                    <Typography className={styles.label}>Последние пройденные</Typography>
                    <Divider/>
                    <Container
                        className={generalStyles.grid}
                    >
                        {myPassedTests.map(item => {
                            return <TestCard test={item}
                                             passed={item.passed}
                                             key={item.id}
                                             handleTestClick={handleTestClick}
                            />
                        })}
                    </Container>
                </Container>
            </>
        )
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
    }
};

export default MyTests;