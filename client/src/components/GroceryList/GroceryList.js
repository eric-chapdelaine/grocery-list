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
import { NewListItemDialog } from './NewListItemDialog';
import { addItemToList } from '../../services/groceryListsService';

const ListItems = ({items, setOpenDelete, setActiveItem, refreshData}) => {

    return (items.map((i, idx) =>(

            <ListItem key={idx} dense>
              <ListItemIcon>
                <Checkbox checked={i.picked_up === 1} onChange={async (e) => {await setPickedUp(i.id, e.target.checked); refreshData()}} />
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

    const refreshData = async () => {
        let res = await getItemsFromList(id);
        setItems(res || []);
    };

    useEffect(() => {
        refreshData().catch((e) => alert(e));
    }, []);

    return (
        <div>
            <h1>Grocery List</h1>
            <Button onClick={() => setOpenNew(true)}>Add item</Button>
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
        <NewListItemDialog 
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSubmit={async (item_id, quantity, unit) => {
            await addItemToList(id, item_id, quantity, unit);
            refreshData();
        }} />
        <DeleteDialog getName={() => activeItem !== null ? activeItem.name : ""}
                      open={openDelete}
                      onClose={() => {setOpenDelete(false)}}
                      onSubmit={async () => {await deleteItemFromList(activeItem.id); refreshData()}}/>
        </div>
    )
}

export {GroceryList};