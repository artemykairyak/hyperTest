import React, {useEffect, useState} from "react";
import {Button, Container, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {compressFile, generateNewIndex, lengthValidation} from "../helpers/helpers";
import {makeStyles} from "@material-ui/styles";
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
import {allowedImageFormats, shortInputLength, standardInputLength} from "../../constants";

const AddResult = ({test, setAddResultPopupState, addResult, editedResult, editResult, setEditedResult}) => {
    let [resObj, setResObj] = useState({
        resId: generateNewIndex(test.results, 'resId'),
        resText: '',
        resDesc: '',
        resPic: null
    });
    let [errors, setErrors] = useState(new Set());

    const setResPic = event => {
        getFile(event);
    };

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

    useEffect(() => {
        console.log(test);
    },[test]);

    const getFile = (event) => {
        let fileList = event.target.files;

        compressFile(fileList[0], (result) => {
            updateResObj('resPic', result);
        });
    };

    const updateResObj = (field, val) => {
        if (field === 'resText') {
            setResObj({...resObj, resText: val});
        }

        if (field === 'resDesc') {
            setResObj({...resObj, resDesc: val});
        }

        if (field === 'resPic') {
            setResObj({...resObj, resPic: val});
        }
    };

    const validate = () => {
        return (!!resObj.resText && !!resObj.resPic);
    };

    useEffect(() => {
        if(editedResult) {
            setResObj(editedResult);
        }
    },[]);

    useEffect(() => {
        console.log('resObj', resObj)
    }, [resObj]);

    const styles = useStyles();

    return (
        <Card className={styles.popup} raised>
            <CloseIcon className={styles.close}
                       fontSize="large"
                       onClick={() => setAddResultPopupState(false)}/>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Картинка:</Typography>
                </Container>
                <Container className={[styles.rightBtn, styles.cover]}>
                    <input
                        accept={allowedImageFormats}
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
                    <Typography>Текст результата:</Typography>
                </Container>
                <Container className={styles.inputContainer}>
                    <TextField
                        placeholder="Текст результата"
                        onChange={(event) => {
                            updateResObj('resText', event.target.value)
                            validateLengthInput(event.target.value, shortInputLength, 'resText');
                        }}
                        error={errors.has('resText')}
                        value={resObj.resText}
                        className={styles.input}
                    />
                    {errors.has('resText') && <Typography className={styles.errorText}>Слишком длинный текст</Typography>}
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography>Описание результата:</Typography>
                </Container>
                <Container className={[styles.inputContainer]}>
                    <TextField
                        multiline={true}
                        placeholder="Описание результата"
                        onChange={(event) => {
                            updateResObj('resDesc', event.target.value);
                            validateLengthInput(event.target.value, standardInputLength, 'resDesc');
                        }}
                        error={errors.has('resDesc')}
                        value={resObj.resDesc}
                        className={styles.input}
                        rows={5}
                    />
                    {errors.has('resDesc') && <Typography className={styles.errorText}>Слишком длинное описание</Typography>}
                </Container>
            </Container>
            <Container className={styles.row}>
                <Container className={styles.left}>
                    <Typography> </Typography>
                </Container>
                <Container className={[styles.rightBtn]}>
                    <Button variant="contained"
                            disabled={!validate() || errors.size > 0}
                            component="span"
                            color={validate() || errors.size === 0 ? 'primary' : 'secondary'}
                            className={styles.btn}
                            onClick={() => {
                                if (validate() && errors.size === 0) {
                                    if(editedResult) {
                                        editResult(resObj);
                                        setEditedResult(null);
                                    } else {
                                        addResult(resObj);
                                    }
                                    setAddResultPopupState(false);
                                }
                            }
                            }>
                        {validate() ? (errors.size > 0 ? 'Присутствуют ошибки' : 'Готово') : 'Не все поля заполнены'}
                    </Button>
                </Container>
            </Container>
        </Card>
    )
};

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
    },
    errorText: {
        color: '#d32f2f',
        textAlign: 'left',
        paddingLeft: 0,
        paddingTop: 5
    }
});

export default AddResult;