import React from "react";
import Container from "@material-ui/core/Container";
import styles from './BeginTestPopup.module.css';
import popupGeneralStyles from '../popupGeneralStyles.module.css'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

const BeginTestPopup = ({propsObj, setDisabledTabs}) => {
    let {picture, title, description, price, creator, beginTestFunc, setBeginPopupState} = propsObj;
    return <Container className={popupGeneralStyles.container} onClick={(e) => setBeginPopupState(false)}>
        <Card className={popupGeneralStyles.popup} onClick={(e) => e.stopPropagation()}>
            <CloseIcon className={styles.close} onClick={() => setBeginPopupState(false)}/>
            <Container className={styles.testPicContainer}>
                <img className={styles.testPic} src={picture} alt={title}/>
            </Container>
            <Container className={styles.labelsContainer}>
                <Typography className={styles.title}>{title}</Typography>
                <Typography className={styles.desc}>{description}</Typography>
            </Container>
            <Container className={styles.beginBtn}>
                <Button variant="contained" color="primary" onClick={() => {setDisabledTabs([0, 1, 2]); beginTestFunc()}}>
                    <Typography>Начать тест</Typography>
                </Button>
            </Container>
            <Typography className={styles.price}>Стоимость: {price} монеток</Typography>
            <Typography className={styles.author}>Автор: {creator}</Typography>
        </Card>
    </Container>
};

export default BeginTestPopup;