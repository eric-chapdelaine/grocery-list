import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDialog = ({getName, open, onClose, onSubmit}) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>Are you sure you want to delete {getName()}?</DialogTitle>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {onSubmit(); onClose()}}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export {DeleteDialog};