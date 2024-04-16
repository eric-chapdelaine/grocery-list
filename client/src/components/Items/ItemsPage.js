import { useEffect, useState} from "react";
import { getItems } from "../../services/itemsService";
import { Button } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { EditItemDialog } from "./EditItemDialog";
import { editItemName, deleteItem, addItem } from "../../services/itemsService";
import { DeleteDialog } from "../util/DeleteDialog";
import { NewItemDialog } from "./NewItemDialog";
import { ErrorAlert } from "../util/ErrorAlert";

const ListItems = ({items, setOpenDelete, setActiveItem, setOpenEdit}) => {

    return (items.map((i, idx) =>(
            <ListItem key={idx} dense>
              <ListItemText primary={i.name} />
              <Button onClick={() => {setOpenEdit(true); setActiveItem(i)}}>Edit</Button>
              <IconButton onClick={() => {setOpenDelete(true); setActiveItem(i)}}>
                <DeleteIcon />
              </IconButton>
          </ListItem>)))}

const ItemsPage = () => {
    const categories = ["Produce", "Dairy", "Meat", "Baking", "Other", "Non-food"];
    const [items, setItems] = useState([]);
    const [openNew, setOpenNew] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [error, setError] = useState(null);

    const refreshData = async () => {
        let res = await getItems().catch(setError);
        setItems(res || []);
    }

    useEffect(() => {
        setError(null);
        refreshData();        
    }, []);

    return (
        <div>
            <ErrorAlert error={error}/>
            <h1>Items</h1>
            <Button onClick={() => setOpenNew(true)}>Add Item</Button>

            {categories.map((c, idx) => (
                <div key={idx}>
                    <h2>{c}</h2>
                    <ListItems 
                        setOpenDelete={setOpenDelete}
                        setActiveItem={setActiveItem}
                        setOpenEdit={setOpenEdit}
                        items={items.filter((i) => i.category === c)}
                        refreshData={refreshData}
                    />
                </div>
            ))}
            <NewItemDialog 
                open={openNew}
                onClose={() => setOpenNew(false)}
                onSubmit={async (name, category) => {
                    await addItem(name, category).catch(setError);
                    refreshData();
                }}/>
            <EditItemDialog 
                getName={() => activeItem !== null ? activeItem.name : ""}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={async (name) => {
                    await editItemName(activeItem.id, name).catch(setError);
                    refreshData();
                }}/>
            <DeleteDialog 
                getName={() => activeItem !== null ? activeItem.name : ""}
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onSubmit={async () => {
                    await deleteItem(activeItem.id).catch(setError);
                    refreshData();
                }}/>
        </div>
    )
    
}

export {ItemsPage};