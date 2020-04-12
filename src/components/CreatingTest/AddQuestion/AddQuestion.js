import React, {useEffect, useState} from "react";
import {Button, Container, Input, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {compressFile, generateNewIndex, lengthValidation} from "../../helpers/helpers";
import {HighlightOff} from '@material-ui/icons';
import  styles from './AddQuestion.module.css';
import generalPopupStyles from '../../Common/Popups/popupGeneralStyles.module.css';
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
import {allowedImageFormats, maxVarsLength, shortInputLength} from "../../../constants";

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
    let [errors, setErrors] = useState(new Set());

    const validateLengthInput = (text, length, fieldName) => {
        let newSet = new Set(errors);

        if (lengthValidation(text, length)) {
            newSet.add(fieldName);
        } else {
            newSet.delete(fieldName);

        }
        setErrors(newSet)
    };

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
            let newId = 0;
            if (qObj.vars.length > 0) {
                newId = qObj.vars[qObj.vars.length - 1].varId + 1
            }
            setQObj({...qObj, vars: [...qObj.vars, {varId: newId, varText: '', res: null}]});
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

    const deleteVar = (index, varId) => {
        let qObjVarsCopy = [...qObj.vars];
        let qVarsCountCopy = [...qVarsCount]
        let newQbjVars = [];
        let newQbjVarsCount = [];
        let newSet = new Set(errors);

        for (let i = 0; i < qObjVarsCopy.length; i++) {
            console.log('i', qObjVarsCopy[i].varId)
            if (qObjVarsCopy[i].varId !== varId) {
                newQbjVars.push(qObjVarsCopy[i]);
                newQbjVarsCount.push(qVarsCountCopy[i]);
            }
        }
        setQVarsCount(newQbjVarsCount);
        setQObj({...qObj, vars: newQbjVars});
        setSelectVar(0);
        newSet.delete(varId);
        setErrors(newSet);
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

    useEffect(() => {
        console.log('errors', errors);
    }, [errors]);

    return (
        <Card className={[generalPopupStyles.popup, styles.popup]} raised>
            <CloseIcon className={styles.close}
                       fontSize="large"
                       onClick={() => setAddQuestionPopupState(false)}/>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Картинка:</Typography>
                </Container>
                <Container className={styles.rightBtn}>
                    <input
                        accept={allowedImageFormats}
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
                        onChange={(event) => {
                            updateQObj('qText', event.target.value);
                            validateLengthInput(event.target.value, shortInputLength, 'qText');
                        }}
                        error={errors.has('qText')}
                        value={qObj.qText}
                        className={styles.input}
                    />
                    {errors.has('qText') && <Typography className={styles.errorText}>Слишком длинный текст</Typography>}
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Варианты ответа:</Typography>
                </Container>
                <Container className={[styles.rightBtn, styles.cover]}>
                    <Button variant="contained" color="primary" disabled={qVarsCount.length === maxVarsLength} component="span"
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
                                onChange={(event) => {
                                    updateVarToQObj(event.target.value, index);
                                    validateLengthInput(event.target.value, shortInputLength, qObj.vars[index].varId);
                                }}
                                error={errors.has(qObj.vars[index].varId)}
                                value={qObj.vars[index].varText}
                                placeholder="Введите вариант ответа"
                                className={[styles.input]}
                            /><HighlightOff className={styles.deleteIcon}
                                            onClick={() => deleteVar(index, qObj.vars[index].varId)}/>
                            {errors.has(qObj.vars[index].varId) &&
                            <Typography className={styles.errorText}>Слишком длинный вопрос</Typography>}
                            <div className={styles.varResContainer}>
                                <Button className={[styles.addResBtn, qObj.vars[index].res !== null && styles.addResBtnWithVar]} onClick={() => {
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
                <Container className={[styles.rightBtn, styles.goBtn]}>
                    <Button variant="contained"
                            disabled={!validate() || qVarsCount.length === 0 || errors.size > 0}
                            component="span"
                            color={validate() ? 'primary' : 'secondary'}
                            className={styles.btn}
                            onClick={() => {
                                if (validate() && errors.size === 0) {
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
                        {validate() ? (errors.size === 0 ? 'Готово' : 'Присутствуют ошибки') : 'Не все поля заполнены'}
                    </Button>
                </Container>
            </Container>
        </Card>
    )
};

export default AddQuestion;