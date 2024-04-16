import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { addItemToRecipe, deleteItemInRecipe, editItemInRecipe, getItemsInRecipe, getRecipe, editRecipe, deleteRecipe } from "../../services/recipesService";
import { Button, Dialog, DialogContent, DialogContentText, TextField, DialogActions, DialogTitle, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {AddItemDialog} from "../util/AddItemDialog";
import { DeleteDialog } from "../util/DeleteDialog";
import { ErrorAlert } from "../util/ErrorAlert";
import { NewRecipeDialog } from "./NewRecipeDialog";


const EditItemDialog = ({open, onClose, onSubmit}) => {
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
                    onSubmit(formJson.quantity, formJson.unit);
                    onClose();
                }
            }}>
        <DialogTitle>Edit item</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter the new quantity:
            </DialogContentText>
            <TextField 
                autoFocus
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                type="double"
                step="any"
                fullWidth />
            <DialogContentText>
                Enter the new unit:
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
            <Button type="submit">Edit</Button>
        </DialogActions>
        </Dialog>
    )
}

const Recipe = () => {
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipe, setRecipe] = useState({name: "Error"});
    const [items, setItems] = useState([]);

    const [activeItem, setActiveItem] = useState(false);
    const [openEditItem, setOpenEditItem] = useState(false);
    const [openNewItem, setOpenNewItem] = useState(false);
    const [openDeleteItem, setOpenDeleteItem] = useState(false);

    const [openEditRecipe, setOpenEditRecipe] = useState(false);
    const [openDeleteRecipe, setOpenDeleteRecipe] = useState(false);

    const navigate = useNavigate();

    const refreshData = async () => {
        setRecipe(await getRecipe(id).catch(setError));
        setItems(await getItemsInRecipe(id).catch(setError));
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        refreshData();
        setLoading(false);
    }, []);

    if (loading) return (<>Loading...</>);

    return (
        <>
        <ErrorAlert error={error} />
        {recipe &&
        <>
        <h1>
        {recipe.name}
        <Button onClick={() => setOpenEditRecipe(true)}>Edit</Button>

        <IconButton onClick={() => setOpenDeleteRecipe(true)}>
        <DeleteIcon />
        </IconButton>
        </h1>
        <hr />
        <br />
        <small>
           Prep time: {recipe.prep_time_minutes} minutes 
           <br />
           Cook time: {recipe.cook_time_minutes} minutes 
           <br />
           Servings: {recipe.servings}
        </small>
        <br />
        <h3>
            Ingredients:
            <Button onClick={() => setOpenNewItem(true)}>New</Button>
        </h3>
        <ul>
            {items.map((i, idx) => {
                return (
                    <li key={idx}>{i.name} - {i.quantity} {i.unit}
                   <Button onClick={() => {setActiveItem(i); setOpenEditItem(true)}}>Edit</Button> 
                   <IconButton onClick={() => {setActiveItem(i); setOpenDeleteItem(true)}}>
                    <DeleteIcon />
                   </IconButton>
                    </li>
                );
            })}
        </ul>
        <h3>
            Instructions:
        </h3>
        {recipe.instructions}
        {/* Item Dialogs */}
        <AddItemDialog
        setError={setError}
        title="Add a new item to the recipe"
        open={openNewItem}
        onClose={() => setOpenNewItem(false)}
        onSubmit={async (item_id, quantity, unit) => {
            await addItemToRecipe(id, item_id, quantity, unit).catch(setError);
            refreshData();
        }} />
        <EditItemDialog 
            item={activeItem}
            open={openEditItem}
            onClose={() => setOpenEditItem(false)}
            onSubmit={async (quantity, unit) => {
                await editItemInRecipe(id, activeItem.item_id, quantity, unit).catch(setError);
                refreshData();
            }}/>
        <DeleteDialog 
            getName={() => activeItem ? activeItem.name : ""}
            open={openDeleteItem}
            onClose={() => setOpenDeleteItem(false)}
            onSubmit={async () => {
                await deleteItemInRecipe(id, activeItem.item_id).catch(setError);
                refreshData();
            }}/>

        {/* Recipe Dialogs */}
        <NewRecipeDialog
            title="Edit recipe"
            recipe={recipe}
            open={openEditRecipe}
            onClose={() => setOpenEditRecipe(false)}
            onSubmit={async (name, prep_time, cook_time, servings, instructions) => {
                await editRecipe(recipe.id, name, prep_time, cook_time, servings, instructions).catch(setError);
                refreshData();
            }}/>
        <DeleteDialog 
            getName={() => recipe.name}
            open={openDeleteRecipe}
            onClose={() => setOpenDeleteRecipe(false)}
            onSubmit={async () => {
                await deleteRecipe(id).catch(setError);
                refreshData();
                navigate("/recipes");
            }}/>
            </>
        }

        </>
    )

}

export {Recipe}