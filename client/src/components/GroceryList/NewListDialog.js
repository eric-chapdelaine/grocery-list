import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewListDialog = ({open, onClose, onSubmit}) => {

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
        <DialogTitle>Create new Grocery List</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter the name of the new grocery list.
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
            <Button type="submit">Add</Button>
        </DialogActions>
    </Dialog>
    );
}

export {NewListDialog};