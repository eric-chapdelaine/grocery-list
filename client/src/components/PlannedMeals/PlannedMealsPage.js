import { useEffect, useState } from "react"
import { createPlannedMeal, deletePlannedMeal, editPlannedMeal, getPlannedMeals } from "../../services/plannedMealsService";
import { Button, ListItem, Typography, List} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from "react-router-dom";
import { DeleteDialog } from "../util/DeleteDialog";
import { addRecipeToGroceryList } from "../../services/groceryListsService";
import { NewPlanDialog } from "./NewPlanDialog";
import { AddToListDialog } from "./AddToListDialog";
import { ErrorAlert } from "../util/ErrorAlert";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

const MealItem = ({meal, setActiveMeal, setOpenEdit, setOpenDelete, setOpenAdd}) => {
    return (
        <ListItem
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 2fr 1fr 1fr 1fr",
                gap: 2,
                alignItems: "center",
            }}>
      <Typography variant="body1">{formatDate(meal.date)}</Typography>
      <Typography variant="body1">{meal.meal_type}</Typography>
      <Link to={`/recipes/${meal.recipe_id}`}>
        <Typography variant="body1">{meal.name}</Typography>
      </Link>
      <Button variant="outlined" onClick={() => {setActiveMeal(meal); setOpenAdd(true)}}>Add to List</Button>
      <Button variant="outlined" onClick={() => {setActiveMeal(meal); setOpenEdit(true)}}>Edit</Button>
      <IconButton onClick={() => {setActiveMeal(meal); setOpenDelete(true)}}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
    )
}

const PlannedMealsPage = () => {
    const [meals, setMeals] = useState([]);
    const [activeMeal, setActiveMeal] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openNew, setOpenNew] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const [error, setError] = useState(null);

    const refreshData = async () => {
        let res = await getPlannedMeals().catch(setError);
        setMeals(res || []);
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <>
        <ErrorAlert error={error}/>

        <h1>Meal Plans</h1>
        <Button onClick={() => setOpenNew(true)}>New Meal Plan</Button>
        <List sx={{width: "100%"}}>
        {meals.map((m, idx) => (
            <MealItem 
                key={idx} 
                meal={m} 
                setActiveMeal={setActiveMeal} 
                setOpenDelete={setOpenDelete}
                setOpenEdit={setOpenEdit}
                setOpenAdd={setOpenAdd}
                />
        ))}
        </List>
        <DeleteDialog 
            getName={() => activeMeal ? activeMeal.name : ""}
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onSubmit={async () => {
                await deletePlannedMeal(activeMeal.id).catch(setError);
                refreshData();
            }}/>
        <NewPlanDialog
            setError={setError}
            title={"Edit meal plan"}
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            onSubmit={async (date, meal_type, recipe_id) => {
                await editPlannedMeal(activeMeal.id, date, meal_type, recipe_id);
                refreshData();
            }}/>
        <NewPlanDialog
            setError={setError}
            title={"Create a new meal plan"}
            open={openNew}
            onClose={() => setOpenNew(false)}
            onSubmit={async (date, meal_type, recipe_id) => {
                await createPlannedMeal(date, meal_type, recipe_id).catch(setError);
                refreshData();
            }}/>
        <AddToListDialog
            setError={setError}
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            meal={activeMeal}
            onSubmit={async (list_id) => {
                await addRecipeToGroceryList(list_id, activeMeal.recipe_id).catch(setError);
                refreshData();
            }}/>
        </>
    )
}

export {PlannedMealsPage}