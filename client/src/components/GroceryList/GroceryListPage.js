import {useEffect, useState} from "react";
import {addGrocerylist, deleteGroceryList, getGroceryLists, updateGroceryList} from "../../services/groceryListsService"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {Link} from 'react-router-dom';
import { NewListDialog } from "./NewListDialog";
import { DeleteDialog } from "../util/DeleteDialog";
import { UpdateListDialog } from "./UpdateListDialog";
import { ErrorAlert } from "../util/ErrorAlert";

const GroceryListPage = () => {
    const [lists, setLists] = useState([]);
    const [activeList, setActiveList] = useState(null);

    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [error, setError] = useState(null);


    const refreshData = async () => {
        let res = await getGroceryLists().catch(setError);
        setLists(res || []);
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
    <div>
    <ErrorAlert error={error} />
    Select a Grocery List: <Button onClick={() => setOpenNew(true)}>Add New</Button>
    <Stack direction="column" spacing={2}>
        {lists.map((l, idx) =>(
        <Stack key={idx} direction="row">
        <Link key={idx}
              to={`/grocery_lists/${l.id}`}>
            <Button variant="contained"
                    style={{backgroundColor: '#FF9FF3'}}>
                        {l.name}
            </Button>
        </Link>
        <IconButton onClick={() => {setOpenDelete(true); setActiveList(l)}} edge="end" aria-label="delete">
            <DeleteIcon />
        </IconButton>
        <Button onClick={() => {setOpenUpdate(true); setActiveList(l)}}>
            Update
        </Button>
        </Stack>
        ))}
    </Stack>
    <NewListDialog 
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSubmit={async (name) => {
            await addGrocerylist(name).catch(setError);
            refreshData();
        }}/>

    <DeleteDialog 
                getName={() => activeList !== null ? activeList.name : ""}
                open={openDelete} 
                onClose={() => {setOpenDelete(false)}}
                onSubmit={async () => {await deleteGroceryList(activeList.id).catch(setError); refreshData()}}/>
    <UpdateListDialog
                getName={() => activeList !== null ? activeList.name : ""}
                open={openUpdate}
                onClose={() => {setOpenUpdate(false)}}
                onSubmit={async (name) => {
                    await updateGroceryList(activeList.id, name).catch(setError);
                    refreshData();
                }} />

    </div>
    );
}

export {GroceryListPage};