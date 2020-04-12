import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import {Card} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import ResultPageContainer from "../ResultPage/ResultPageContainer";
import ConfirmPopup from "../../Common/Popups/ConfirmPopup/ConfirmPopup";
import styles from './Test.module.css';

const Test = ({
                  test,
                  currentQuestion,
                  setCurrentQuestion,
                  setIsAnswered,
                  isAnswered,
                  pushAnswer,
                  answers,
                  complete,
                  testCompleted,
                  closeTest
              }) => {
    console.log(test);
    console.log(answers);
    let [checkedIndex, setCheckedIndex] = useState(null);
    let [answer, setAnswer] = useState(null);
    let [closeTestState, setCloseTestState] = useState(false);
    let totalQuestions = test.questions.length;

    const next = () => {
        pushAnswer(answer);
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
        setCheckedIndex(null);
        if (currentQuestion === totalQuestions) {
            console.log(test)
            testCompleted(test.id);
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
                <Box className={styles.box}>
                    <Card className={styles.container} elevation={2}>
                        <Card className={styles.testCard} elevation={0}>
                            <img className={styles.questionImg} src={test.questions[currentQuestion - 1].qPic} alt=''/>
                        </Card>
                        <Typography className={styles.question}>{test.questions[currentQuestion - 1].qText}</Typography>
                        <FormGroup className={styles.variants}>
                            {test.questions[currentQuestion - 1].vars.map((item, index) => {
                                return <Card key={index} className={styles.varCard}>
                                    <Button className={styles.variant} onClick={() => {
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
                            <Typography className={styles.nextBtn}>Дальше</Typography>
                        </Button>
                    </Card>
                    <Typography align='center'
                                variant='h6'>
                        {currentQuestion}/{totalQuestions}</Typography>
                    <Button className={styles.endBtn} variant="contained" color="secondary"
                            onClick={() => setCloseTestState(true)}>
                        <Typography>Закончить тест</Typography>
                    </Button>
                    {closeTestState && <ConfirmPopup text='Вы хотите закончить тест?'
                                                     onAgree={closeTest}
                                                     onClose={() => setCloseTestState(false)}
                                                     closeText='Закрыть'
                                                     agreeText='Закончить'/>
                    }
                </Box>
                : <ResultPageContainer/>}

        </Box>
    )
};

export default Test;