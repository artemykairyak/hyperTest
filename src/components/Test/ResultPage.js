import React from "react";
import {Card, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ResultPage = ({result, back}) => {
    return (
        <Card style={styles.container} elevation={2}>
            <Card style={styles.testCard} elevation={0}>
                <img style={styles.resImg} src={result.resPic} alt=''/>
            </Card>
            <Typography style={styles.resTitle}>{result.resText}</Typography>
            <Typography style={{marginTop: 15}}>{result.resDesc}</Typography>
            <Button style={styles.backBtn} onClick={() => back()} variant="contained" color="primary">Назад</Button>
        </Card>
    )
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
        flexDirection: 'column'
    },
    testCard: {
        height: 350,
        margin: '15px auto 15px',
    },
    resImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    backBtn: {
        width: 150,
        marginTop: 40,
        marginBottom: 20
    },
    resTitle: {
        fontWeight: 'bold'
    }
};

export default ResultPage;