import React, {useEffect, useState} from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import Container from "@material-ui/core/Container";
import styles from './MyTests.module.css'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ConfirmPopup from "../Common/Popups/ConfirmPopup/ConfirmPopup";
import {publishMyTest} from "../../redux/reducers/myTestsReducer";


const MyTests = ({publishMyTest, myUnpublishedTests, isLoaded, handleTestClick}) => {
    let [deletePopupState, setDeletePopupState] = useState(false);
    let [publishPopupState, setPublishPopupState] = useState(false);
    let [publishedTestId, setPublishedTestId] = useState(null);
    let [publishedTest, setPublishedTest] = useState(null);

    const publishTest = (id, test) => {
        console.log('ID TEST', id, test)
        publishMyTest(id, test);
        setPublishPopupState(false);
    };

    if (isLoaded) {
        {console.log(myUnpublishedTests)}
        return (
            <Container className={styles.container}>
                <Typography className={styles.label}>Неопубликованные</Typography>
                <Divider />
                <Container
                    className={styles.grid}
                >
                    {myUnpublishedTests.map(item => {
                        console.log(item.id)
                        return <TestCard test={item}
                                         key={item.id}
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
                                                   onClose={() => setDeletePopupState(false)}/>}
                {publishPopupState && <ConfirmPopup agreeText='Опубликовать'
                                                   text='Вы хотите опубликовать этот тест?'
                                                    onAgree={() => publishTest(publishedTestId, publishedTest)}
                                                   onClose={() => setPublishPopupState(false)}/>}
            </Container>

        )
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
    }
};

export default MyTests;