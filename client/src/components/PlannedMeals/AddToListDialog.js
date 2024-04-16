import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { getGroceryLists } from '../../services/groceryListsService';

const AddToListDialog = ({open, onClose, onSubmit, setError}) => {

    const [lists, setLists] = useState([]);
    const [list, setList] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLists(await getGroceryLists());
        }

        getData().catch(setError);
    }, []);

    return (
    <Dialog 
        open={open}
        onClose={onClose}
        PaperProps={{
            component: 'form',
            onSubmit: async (e) => {
                e.preventDefault();
                onSubmit(list.id);
                onClose();
            }
        }}
        >
        <DialogTitle>Add meal to grocery list</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Select a grocery list to add it to
            </DialogContentText>
            <Autocomplete
                required
                renderInput={(params) => <TextField {... params} 
                                            required={true}
                                            id="list"
                                            name="list"
                                            label="Lists"/>}
                onChange={(e, newValue) => setList(newValue)}
                getOptionLabel={(option) => option.name}
                options={lists}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
        </DialogActions>
    </Dialog>
    );
}

export {AddToListDialog};