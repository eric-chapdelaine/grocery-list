import { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { setPickedUp, deleteItemFromList, getItemsFromList } from '../../services/groceryListsService';

import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { DeleteDialog } from '../util/DeleteDialog';
import { AddItemDialog } from '../util/AddItemDialog';
import { addItemToList } from '../../services/groceryListsService';
import { ErrorAlert } from '../util/ErrorAlert';

const ListItems = ({items, setOpenDelete, setActiveItem, refreshData, setError}) => {

    return (items.map((i, idx) =>(

            <ListItem key={idx} dense>
              <ListItemIcon>
                <Checkbox checked={i.picked_up === 1} onChange={async (e) => {await setPickedUp(i.id, e.target.checked).catch(setError); refreshData()}} />
              </ListItemIcon>

              <ListItemText primary={i.name} />
              <ListItemText primary={i.quantity + " " + i.unit} />
              <ListItemText>
                  {i.recipe && <Link to={`/recipes/${i.recipe_id}`}>
                      {i.recipe}
                  </Link>}
              </ListItemText>
              <IconButton onClick={() => {setOpenDelete(true); setActiveItem(i)}}>
                <DeleteIcon />
              </IconButton>

          </ListItem>)))}

const GroceryList = () => {
    const categories = ["Produce", "Dairy", "Meat", "Baking", "Other", "Non-food"];

    const {id} = useParams();
    const [items, setItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [error, setError] = useState(null);

    const refreshData = async () => {
        let res = await getItemsFromList(id).catch(setError);
        setItems(res || []);
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <div>
            <ErrorAlert error={error} />
            <h1>Grocery List</h1>
            <Button onClick={() => setOpenNew(true)}>Add Item</Button>
            {categories.map((c, idx) => (
                <div key={idx}>
                    <h2>{c}</h2>
                    <ListItems 
                        setOpenDelete={setOpenDelete}
                        setActiveItem={setActiveItem}
                        items={items.filter((i) => i.category === c)} 
                        refreshData={refreshData}/>
                </div>
            ))}
        <AddItemDialog
        setError={setError}
        title="Add a new item to the list"
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSubmit={async (item_id, quantity, unit) => {
            await addItemToList(id, item_id, quantity, unit).catch(setError);
            refreshData();
        }} />
        <DeleteDialog getName={() => activeItem !== null ? activeItem.name : ""}
                      open={openDelete}
                      onClose={() => {setOpenDelete(false)}}
                      onSubmit={async () => {await deleteItemFromList(activeItem.id).catch(setError); refreshData()}}/>
        </div>
    )
}

export {GroceryList};