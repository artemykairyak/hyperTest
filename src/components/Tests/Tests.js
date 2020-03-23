import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CreatingTestContainer from "../CreatingTest/CreatingTestContainer";
import Container from "@material-ui/core/Container";

const Tests = ({tests, activeTab, handleTestClick}) => {
    if (activeTab === 0) {
        return (
            <Container
               style={styles.grid}
            >
                {tests.map((item, index) => {
                    return <Card style={styles.testCard}
                                 key={item.id}
                                 onClick={() => handleTestClick(item.id)}
                              >
                            <CardActionArea style={styles.testArea}>
                                <img src={item.picture} alt="" style={styles.testPic}/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography gutterBottom component="p">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                })}
            </Container>
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
                <CreatingTestContainer/>
            </Box>
        )
    }
};

const styles = {
    grid: {
      display: 'flex',
        flexWrap: 'wrap'
    },
    testCard: {
        width: '30%',
        margin: 15
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
