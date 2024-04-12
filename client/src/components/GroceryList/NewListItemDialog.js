import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewListItemDialog = ({open, onClose, onSubmit}) => {

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
                onSubmit(formJson.item, formJson.quantity, formJson.unit);
                onClose();
            }
        }}
        >
        <DialogTitle>Add Item to List</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter the name of the item you want to add
                {/* TODO: change to drop down of items */}
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="item"
                name="item"
                label="Item"
                type="number"
                fullWidth />
            <DialogContentText>
                Enter the quantity of the item
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth />
            <DialogContentText>
                Enter the unit of the item
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="unit"
                name="unit"
                label="Unit"
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

export {NewListItemDialog};