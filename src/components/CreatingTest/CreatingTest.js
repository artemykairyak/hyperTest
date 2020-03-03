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
import {convertToBase64} from '../helpers/helpers';

const CreatingTest = ({addGender, test, addTitle, addPicture, deleteVar}) => {
    let [gender, setLocaltGender] = useState(0);
    let [addQuestionPopupState, setAddQuestionPopupState] = useState(false);
    console.log(test);

    const setGender = (val) => {
        setLocaltGender(val);
        addGender(gender)
    };

    const getFile = (event, mode) => {
        let fileList = event.target.files;

        convertToBase64(fileList[0], (result) => {
            if(mode === 'testPic') {
                addPicture(result);
            }

            if(mode === 'questiontPic') {
                addPicture(result);
            }
        })
    };

    const setQuestionPic = event => {
        getFile(event, 'questionPic');
    };

    const setTestPic = event => {
        getFile(event, 'testPic');
    };

    return (
        <Box>
            {addQuestionPopupState && <AddQuestion setQuestionPic={setQuestionPic} />}
            <Card style={styles.container} elevation={2}>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Кто может пройти тест:</Typography>
                    </Container>

                    <Container style={styles.right} style={styles.gender}>
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
                        <Input
                            onChange={(event) => addTitle(event.target.value)}
                            value={test.title}
                            style={styles.input}
                        />
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left}>
                        <Typography>Обложка:</Typography>
                    </Container>
                    <Container style={styles.cover}>
                        <input
                            accept="image/*"
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
                        <img style={styles.coverImg} src={test.picture} alt={test.title}/>
                    </Container>
                </Container>
                <Container style={styles.questionsTitle}>
                    <Typography>Список вопросов</Typography>
                </Container>
                <Container style={styles.questions}>
                    {test.questions.map((item, index) => {
                        return <Card key={index} style={styles.row}>
                            <IconButton aria-label="delete" onClick={() => {
                                deleteVar(index)
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

                        </Card>
                    })}
                </Container>
                <Container style={styles.questionsTitle}>
                    <Button variant="contained" component="span" style={styles.addQuestionBtn}
                    onClick={() => setAddQuestionPopupState(true)}>
                        Добавить вопрос
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
        overflow: 'visible'
    },
    left: {

        display: 'flex',
        width: 350,
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
        padding: 0
    },
    coverImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    questionImgContainer: {
        height: 200,
        width: '100%',
    },
    questionImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    varInfo: {
        textAlign: 'left',
        padding: 0
    },
    qTitle: {
        borderBottom: '1px solid gray',
        paddingBottom: 5,
        marginBottom: 10
    },
    vars: {
        padding: 0
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translate(50%, -40%)',
        zIndex: 5
    }
};

export default CreatingTest;