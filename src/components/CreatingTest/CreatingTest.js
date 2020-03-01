import React, { useState } from 'react';
import { Box, Card, Container, Typography, Radio, Button, Input } from '@material-ui/core';

const CreatingTest = ({ addGender, test, addTitle, addPicture }) => {
    let [gender, setLocaltGender] = useState(0);

    const setGender = (val) => {
        setLocaltGender(val);
        addGender(gender)
    }

    const getFile = (event) => {
        let fileList = event.target.files;
        console.log(fileList)
        convertToBase64(fileList[0], (result) => {
            addPicture(result);
       })
    }

    const convertToBase64 = (file, cb) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        
    }

    return (
        <Box>
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
                            onChange={getFile}
                        />
                        <label htmlFor="testCover">
                            <Button variant="contained" component="span" style={styles.addCoverBtn}>
                                Загрузить
                            </Button>
                        </label>
                    </Container>
                </Container>
                <Container style={styles.row}>
                    <Container style={styles.left} >
                    <Typography> </Typography>
                    </Container>
                   
                    <Container style={styles.coverImgContainer}>
                        <img style={styles.coverImg}src={test.picture} alt={test.title}/>
                    </Container>
                </Container>
            </Card>
        </Box >
    )
}

const styles = {
    container: {
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
    },
    row: {
        display: 'flex',
        margin: '20px auto'
    },
    left: {
        background: 'red',
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
    coverImgContainer: {
        height: 200,
        width: '100%'
        
    },
    coverImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
}

export default CreatingTest;