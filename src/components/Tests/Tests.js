import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CreatingTestContainer from "../CreatingTest/CreatingTestContainer";
import Container from "@material-ui/core/Container";
import BeginTestPopup from "../Common/Popups/BeginTestPopup/BeginTestPopup";

const Tests = ({tests, activeTab, setTestTC}) => {
    let [beginPopupState, setBeginPopupState] = useState(false);
    let [propsObj, setPropsObj] = useState(null);

    const handleTestClick = (id, picture, title, description, price, creator) => {
        setPropsObj({picture, title, description, price, creator, beginTestFunc: () => {setTestTC(id)}, setBeginPopupState});
        setBeginPopupState(true);
        // setTestTC(id);
    };

    if (activeTab === 0) {
        return (
            <>
            <Container
               style={styles.grid}
            >
                {tests.map((item, index) => {
                    return <Card style={styles.testCard}
                                 key={item.id}
                                 onClick={() => handleTestClick(item.id,
                                     item.picture,
                                     item.title,
                                     item.description,
                                     item.price,
                                     item.creator)}
                              >
                            <CardActionArea style={styles.testArea}>
                                <img src={item.picture} alt="" style={styles.testPic}/>
                                <CardContent style={styles.content}>
                                    <Typography style={styles.title} gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                })}
            </Container>
                {beginPopupState && <BeginTestPopup propsObj={propsObj}/>}
            </>
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
        width: '25%',
        margin: 15,
        height: 'auto',
        padding: 15
    },
    testArea: {
        width: '100%',
        height: '100%',
        padding: '0, 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    testPic: {
        width: '100%',
        height: 'auto',
        maxHeight: '75%',
        objectFit: 'contain',
        padding: 0,
    },
    content: {
        height: '20%',
        padding: '0, 15px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    title: {
        padding: '0, 15px'
    }
};

export default Tests;
