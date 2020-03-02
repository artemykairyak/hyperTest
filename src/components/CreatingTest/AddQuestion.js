import React from "react";
import {Button, Container, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const AddQuestion = ({setQuestionPic}) => {
    return (
        <Card style={styles.popup}>
            <Container style={styles.row}>
                <Container style={styles.left}>
                    <Typography>Картинка:</Typography>
                </Container>
                <Container style={styles.cover}>
                    <input
                        accept="image/*"
                        style={styles.addCoverInput}
                        multiple
                        type="file"
                        id="testCover"
                        onChange={() => 0}
                    />
                    <label htmlFor="testCover">
                        <Button variant="contained" component="span" style={styles.addCoverBtn}>
                            Загрузить
                        </Button>
                    </label>
                </Container>
            </Container>
        </Card>
    )
}

const styles = {
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
        zIndex: 10
    },
    row: {
        display: 'flex',
        margin: '20px auto',
        position: 'relative',
        overflow: 'visible'
    },
    left: {

        display: 'flex',
        width: 350,
        justifyContent: 'flex-end',
        padding: 0
    },
    addCoverInput: {
        display: 'none'
    },
    cover: {
        padding: 0
    },
    coverImgContainer: {
        height: 200,
        width: '100%',
        padding: 0
    },
    coverImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
}

export default AddQuestion;