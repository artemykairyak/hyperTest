import React, {useEffect} from "react";
import {Card, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styles from './ResultPage.module.css';

const ResultPage = ({result, back}) => {

    useEffect(() => {
        console.log('RESULT', result)
    }, [result])

    if (!result) {
        return <p>pizdec</p>
    } else {
        return (
            <Card className={styles.container} elevation={2}>
                <Card className={styles.testCard} elevation={0}>
                    <img className={styles.resImg} src={result.resPic} alt=''/>
                </Card>
                <Typography className={styles.resTitle}>{result.resText}</Typography>
                <Typography className={{marginTop: 15}}>{result.resDesc}</Typography>
                <Button className={styles.backBtn} onClick={() => back()} variant="contained"
                        color="primary">Назад</Button>
            </Card>
        )
    }

};

export default ResultPage;