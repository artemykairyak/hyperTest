import React, {useEffect, useState} from "react";
import {Button, Checkbox, Container, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {convertToBase64} from "../helpers/helpers";
import {makeStyles} from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
import {addResultToVar} from "../../redux/reducers/testReducer";
import Radio from "@material-ui/core/Radio";

const AddResult = ({test, setAddQuestionPopupState, addResultToVar}) => {

    let [resObj, setResObj] = useState({
        resId: test.results.length + 1,
        resText: '',
        resPic: null
    });
    // let [qVarsCount, setQVarsCount] = useState([]);

    const setResPic = event => {
        getFile(event);
    };

    const addRes = (qId, varId) => {
        // test.questions[qId].vars.map((item, index) => {
        //     if (index === varId) {
        //         item.res = resObj.resId;
        //         console.log(item)
        //     }
        // console.log(qId, varId)
        //console.log(test.questions[qId].vars[varId].res);
        // for (let i = 0; i < test.questions[qId].vars.length; i++) {
            // console.log(test.questions[qId].vars[i].res)

            if(test.questions[qId].vars.some((item) => {
                return item.res !== resObj.resId;
            })) {
                addResultToVar(qId, varId, resObj.resId)
            }
            // if (test.questions[qId].vars[i].res === resObj.resId) {
            //     console.log('if')
            //     break;
            // } else {
            //     addResultToVar(qId, varId, resObj.resId);
            // }
        // }
    };

    const getFile = (event) => {
        let fileList = event.target.files;

        convertToBase64(fileList[0], (result) => {
            updateResObj('resPic', result);
        });
    };

    // const updateVarToQObj = (val, index) => {
    //     let newVarText = {varId: index, varText: val, res: null};
    //     let qObjVarsCopy = [...qObj.vars];
    //
    //     for (let i = 0; i < qObjVarsCopy.length; i++) {
    //         if (i !== index) continue;
    //         qObjVarsCopy[i] = newVarText;
    //     }
    //
    //     setQObj({...qObj, vars: qObjVarsCopy});
    // };

    const updateResObj = (field, val) => {
        if (field === 'resText') {
            setResObj({...resObj, resText: val});
        }

        if (field === 'resPic') {
            setResObj({...resObj, resPic: val});
        }
    };

    // const deleteVar = (index) => {
    //     let qObjVarsCopy = [...qObj.vars];
    //     let qVarsCountCopy = [...qVarsCount]
    //     let newQbjVars = [];
    //     let newQbjVarsCount = [];
    //
    //     for (let i = 0; i < qObjVarsCopy.length; i++) {
    //         if (i !== index) {
    //             newQbjVars.push(qObjVarsCopy[i]);
    //             newQbjVarsCount.push(qVarsCountCopy[i]);
    //         }
    //     }
    //
    //     setQVarsCount(newQbjVarsCount);
    //     setQObj({...qObj, vars: newQbjVars});
    // };
    //
    // const validate = () => {
    //     let correctedInfo = (!!qObj.qText && !!qObj.qPic);
    //     let correctedVars = qObj.vars.every((item) => {
    //         return item.varText !== '';
    //     });
    //
    //     return (correctedInfo && correctedVars);
    // };

    useEffect(() => {
        console.log(resObj)
    }, [resObj]);

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
                        onChange={(event) => setResPic(event)}
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
                    <img className={styles.coverImg} src={resObj.resPic} alt={resObj.resText}/>
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Текст:</Typography>
                </Container>
                <Container className={[styles.inputContainer]}>
                    <TextField
                        multiline={true}
                        placeholder="Описание результата"
                        onChange={(event) => updateResObj('resText', event.target.value)}
                        value={resObj.qText}
                        className={styles.input}
                        rows={5}
                    />
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Выбор ответов:</Typography>
                </Container>
                <Container className={[styles.inputContainer]}>
                    {test.questions.map((item, index) => {
                        return <Container>
                            <Typography>{item.qText}</Typography>
                            <Container>
                                {item.vars.map((v, i) => {
                                    return <Button style={styles.radioCard} onClick={() => {
                                            addRes(item.qId, v.varId)
                                    }}>
                                        <Radio
                                            checked={resObj.resId === v.res}

                                            // value={v.varId}
                                            name=""
                                        />
                                        <Typography>{v.varText}</Typography>
                                    </Button>
                                })}
                            </Container>

                        </Container>
                    })}

                </Container>
            </Container>
            {/*<Container className={styles.row}>*/}
            {/*    <Container className={styles.left}>*/}
            {/*        <Typography>Варианты ответа:</Typography>*/}
            {/*    </Container>*/}
            {/*    <Container className={[styles.rightBtn, styles.cover]}>*/}
            {/*        <Button variant="contained" disabled={qVarsCount.length === 5} component="span"*/}
            {/*                className={styles.btn}*/}
            {/*                onClick={() => addVar()}>*/}
            {/*            Добавить*/}
            {/*        </Button>*/}
            {/*    </Container>*/}
            {/*</Container>*/}
            {/*<Container className={styles.row}>*/}
            {/*    <Container className={styles.left}>*/}
            {/*        <Typography> </Typography>*/}
            {/*    </Container>*/}
            {/*    <Container className={styles.vars}>*/}
            {/*        {qVarsCount.map((count, index) => {*/}
            {/*            return <Container className={[styles.inputContainer, styles.varInputContainer]} key={index}>*/}
            {/*                <Input*/}
            {/*                    onChange={(event) => updateVarToQObj(event.target.value, index)}*/}
            {/*                    value={qObj.vars[index].varText}*/}
            {/*                    placeholder="Введите вариант ответа"*/}
            {/*                    className={[styles.input]}*/}
            {/*                /><HighlightOff className={styles.deleteIcon}*/}
            {/*                                onClick={() => deleteVar(index)}/>*/}
            {/*            </Container>*/}
            {/*        })}*/}
            {/*    </Container>*/}
            {/*</Container>*/}
            {/*<Container className={styles.row}>*/}
            {/*    <Container className={styles.left}>*/}
            {/*        <Typography> </Typography>*/}
            {/*    </Container>*/}
            {/*    <Container className={[styles.rightBtn]}>*/}
            {/*        <Button variant="contained"*/}
            {/*                disabled={qVarsCount.length === 0}*/}
            {/*                component="span"*/}
            {/*                color={validate() ? 'primary' : 'secondary'}*/}
            {/*                className={styles.btn}*/}
            {/*                onClick={() => {*/}
            {/*                    if (validate()) {*/}
            {/*                        addQuestion(qObj);*/}
            {/*                        setAddQuestionPopupState(false);*/}
            {/*                    }*/}
            {/*                }*/}
            {/*                }>*/}
            {/*            {validate() ? 'Готово' : 'Не все поля заполнены'}*/}
            {/*        </Button>*/}
            {/*    </Container>*/}
            {/*</Container>*/}
        </Card>
    )
}

var useStyles = makeStyles({
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
        zIndex: 10,
        overflow: 'auto',
        maxHeight: '100vh'
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

export default AddResult;