import React from "react";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ResultPage = ({result}) => {
    return (
        <Card style={styles.container} elevation={2}>
            <Card style={styles.testCard}>
                <img style={styles.questionImg} src={result.resPic} alt=''/>
            </Card>
            <Typography>{result.resText}</Typography>
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
        width: '85%',
        height: 350,
        margin: '15px auto 15px',
    },
    questionImg: {
        display: 'inline-block',
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        objectPosition: 'center'
    },
}

export default ResultPage;