import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    Container,
    Typography,
    Radio,
    Button,
    Input,
    IconButton,
    Divider,
    ListItemText,
    ListItem,
    List
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddQuestion from "./AddQuestion";
import {compressFile, cropText, lengthValidation} from '../helpers/helpers';
import AddResult from "./AddResult";
import DeleteResultPopup from "./DeleteResultPopup";
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {allowedImageFormats, maxQuestionsLength, shortInputLength, standardInputLength} from "../../constants";
import TextField from "@material-ui/core/TextField";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";

const CreatingTest = ({
                          addGender,
                          test,
                          addTitle,
                          addPicture,
                          deleteQuestion,
                          editQuestion,
                          deleteResult,
                          addQuestion,
                          addResult,
                          validation,
                          isCorrect,
                          editResult,
                          createTest,
                          addDescription,
                          questionsWithDeletedResults,
                          setQuestionsWithDeletedResults,
                          token,
                          testEditMode,
                          publishMyEditedTest
                      }) => {
    let [gender, setLocalGender] = useState(0);
    let [addQuestionPopupState, setAddQuestionPopupState] = useState(false);
    let [addResultPopupState, setAddResultPopupState] = useState(false);
    let [deleteResultPopup, setDeleteResultPopup] = useState(false);
    let [selectedResult, setSelectedResult] = useState(null);
    let [editedQuestion, setEditedQuestion] = useState(null);
    let [editedResult, setEditedResult] = useState(null);
    let [correct, setCorrect] = useState(true);
    let [creating, setCreating] = useState(false);
    let [errors, setErrors] = useState(new Set());

    const setGender = (val) => {
        setLocalGender(val);
        addGender(gender)
    };

    const creatingTest = (test) => {
        setCreating(true);
        createTest(test, token);
    };

    const getFile = (event, mode) => {
        let fileList = event.target.files;

        if(fileList.length) {
            compressFile(fileList[0], (result) => {
                let newSet = new Set(errors);
                !result ? newSet.add('picture') : newSet.delete('picture');
                setErrors(newSet);
                if (mode === 'testPic') {
                    addPicture(result);
                }

                if (mode === 'questiontPic') {
                    addPicture(result);
                }
            })
        }


    };


    const setTestPic = event => {
        getFile(event, 'testPic');
    };

    useEffect(() => {
        console.log(test);
    }, [test])

    useEffect(() => {
        console.log('editedQ', editedQuestion);
    }, [editedQuestion]);

    useEffect(() => {
        console.log('editedRES', editedResult);
    }, [editedResult])

    useEffect(() => {
        console.log('ERRORS', errors, errors.size);
    }, [errors])

    const useStyles = makeStyles({
        tooltip: {
            fontSize: 16
        },
    });

    const readyButton = makeStyles({
        root: {
            backgroundColor: '#2E7D32',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#1B5E20',
                borderColor: '#0062cc',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: '#1B5E20',
                borderColor: '#1B5E20',
            },
        },
    });

    const validateLengthInput = (text, length, fieldName) => {
        let newSet = new Set(errors);

        if(lengthValidation(text, length)) {
            newSet.add(fieldName);
        }
        else {
            newSet.delete(fieldName);

        }
        setErrors(newSet)
    };

    const checkCorrect = () => {
        if (isCorrect()) {
            setCorrect(true);
            return true
        } else {
            setCorrect(false);
            return false
        }
    };

    const toolTipClasses = useStyles();
    const buttonClasses = readyButton();

    return (
        <Box>
            {addQuestionPopupState && <AddQuestion setAddQuestionPopupState={setAddQuestionPopupState}
                                                   addQuestion={addQuestion}
                                                   editedQuestion={editedQuestion}
                                                   setEditedQuestion={setEditedQuestion}
                                                   editQuestion={editQuestion}
                                                   test={test}
                                                   questionsWithDeletedResults={questionsWithDeletedResults}
                                                   setQuestionsWithDeletedResults={setQuestionsWithDeletedResults}
            />
            }
            {addResultPopupState && <AddResult setAddResultPopupState={setAddResultPopupState}
                                               addResult={addResult}
                                               editedResult={editedResult}
                                               setEditedResult={setEditedResult}
                                               test={test}
                                               editResult={editResult}
            />
            }
            {deleteResultPopup && <DeleteResultPopup setDeleteResultPopup={setDeleteResultPopup}
                                                     deleteResult={deleteResult}
                                                     selectedResult={selectedResult}/>}
            {creating && <LoadingPopup topText='Ваш тест создаётся.' bottomText='Пожалуйста, подождите.'/>}

            <Card style={styles.container} elevation={2}>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Кто может пройти тест:</Typography>
                    </Container>
                    <Container style={styles.gender}>
                        <Container style={styles.radioCardContainer}>
                            <Button style={styles.radioCard} onClick={() => {
                                setGender(0)
                            }}>
                                <Radio
                                    checked={gender === 0}
                                    value={0}
                                    name="gender"
                                />
                                <Typography>Все</Typography>
                            </Button>
                        </Container>
                        <Container style={styles.radioCardContainer}>
                            <Button style={styles.radioCard} onClick={() => {
                                setGender(1)
                            }}>
                                <Radio
                                    checked={gender === 1}
                                    value={1}
                                    name="gender"
                                />
                                <Typography>Мужчины</Typography>
                            </Button>
                        </Container>
                        <Container style={styles.radioCardContainer}>
                            <Button style={styles.radioCard} onClick={() => {
                                setGender(2)
                            }}>
                                <Radio
                                    checked={gender === 2}
                                    value={2}
                                    name="gender"
                                />
                                <Typography>Женщины</Typography>
                            </Button>
                        </Container>
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Название:</Typography>
                    </Container>
                    <Container style={styles.title}>
                        <TextField
                            placeholder="Название теста"
                            onChange={(event) => {addTitle(event.target.value);
                                validateLengthInput(event.target.value, shortInputLength, 'title')
                            }}
                            value={test.title}
                            style={styles.input}
                            error={errors.has('title')}
                        />
                        {errors.has('title') && <Typography style={styles.errorText}>Слишком длинное название</Typography>}
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Описание:</Typography>
                    </Container>
                    <Container style={styles.title}>
                        <TextField
                            multiline={true}
                            placeholder="Описание теста"
                            onChange={(event) => {
                                addDescription(event.target.value);
                                validateLengthInput(event.target.value, standardInputLength, 'description');
                            }}
                            value={test.description}
                            style={styles.input}
                            rows={5}
                            error={errors.has('description')}
                        />
                        {errors.has('description') && <Typography style={styles.errorText}>Слишком длинное описание</Typography>}
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Обложка:</Typography>
                    </Container>
                    <Container style={styles.cover}>
                        <input
                            accept={allowedImageFormats}
                            style={styles.addCoverInput}
                            multiple
                            type="file"
                            id="testCover"
                            onChange={setTestPic}
                        />
                        <label htmlFor="testCover">
                            <Button variant="contained" component="span" style={styles.addCoverBtn}>
                                Загрузить
                            </Button>
                        </label>
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography> </Typography>
                    </Container>
                    <Container style={styles.coverImgContainer}>
                        <PhotoCameraIcon fontSize='large' style={styles.photoIcon}/>
                        <img style={styles.coverImg} src={test.picture} alt=""/>
                        {errors.has('picture') && <Typography style={styles.errorText}>Некорректное изображение</Typography>}
                    </Container>
                </Container>
                <Container>
                    <Typography style={styles.resultsTitle}>Список результатов</Typography>
                </Container>
                <Container style={styles.results}>
                    {test.results.map((item, index) => {
                        return <Card key={index} style={styles.row}>
                            <IconButton aria-label="edit" onClick={() => {
                                setEditedResult(item);
                                setAddResultPopupState(true);
                            }} style={styles.editIcon}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => {
                                setSelectedResult(item.resId);
                                setDeleteResultPopup(true);
                            }} style={styles.deleteIcon}>
                                <DeleteIcon/>
                            </IconButton>
                            <Container style={styles.resLeft}>
                                <Container style={styles.resultImgContainer}>
                                    <img style={styles.resultImg} src={item.resPic} alt=''/>
                                </Container>
                            </Container>
                            <Container style={styles.resInfo}>
                                <Typography style={styles.resultText}>{item.resText}</Typography>
                                <Typography>{cropText(item.resDesc, 255)}</Typography>
                            </Container>
                        </Card>
                    })}
                </Container>
                <Container>
                    <Button variant="contained" color="primary" component="span" style={styles.addQuestionBtn}
                            onClick={() => setAddResultPopupState(true)}>
                        Добавить результат
                    </Button>
                </Container>
                <Container style={styles.questionsTitle}>
                    <Typography style={styles.questionsText}>Список вопросов</Typography>
                </Container>
                <Container style={styles.questions}>
                    {test.questions.map((item, index) => {
                        return <Card key={index} style={styles.row}>
                            <IconButton aria-label="edit" onClick={() => {
                                setEditedQuestion(item);
                                setAddQuestionPopupState(true);
                            }} style={styles.editIcon}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => {
                                deleteQuestion(index)
                            }} style={styles.deleteIcon}>
                                <DeleteIcon/>
                            </IconButton>
                            <Container style={styles.left}>
                                <Container style={styles.questionImgContainer}>
                                    <img style={styles.questionImg} src={item.qPic} alt=''/>
                                </Container>
                            </Container>
                            <Container style={styles.varInfo}>
                                <Typography style={styles.qTitle}>{item.qText}</Typography>
                                <List style={styles.vars}>
                                    {item.vars.map((variant, index) => {
                                        return <React.Fragment key={index}><ListItem>
                                            <ListItemText primary={variant.varText}/>
                                        </ListItem>{index !== (item.vars.length - 1) && <Divider/>}
                                        </React.Fragment>
                                    })}
                                </List>
                            </Container>
                            {questionsWithDeletedResults && questionsWithDeletedResults.has(item.qId) &&
                            <Tooltip title="Есть обнулённые результаты"
                                     classes={toolTipClasses}
                                     style={styles.isDeletedIcon}>
                                <ErrorIcon aria-label="error">
                                    <DeleteIcon/>
                                </ErrorIcon>
                            </Tooltip>
                            }
                        </Card>
                    })}
                </Container>
                <Container>
                    <Button variant="contained"
                            color="primary"
                            component="span"
                            style={styles.addQuestionBtn}
                            disabled={test.questions.length >= maxQuestionsLength}
                            onClick={() => setAddQuestionPopupState(true)}>
                        {test.questions.length >= maxQuestionsLength ? 'Вы добавили максимальное количество вопросов' : 'Добавить вопрос'}
                    </Button>
                </Container>
                <Container>
                    {!correct &&
                    <Typography style={styles.correctError}>Слишком много неназначенных результатов!</Typography>}
                    <Button variant="contained"
                            classes={buttonClasses}
                            size='large'
                            component="span"
                            disabled={!validation() || errors.size > 0}
                            style={styles.addQuestionBtn}
                            onClick={() => {
                                if (checkCorrect() && validation() && errors.size === 0) {
                                    setCreating(true);
                                    if(testEditMode) {
                                        publishMyEditedTest(test.id, test);
                                    } else {
                                        creatingTest(test);
                                    }
                                }
                            }}>
                        {testEditMode ? 'Сохранить тест' : 'Создать тест'}
                    </Button>
                </Container>
            </Card>
        </Box>
    )
};

