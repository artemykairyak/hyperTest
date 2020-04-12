import Container from "@material-ui/core/Container";
import BeginTestPopup from "../Common/Popups/BeginTestPopup/BeginTestPopup";
import React, {useEffect} from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import styles from './AllTests.module.css'
import generalStyles from '../Common/generalStyles.module.css';
import {Button} from "@material-ui/core";

const AllTests = ({tests, handleTestClick, setDisabledTabs, propsObj, beginPopupState, isLoaded, totalTests, getAllTests, currentPage}) => {
    useEffect(() => {
        console.log('TOTALTESTS', totalTests);
    }, [totalTests])

    let arr = [{id: 1}, {id: 2}];

    let newArr = arr.filter((item) => {
        if(item.id !== 1) {
            return item;
        }
    });

    console.log('newarr', newArr);

    if (isLoaded) {
        return (
            <Container className={styles.container}>
                <Container
                    className={generalStyles.grid}
                >
                    {tests.map((item) => {
                        return <TestCard passed={item.passed} test={item} handleTestClick={handleTestClick}/>
                    })}
                </Container>
                {beginPopupState && <BeginTestPopup setDisabledTabs={setDisabledTabs} propsObj={propsObj}/>}
                {totalTests > tests.length &&
                <Button variant="contained" color="primary" component="span" className={styles.loadBtn}
                        onClick={() => {getAllTests(++currentPage)
                        }}>
                    Загрузить ещё
                </Button>}
            </Container>
        )
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
    }
};

export default AllTests;
