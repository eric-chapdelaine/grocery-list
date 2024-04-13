import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditItemDialog = ({getName, open, onClose, onSubmit}) => {

    return (
    <Dialog 
        open={open}
        onClose={onClose}
        PaperProps={{
            component: 'form',
            onSubmit: async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                onSubmit(formJson.name);
                onClose();
            }
        }}
        >
        <DialogTitle>Update {getName()}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter a new name for {getName()}
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Update</Button>
        </DialogActions>
    </Dialog>
    );
}

export {EditItemDialog};