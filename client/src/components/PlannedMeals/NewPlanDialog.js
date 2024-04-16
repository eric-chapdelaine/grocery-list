import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem, Select, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { getRecipes } from '../../services/recipesService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import dayjs from 'dayjs';

const BasicDatePicker = ({date, setDate}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(newValue) => setDate(newValue)} defaultValue={date} required label="Date" />
        </LocalizationProvider>
    )
}

const NewPlanDialog = ({title, open, onClose, onSubmit}) => {


    const [recipes, setRecipes] = useState([]);
    const [recipeId, setRecipeId] = useState(null);
    const [date, setDate] = useState(dayjs());
    const [mealType, setMealType] = useState("Dinner");

    useEffect(() => {
        const getData = async () => {
            setRecipes(await getRecipes());
        }

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
                onSubmit(date, mealType, recipeId);
                onClose();
            }
        }}
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Select the date 
            </DialogContentText>
            <BasicDatePicker date={date} setDate={setDate} />
            <DialogContentText>
                Select a meal type
            </DialogContentText>
            <Select
                value={mealType}
                label="Meal type"
                onChange={(e) => {setMealType(e.target.value)}}>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
            </Select>
            <DialogContentText>
                Select a recipe
            </DialogContentText>
            <Autocomplete
                required
                renderInput={(params) => <TextField {... params} 
                                            required={true}
                                            id="recipe"
                                            name="recipe"
                                            label="Recipe"/>}
                onChange={(e, newValue) => setRecipeId(newValue.id)}
                getOptionLabel={(option) => option.name}
                options={recipes}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
        </DialogActions>
    </Dialog>
    );
}

export {NewPlanDialog};