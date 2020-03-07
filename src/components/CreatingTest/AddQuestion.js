import React, {useEffect, useState} from "react";
import {Button, Container, Input, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {convertToBase64} from "../helpers/helpers";
import {HighlightOff} from '@material-ui/icons';
import {makeStyles} from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";

const AddQuestion = ({test, setAddQuestionPopupState, addQuestion}) => {

    let [qObj, setQObj] = useState({
        qId: test.questions.length + 1,
        qText: '',
        qPic: null,
        vars: []
    });
    let [qVarsCount, setQVarsCount] = useState([]);

    const setQPic = event => {
        getFile(event);
    };

    const addVar = () => {
        if (qVarsCount.length < 5) {
            setQVarsCount([...qVarsCount, qVarsCount.length + 1]);
            setQObj({...qObj, vars: [...qObj.vars, {varId: qVarsCount.length, varText: '', res: null}]});
        }
    };

    const getFile = (event) => {
        let fileList = event.target.files;

        convertToBase64(fileList[0], (result) => {
            updateQObj('qPic', result);
        });
    };

    const updateVarToQObj = (val, index) => {
        let newVarText = {varId: index, varText: val, res: null};
        let qObjVarsCopy = [...qObj.vars];

        for (let i = 0; i < qObjVarsCopy.length; i++) {
            if (i !== index) continue;
            qObjVarsCopy[i] = newVarText;
        }

        setQObj({...qObj, vars: qObjVarsCopy});
    };

    const updateQObj = (field, val) => {
        if (field === 'qText') {
            setQObj({...qObj, qText: val});
        }

        if (field === 'qPic') {
            setQObj({...qObj, qPic: val});
        }
    };

    const deleteVar = (index) => {
        let qObjVarsCopy = [...qObj.vars];
        let qVarsCountCopy = [...qVarsCount]
        let newQbjVars = [];
        let newQbjVarsCount = [];

        for (let i = 0; i < qObjVarsCopy.length; i++) {
            if (i !== index) {
                newQbjVars.push(qObjVarsCopy[i]);
                newQbjVarsCount.push(qVarsCountCopy[i]);
            }
        }

        setQVarsCount(newQbjVarsCount);
        setQObj({...qObj, vars: newQbjVars});
    };

    const validate = () => {
        let correctedInfo = (!!qObj.qText && !!qObj.qPic);
        let correctedVars = qObj.vars.every((item) => {
            return item.varText !== '';
        });

        return (correctedInfo && correctedVars);
    };

    useEffect(() => {
        console.log(qObj)
    }, [qObj]);

    const styles = useStyles();

    return (
        <Card className={styles.popup} raised>
            <CloseIcon className={styles.close}
                       fontSize="large"
                       onClick={() => setAddQuestionPopupState(false)}/>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Картинка:</Typography>
                </Container>
                <Container className={[styles.rightBtn, styles.cover]}>
                    <input
                        accept="image/*"
                        className={styles.addCoverInput}
                        multiple
                        type="file"
                        id="varPic"
                        onChange={(event) => setQPic(event)}
                    />
                    <label htmlFor="varPic">
                        <Button variant="contained" component="span" className={styles.btn}>
                            Загрузить
                        </Button>
                    </label>
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography> </Typography>
                </Container>
                <Container className={styles.coverImgContainer}>
                    <PhotoCameraIcon fontSize='large' className={styles.photoIcon}/>
                    <img className={styles.coverImg} src={qObj.qPic} alt={qObj.qText}/>
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Вопрос:</Typography>
                </Container>
                <Container className={[styles.inputContainer]}>
                    <TextField
                        placeholder="Текст вопроса"
                        onChange={(event) => updateQObj('qText', event.target.value)}
                        value={qObj.qText}
                        className={styles.input}
                    />
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Варианты ответа:</Typography>
                </Container>
                <Container className={[styles.rightBtn, styles.cover]}>
                    <Button variant="contained" disabled={qVarsCount.length === 5} component="span"
                            className={styles.btn}
                            onClick={() => addVar()}>
                        Добавить
                    </Button>
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography> </Typography>
                </Container>
                <Container className={styles.vars}>
                    {qVarsCount.map((count, index) => {
                        return <Container className={[styles.inputContainer, styles.varInputContainer]} key={index}>
                            <Input
                                onChange={(event) => updateVarToQObj(event.target.value, index)}
                                value={qObj.vars[index].varText}
                                placeholder="Введите вариант ответа"
                                className={[styles.input]}
                            /><HighlightOff className={styles.deleteIcon}
                                            onClick={() => deleteVar(index)}/>
                        </Container>
                    })}
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography> </Typography>
                </Container>
                <Container className={[styles.rightBtn]}>
                    <Button variant="contained"
                            disabled={qVarsCount.length === 0}
                            component="span"
                            color={validate() ? 'primary' : 'secondary'}
                            className={styles.btn}
                            onClick={() => {
                                if (validate()) {
                                    addQuestion(qObj);
                                    setAddQuestionPopupState(false);
                                }
                            }
                            }>
                        {validate() ? 'Готово' : 'Не все поля заполнены'}
                    </Button>
                </Container>
            </Container>
        </Card>
    )
}

var useStyles = makeStyles({
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
    rightBtn: {
        padding: 0,
        display: 'flex',
        marginLeft: 15
    },
    addCoverInput: {
        display: 'none'
    },
    btn: {
        width: 300
    },
    cover: {
        padding: 0,
    },
    inputContainer: {
        padding: 0,
        marginLeft: 15,
        position: 'relative'
    },
    coverImgContainer: {
        height: 200,
        width: '100%',
        padding: 0,
        marginLeft: 15,
        position: 'relative'
    },
    photoIcon: {
        color: 'gray',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -1
    },
    coverImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    vars: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0
    },
    input: {
        width: '100%',
        padding: 0,
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#c62828',
        cursor: 'pointer'
    },
    varInputContainer: {
        marginTop: 15
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        cursor: 'pointer',

    }
});

export default AddQuestion;