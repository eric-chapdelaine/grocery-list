import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const NewItemDialog = ({open, onClose, onSubmit}) => {

    const [category, setCategory] = useState("Produce");

    const handleChange = (event) => {
        setCategory(event.target.value);
    }

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
                onSubmit(formJson.name, category);
                onClose();
            }
        }}
        >
        <DialogTitle>Create new Item</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter the name of the new item.
            </DialogContentText>
            <TextField
                autoFocus
                required
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth />
                <DialogContentText>
                Select a category for this item
                </DialogContentText>
                <Select
                    value={category}
                    label="Category"
                    onChange={handleChange}>
                    <MenuItem value="Produce">Produce</MenuItem>
                    <MenuItem value="Dairy">Dairy</MenuItem>
                    <MenuItem value="Meat">Meat</MenuItem>
                    <MenuItem value="Baking">Baking</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="Non-food">Non-food</MenuItem>

                </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Add</Button>
        </DialogActions>
    </Dialog>
    );
}

export {NewItemDialog};