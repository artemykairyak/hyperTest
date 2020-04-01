import Container from "@material-ui/core/Container";
import BeginTestPopup from "../Common/Popups/BeginTestPopup/BeginTestPopup";
import React from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import styles from './AllTests.module.css'

const AllTests = ({tests, handleTestClick, setDisabledTabs, propsObj, beginPopupState, isLoaded}) => {
    if (isLoaded) {
        return (
            <>
                <Container
                    className={styles.grid}
                >
                    {tests.map((item) => {
                        return <TestCard test={item} handleTestClick={handleTestClick}/>
                    })}
                </Container>
                {beginPopupState && <BeginTestPopup setDisabledTabs={setDisabledTabs} propsObj={propsObj}/>}
            </>
        )
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
    }
};

export default AllTests;
