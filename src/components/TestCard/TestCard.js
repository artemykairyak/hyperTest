import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React from "react";
import styles from './TestCard.module.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const TestCard = ({test, handleTestClick, editIcon, publishIcon, deleteIcon, setPublishPopupState,
                      setDeletePopupState, setPublishedTestId, setPublishedTest, passed}) => {
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
            {passed && <DoneAllIcon className={styles.doneIcon}/>}
            <CardActionArea className={styles.testArea}>
                <img src={test.picture} alt="" className={styles.testPic}/>
                <CardContent className={styles.content}>
                    <Typography className={styles.title} gutterBottom variant="h5" component="h2">
                        {test.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Container className={styles.icons}>
                {editIcon &&  <IconButton aria-label="edit" onClick={() => {
                    // setEditedResult(item);
                    // setAddResultPopupState(true);
                }} className={styles.icon}>
                    <EditIcon className={styles.editIcon}/>
                </IconButton>}
                {publishIcon &&  <IconButton aria-label="edit" onClick={() => {
                    // setEditedResult(item);
                    setPublishedTestId(test.id);
                    setPublishedTest(test);
                    setPublishPopupState(true);

                }} className={styles.icon}>
                    <CheckCircleIcon className={styles.publishIcon}/>
                </IconButton>}
                {deleteIcon &&  <IconButton aria-label="edit" onClick={() => {
                    // setEditedResult(item);
                    setDeletePopupState(true);
                }} className={styles.icon}>
                    <DeleteIcon className={styles.deleteIcon}/>
                </IconButton>}
            </Container>
        </Card>
    )
};

export default TestCard;
