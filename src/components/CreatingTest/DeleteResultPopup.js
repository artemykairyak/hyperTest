import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Button, Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import {makeStyles} from "@material-ui/styles";


const DeleteResultPopup = ({selectedResult, deleteResult, setDeleteResultPopup}) => {
    const styles = useStyles();

    return <Dialog
        open={true}
        disableEscapeKeyDown
        fullWidth={true}
    >
        <DialogTitle>Удаление результата</DialogTitle>
        <DialogContent>
            <Typography><b>Вы действительно хотите удалить результат?</b></Typography>
            <Typography>В этом случае во всех вопросах, которым был присвоен данный результат — результат
                будет <b>обнулён</b>.</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteResultPopup(false)}
                    variant="contained"
                    color="primary">
                Закрыть
            </Button>
            <Button onClick={() => {
                setDeleteResultPopup(false);
                deleteResult(selectedResult)
            }}
                    variant="contained"
                    color="secondary">
                Удалить
            </Button>
        </DialogActions>
    </Dialog>
};

var useStyles = makeStyles({
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        margin: '30px auto 15px',
        padding: 15,
        textAlign: 'center',
        zIndex: 10
    },
    dialogText: {
        marginTop: 15
    }
});

export default DeleteResultPopup;