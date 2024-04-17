import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import { getItems } from '../../services/itemsService';

const AddItemDialog = ({title, open, onClose, onSubmit, setError}) => {

    const [itemId, setItemId] = useState(null);
    const [items, setItems] = useState([]); 

    useEffect(() => {
        const getData = async () => {
            setItems(await getItems().catch(setError));
        };

         getData();

    }, []);

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
                onSubmit(itemId, formJson.quantity, formJson.unit);
                onClose();
            }
        }}
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please enter the name of the item you want to add
            </DialogContentText>
            <Autocomplete 
                required
                renderInput={(params) => <TextField {... params} 
                                            required={true}
                                            id="item" 
                                            name="item" 
                                            label="Item" />}
                onChange={(event, newValue) => setItemId(newValue.id)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.name}
                options={items}/>
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
                inputProps={{step: "any"}}
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

export {AddItemDialog};