import React, {useEffect, useState} from "react";
import {Button, Container, Input, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {compressFile, generateNewIndex} from "../helpers/helpers";
import {HighlightOff} from '@material-ui/icons';
import {makeStyles} from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {maxVarsLength} from "../../constants";

const AddQuestion = ({
                         test, setAddQuestionPopupState, editedQuestion, editQuestion, setEditedQuestion,
                         addQuestion, questionsWithDeletedResults, setQuestionsWithDeletedResults
                     }) => {
    let [qObj, setQObj] = useState({
        qId: generateNewIndex(test.questions, 'qId'),
        qText: '',
        qPic: null,
        vars: []
    });

    let [qVarsCount, setQVarsCount] = useState([]);
    let [open, setOpen] = React.useState(false);
    let [selectVar, setSelectVar] = React.useState(0);

    const addRes = (qId, varId, resIndex) => {
        console.log('ID', qId, varId, resIndex)
        let newVars = qObj.vars.map(v => {
            if (v.varId === varId) {
                v.res = test.results[resIndex].resId;
                return v;
            } else {
                return v;
            }
        });

        setQObj({...qObj, vars: newVars});

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectVar(0);
    };

    const setQPic = event => {
        getFile(event);
    };

    const addVar = () => {
        if (qVarsCount.length < maxVarsLength) {
            setQVarsCount([...qVarsCount, qVarsCount.length + 1]);
            setQObj({...qObj, vars: [...qObj.vars, {varId: qVarsCount.length, varText: '', res: null}]});
        }
    };

    const getFile = (event) => {
        let fileList = event.target.files;

        compressFile(fileList[0], (result) => {
            updateQObj('qPic', result);
        });
    };

    const deleteQuestionFromSet = (qId) => {
        let newSet = new Set(questionsWithDeletedResults);
        if (questionsWithDeletedResults.has(qId)) {
            newSet.delete(qId);
        }

        setQuestionsWithDeletedResults(newSet);
    };

    const updateVarToQObj = (val, index) => {
        let newVarText = {varId: qObj.vars[index].varId, varText: val, res: qObj.vars[index].res};
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
        setSelectVar(0);
    };

    const validate = () => {
        let correctedInfo = (!!qObj.qText && !!qObj.qPic);
        let correctedVars = qObj.vars.every((item) => {
            return item.varText !== '';
        });

        return (correctedInfo && correctedVars);
    };

    const getResText = (index) => {
        let resText = '';
        test.results.forEach(res => {
            if (res.resId === qObj.vars[index].res) {
                resText = res.resText;
            }
        });

        return resText;
    };

    const returnChecked = (resIndex) => {
        let checked = false;

        for (let i = 0; i < qObj.vars.length; i++) {
            if (qObj.vars[i].varId === selectVar && qObj.vars[i].res === test.results[resIndex].resId) {
                checked = true;
                break;
            }
        }
        return checked;
    };

    useEffect(() => {
        if (editedQuestion) {
            setQObj(editedQuestion);
            let varsCountArr = [];
            editedQuestion.vars.forEach(item => {
                varsCountArr.push(item.varId);
            });
            setQVarsCount(varsCountArr);
        }
    }, []);

    useEffect(() => {
        console.log(qObj)
    }, [qObj]);

    useEffect(() => {
        console.log('SELECT VAR', selectVar)
    }, [selectVar]);

    useEffect(() => {
        console.log('VARCOUNTS', qVarsCount)
    }, [qVarsCount]);

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
                <Container className={styles.rightBtn}>
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
                <Container className={styles.inputContainer}>
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
                    <Button variant="contained" disabled={qVarsCount.length === maxVarsLength} component="span"
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
                            <div className={styles.varResContainer}>
                                <Button className={styles.addResBtn} onClick={() => {
                                    setSelectVar(qObj.vars[index].varId);
                                    handleClickOpen();
                                }}>
                                    {qObj.vars[index].res !== null
                                        ? getResText(index)
                                        : 'Выбрать результат для этого варианта'
                                    }
                                </Button>
                                <Dialog
                                    disableEscapeKeyDown
                                    open={open}
                                    onClose={handleClose}
                                    fullWidth={true}
                                >
                                    <DialogTitle>Выбор результата</DialogTitle>
                                    <DialogContent>
                                        <form className={styles.container}>
                                            <FormControl className={styles.formControl}>
                                                {test.results.map((item, resIndex) => {
                                                    return <FormControlLabel
                                                        control={<Radio
                                                            checked={returnChecked(resIndex)}
                                                            onChange={() => addRes(qObj.qId, selectVar, resIndex)}
                                                            value={item.varId}
                                                            name="res"
                                                        />}
                                                        label={item.resText}
                                                    />
                                                })}
                                                <Typography className={styles.dialogText}>Если не выбрано ничего — ответ
                                                    на этот вопрос не влияет на результат.</Typography>
                                            </FormControl>
                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Закрыть
                                        </Button>
                                        <Button onClick={handleClose} color="primary">
                                            Готово
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
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
                                    if (editedQuestion) {
                                        editQuestion(qObj);
                                        setEditedQuestion(null);
                                    } else {
                                        addQuestion(qObj);
                                    }
                                    if (questionsWithDeletedResults) {
                                        deleteQuestionFromSet(qObj.qId);
                                    }
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
        paddingRight: 25,
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: 5,
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
    },
    varResContainer: {
        textAlign: 'left'
    },
    addResBtn: {
        padding: 0,
        marginTop: 5,
        textAlign: 'left',
        justifyContent: 'flex-start'
    },
    dialogText: {
        marginTop: 15
    }
});

export default AddQuestion;