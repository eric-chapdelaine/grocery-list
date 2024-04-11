import {useEffect, useState} from "react";
import {addGrocerylist, getGroceryLists} from "../services/groceryListsService"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import {Link} from 'react-router-dom';
// import { GroceryList } from "./GroceryList";

const GroceryListPage = () => {
    const [lists, setLists] = useState([]);
    const [openNew, setOpenNew] = useState(false);

    // let {path, url} = useRouteMatch();

    const refreshData = async () => {
        let res = await getGroceryLists();
        setLists(res || []);
    }

    useEffect(() => {
        // TODO: maybe some some popup if refreshData fails
        refreshData().catch((e) => console.log(e));
    }, []);

    return (
    <div>
    Select a Grocery List: <Button onClick={() => setOpenNew(true)}>Add New</Button>
    <Stack direction="column" spacing={2}>
        {lists.map((l, idx) =>(
        <Link key={idx}
              to={`/grocery_lists/${l.id}`}>
            <Button variant="contained"
                    style={{backgroundColor: '#FF9FF3'}}>
                        {l.name}
            </Button>
        </Link>
        ))}
    </Stack>
    <Dialog 
        open={openNew}
        onClose={() => setOpenNew(false)}
        PaperProps={{
            component: 'form',
            onSubmit: async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                await addGrocerylist(formJson.name);
                refreshData();
                setOpenNew(false);
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
            <Button onClick={() => setOpenNew(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
        </DialogActions>
    </Dialog>

    {/* <Routes>
        <Route path=":id" element={<GroceryList />} />
    </Routes> */}
    </div>
    );
}

export {GroceryListPage};