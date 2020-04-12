import React from "react";
import Container from "@material-ui/core/Container";
import styles from './LoadingPopup.module.css';
import Card from "@material-ui/core/Card";
import Preloader from "../../Preloader";
import Typography from "@material-ui/core/Typography";
import popupGeneralStyles from "../popupGeneralStyles.module.css";

const LoadingPopup = ({topText, bottomText}) => {
    return <Container className={popupGeneralStyles.container}>
        <Card className={[popupGeneralStyles.popup, styles.popup]}>
            <Container className={styles.labelsContainer}>
                <Container className={styles.preloader}>
                    <Preloader  />
                </Container>
                <Typography className={[styles.text, styles.topLabel]}>{topText}</Typography>
                <Typography className={[styles.text, styles.bottomLabel]}>{bottomText}</Typography>
            </Container>
        </Card>
    </Container>
};

export default LoadingPopup;