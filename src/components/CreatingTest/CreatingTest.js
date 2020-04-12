import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    Container,
    Typography,
    Radio,
    Button,
    IconButton,
    Divider,
    ListItemText,
    ListItem,
    List
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddQuestion from "./AddQuestion/AddQuestion";
import {compressFile, cropText, lengthValidation} from '../helpers/helpers';
import AddResult from "./AddResult/AddResult";
import DeleteResultPopup from "./DeleteResultPopup";
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {allowedImageFormats, maxQuestionsLength, shortInputLength, standardInputLength} from "../../constants";
import TextField from "@material-ui/core/TextField";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LoadingPopup from "../Common/Popups/LoadingPopup/LoadingPopup";
import styles from './CreatingTest.module.css';

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

        if (fileList.length) {
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

        if (lengthValidation(text, length)) {
            newSet.add(fieldName);
        } else {
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
        <>
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

            <Card className={styles.container} elevation={2}>
                <Container className={styles.row}>
                    <Container className={styles.left}>
                        <Typography>Кто может пройти тест:</Typography>
                    </Container>
                    <Container className={styles.gender}>
                        <Container className={styles.radioCardContainer}>
                            <Button className={styles.radioCard} onClick={() => {
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
                        <Container className={styles.radioCardContainer}>
                            <Button className={styles.radioCard} onClick={() => {
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
                        <Container className={styles.radioCardContainer}>
                            <Button className={styles.radioCard}
                                    onClick={() => {
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
                <Container className={styles.row}>
                    <Container className={styles.left}>
                        <Typography>Название:</Typography>
                    </Container>
                    <Container className={styles.title}>
                        <TextField
                            placeholder="Название теста"
                            onChange={(event) => {
                                addTitle(event.target.value);
                                validateLengthInput(event.target.value, shortInputLength, 'title')
                            }}
                            value={test.title}
                            className={styles.input}
                            error={errors.has('title')}
                        />
                        {errors.has('title') &&
                        <Typography className={styles.errorText}>Слишком длинное название</Typography>}
                    </Container>
                </Container>
                <Container className={styles.row}>
                    <Container className={styles.left}>
                        <Typography>Описание:</Typography>
                    </Container>
                    <Container className={styles.title}>
                        <TextField
                            multiline={true}
                            placeholder="Описание теста"
                            onChange={(event) => {
                                addDescription(event.target.value);
                                validateLengthInput(event.target.value, standardInputLength, 'description');
                            }}
                            value={test.description}
                            className={styles.input}
                            rows={5}
                            error={errors.has('description')}
                        />
                        {errors.has('description') &&
                        <Typography className={styles.errorText}>Слишком длинное описание</Typography>}
                    </Container>
                </Container>
                <Container className={styles.row}>
                    <Container className={styles.left}>
                        <Typography>Обложка:</Typography>
                    </Container>
                    <Container className={styles.cover}>
                        <input
                            accept={allowedImageFormats}
                            className={styles.addCoverInput}
                            multiple
                            type="file"
                            id="testCover"
                            onChange={setTestPic}
                        />
                        <label htmlFor="testCover">
                            <Button variant="contained" component="span" className={styles.addCoverBtn}>
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
                        <PhotoCameraIcon fontSize='large'
                                         className={styles.photoIcon}/>
                        <img className={styles.coverImg}
                             src={test.picture}
                             alt=""/>
                        {errors.has('picture') &&
                        <Typography className={styles.errorText}>Некорректное изображение</Typography>}
                    </Container>
                </Container>
                <Container>
                    <Typography className={styles.resultsTitle}>Список результатов</Typography>
                </Container>
                <Container className={styles.results}>
                    {test.results.map((item, index) => {
                        return <Card key={index}
                                     className={styles.row}>
                            <IconButton aria-label="edit"
                                        onClick={() => {
                                            setEditedResult(item);
                                            setAddResultPopupState(true);
                                        }} className={styles.editIcon}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete"
                                        onClick={() => {
                                            setSelectedResult(item.resId);
                                            setDeleteResultPopup(true);
                                        }} className={styles.deleteIcon}>
                                <DeleteIcon/>
                            </IconButton>
                            <Container className={styles.resLeft}>
                                <Container className={styles.resultImgContainer}>
                                    <img className={styles.resultImg}
                                         src={item.resPic}
                                         alt=''/>
                                </Container>
                            </Container>
                            <Container className={styles.resInfo}>
                                <Typography className={styles.resultText}>{item.resText}</Typography>
                                <Typography>{cropText(item.resDesc, 255)}</Typography>
                            </Container>
                        </Card>
                    })}
                </Container>
                <Container>
                    <Button variant="contained" color="primary" component="span" className={styles.addQuestionBtn}
                            onClick={() => setAddResultPopupState(true)}>
                        Добавить результат
                    </Button>
                </Container>
                <Container className={styles.questionsTitle}>
                    <Typography className={styles.questionsText}>Список вопросов</Typography>
                </Container>
                <Container className={styles.questions}>
                    {test.questions.map((item, index) => {
                        return <Card key={index} className={styles.row}>
                            <IconButton aria-label="edit" onClick={() => {
                                setEditedQuestion(item);
                                setAddQuestionPopupState(true);
                            }} className={styles.editIcon}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => {
                                deleteQuestion(index)
                            }} className={styles.deleteIcon}>
                                <DeleteIcon/>
                            </IconButton>
                            <Container className={styles.left}>
                                <Container className={styles.questionImgContainer}>
                                    <img className={styles.questionImg} src={item.qPic} alt=''/>
                                </Container>
                            </Container>
                            <Container className={styles.varInfo}>
                                <Typography className={styles.qTitle}>{item.qText}</Typography>
                                <List className={styles.vars}>
                                    {item.vars.map((variant, index) => {
                                        return <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemText primary={variant.varText}/>
                                            </ListItem>{index !== (item.vars.length - 1) && <Divider/>}
                                        </React.Fragment>
                                    })}
                                </List>
                            </Container>
                            {questionsWithDeletedResults && questionsWithDeletedResults.has(item.qId) &&
                            <Tooltip title="Есть обнулённые результаты"
                                     classes={toolTipClasses}
                                     className={styles.isDeletedIcon}>
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
                            className={styles.addQuestionBtn}
                            disabled={test.questions.length >= maxQuestionsLength}
                            onClick={() => setAddQuestionPopupState(true)}>
                        {test.questions.length >= maxQuestionsLength ? 'Вы добавили максимальное количество вопросов' : 'Добавить вопрос'}
                    </Button>
                </Container>
                <Container>
                    {!correct &&
                    <Typography className={styles.correctError}>Слишком много неназначенных результатов!</Typography>}
                    <Button variant="contained"
                            classes={buttonClasses}
                            size='large'
                            component="span"
                            disabled={!validation() || errors.size > 0}
                            className={styles.addQuestionBtn}
                            onClick={() => {
                                if (checkCorrect() && validation() && errors.size === 0) {
                                    setCreating(true);
                                    if (testEditMode) {
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
        </>
    )
};

export default CreatingTest;