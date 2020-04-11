import React, {useEffect, useState} from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import Container from "@material-ui/core/Container";
import styles from './MyTests.module.css'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ConfirmPopup from "../Common/Popups/ConfirmPopup/ConfirmPopup";

const MyTests = ({publishMyTest, myUnpublishedTests, myPublishedTests, isLoaded, handleTestClick, editTest, deleteMyTest}) => {
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
        {
            console.log(myUnpublishedTests)
        }
        return (
            <>
                <Container className={styles.container}>
                    <Typography className={styles.label}>Неопубликованные</Typography>
                    <Divider/>
                    <Container
                        className={styles.grid}
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
                                                        onAgree={() => publishTest(publishedTestId, publishedTest)}
                                                        onClose={() => setPublishPopupState(false)}/>}
                </Container>
                <Container className={styles.container}>
                    <Typography className={styles.label}>Опубликованные</Typography>
                    <Divider/>
                    <Container
                        className={styles.grid}
                    >
                        {myPublishedTests.map(item => {
                            return <TestCard test={item}
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