const styles = {
    container: {
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        margin: '20px auto',
        position: 'relative',
        overflow: 'visible',
        paddingTop: 15,
        paddingBottom: 15,
    },
    left: {
        display: 'flex',
        width: 350,
        justifyContent: 'flex-end',
        padding: 0
    },
    resLeft: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0
    },
    gender: {
        display: 'flex',
        padding: 0
    },
    title: {
        padding: 0
    },
    radioCardContainer: {
        padding: 0,
        width: '60%',
        display: 'flex',
        justifyContent: 'center'
    },
    radioCard: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        borderRadius: 0
    },
    input: {
        width: '100%',
        marginLeft: 20
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
        padding: 0,
        position: 'relative'
    },
    coverImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'relative',
        zIndex: 2
    },
    photoIcon: {
        color: 'gray',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
    },
    questionImgContainer: {
        height: 200,
        width: '100%',
    },
    resultImgContainer: {
        height: 200,
        width: '100%',
    },
    resultsTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 18
    },
    questionsText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 18
    },
    questionImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    resultImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    resultText: {
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 18
    },
    varInfo: {
        textAlign: 'left',
        padding: 0
    },
    addQuestionBtn: {
        marginBottom: 20
    },
    resInfo: {
        textAlign: 'left',
        padding: 0
    },
    qTitle: {
        borderBottom: '1px solid gray',
        paddingBottom: 5,
        marginBottom: 10,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    vars: {
        padding: 0
    },
    editIcon: {
        position: 'absolute',
        right: 40,
        top: 0,
        transform: 'translate(50%, -40%)',
        zIndex: 5
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translate(50%, -40%)',
        zIndex: 5
    },
    isDeletedIcon: {
        color: '#d32f2f',
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    isDeletedMessage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: 'red',
        fontWeight: 'bold'
    },
    correctError: {
        color: '#d32f2f',
        fontWeight: 'bold',
        marginBottom: 15
    },
    errorText: {
        color: '#d32f2f',
        textAlign: 'left',
        paddingLeft: 18,
        paddingTop: 5
    }

};

export default CreatingTest;