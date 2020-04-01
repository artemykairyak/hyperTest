import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React from "react";
import styles from './TestCard.module.css';

const TestCard = ({test, handleTestClick}) => {
    return (
        <Card className={styles.testCard}
              key={test.id}
              onClick={() => handleTestClick(test.id,
                  test.picture,
                  test.title,
                  test.description,
                  test.price,
                  test.creator)
              }
        >
            <CardActionArea className={styles.testArea}>
                <img src={test.picture} alt="" className={styles.testPic}/>
                <CardContent className={styles.content}>
                    <Typography className={styles.title} gutterBottom variant="h5" component="h2">
                        {test.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default TestCard;
