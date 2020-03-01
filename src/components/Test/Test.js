import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import ResultPageContainer from "./ResultPageContainer";

const Test = ({
                  test,
                  currentQuestion,
                  setCurrentQuestion,
                  setIsAnswered,
                  isAnswered,
                  pushAnswer,
                  answers,
                  complete,
                  setComplete
              }) => {
    console.log(test);
    console.log(answers);
    let [checkedIndex, setCheckedIndex] = useState(null);
    let [answer, setAnswer] = useState(null);
    let totalQuestions = test.questions.length;

    const next = () => {
        pushAnswer(answer);
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
        setCheckedIndex(null);
        if (currentQuestion === totalQuestions) {
            setComplete(true);
        }
    };

    const selectAnswer = (res) => {
        console.log(res)
        setIsAnswered(true);
        setAnswer(res);
    };

    const handleChange = event => {
        setCheckedIndex(event.target.value);
    };


    return (
        <Box>
            {!complete ?
            <Box>
                <Card style={styles.container} elevation={2}>
                    <Card style={styles.testCard} elevation={0}>
                        <img style={styles.questionImg} src={test.questions[currentQuestion - 1].qPic} alt=''/>
                    </Card>
                    <Typography style={styles.question}>{test.questions[currentQuestion - 1].qText}</Typography>
                    <FormGroup style={styles.variants}>
                        {test.questions[currentQuestion - 1].vars.map((item, index) => {
                            return <Card key={index} style={styles.varCard}>
                                <Button style={styles.variant} onClick={() => {
                                    setCheckedIndex(index);
                                    selectAnswer(item.res)
                                }}>
                                    <Radio
                                        checked={checkedIndex === index}
                                        onChange={handleChange}
                                        value={index}
                                        name="variant"
                                        inputProps={{'aria-label': 'A'}}
                                    />
                                    <Typography>{item.varText}</Typography>
                                </Button>
                            </Card>
                        })}
                    </FormGroup>
                    <Button disabled={!isAnswered} variant="contained" color="primary" onClick={() => next()}>
                        <Typography style={styles.nextBtn}>Дальше</Typography>
                    </Button>
                </Card>
                <Typography align='center'
                            variant='h6'>
                    {currentQuestion}/{totalQuestions}</Typography>
            </Box>
                : <ResultPageContainer />}

        </Box>
    )
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
        flexDirection: 'column'
    },
    testCard: {
        height: 370,
        margin: '15px auto 15px',
    },
    questionImg: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    question: {
        margin: '10px 0 25px',
        width: '90%',
        paddingBottom: 5,
        borderBottom: '1px solid gray'
    },
    variants: {
        width: '100%',
        textAlign: 'left',
        marginBottom: 20,
    },
    varCard: {
        textAlign: 'left'
    },
    variant: {
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%',
        textTransform: 'none'
    },
    nextBtn: {
        width: 150
    },
};

export default Test;