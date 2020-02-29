import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const Tests = ({tests, activeTab, handleTestClick}) => {
    if (activeTab === 0) {
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
            >
                {tests.map((item) => {
                    return <Card style={styles.testCard}
                                 key={item.testId}
                                 onClick={() => handleTestClick()}
                              >
                            <CardActionArea style={styles.testArea}>
                                <img src={item.testPic} alt="" style={styles.testPic}/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.testTitle}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                })}
            </Grid>
        )
    }
    if (activeTab === 1) {
        return (
            <Box component="div" m={1}>
                <Typography>Мои тесты</Typography>
            </Box>
        )
    }
    if (activeTab === 2) {
        return (
            <Box component="div" m={1}>
                <Typography>Создать тест</Typography>
            </Box>
        )
    }
};

const styles = {
    testCard: {
        width: '30%',
        height: ''
    },
    testArea: {
        padding: 20,
        width: '100%',
        height: '100%'
    },
    testPic: {
        width: '100%',
        height: '100%'
    }
}

export default Tests;
