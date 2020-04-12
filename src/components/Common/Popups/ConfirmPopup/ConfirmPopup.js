import React from "react";
import Container from "@material-ui/core/Container";
import styles from './ConfirmPopup.module.css';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import popupGeneralStyles from "../popupGeneralStyles.module.css";

const ConfirmPopup = ({text, onAgree, onClose, closeText='Закрыть', agreeText, additionalText}) => {
    return <Container className={popupGeneralStyles.container}>
        <Card className={popupGeneralStyles.popup}>
            <Container className={styles.labelsContainer}>
                <Typography className={[styles.text, styles.topLabel]}>{text}</Typography>
                {additionalText && <Typography className={[styles.text, styles.bottomLabel]}>{additionalText}</Typography>}
            </Container>
            <Container className={styles.buttonsContainer}>
                <Button className={[styles.btn, styles.closeBtn]} variant="contained" color="primary" onClick={() => onClose()}>
                    <Typography>{closeText}</Typography>
                </Button>
                <Button className={[styles.btn, styles.agreeBtn]} variant="contained" color="secondary" onClick={() => onAgree()}>
                    <Typography>{agreeText}</Typography>
                </Button>
            </Container>

        </Card>
    </Container>
};

export default ConfirmPopup;