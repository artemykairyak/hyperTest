import React, {useEffect} from "react";
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import TestCard from "../TestCard/TestCard";
import Container from "@material-ui/core/Container";
import styles from './MyTests.module.css'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const MyTests = ({tests, isLoaded, handleTestClick}) => {
    if (isLoaded) {
        return (
            <Container className={styles.container}>
                <Typography className={styles.label}>Неопубликованные</Typography>
                <Divider />
                <Container
                    className={styles.grid}
                >
                    {tests.map(item => {
                        return <TestCard test={item} handleTestClick={handleTestClick}/>
                    })}
                </Container>

            </Container>
        )
    } else {
        return <LoadingPopup topText='Тесты загружаются' bottomText='Пожалуйста, подождите.'/>
    }
};

export default MyTests;