import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewRecipeDialog = ({title, recipe, open, onClose, onSubmit}) => {
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
                onSubmit(formJson.name, formJson.instructions, formJson.prep_time_minutes, formJson.cook_time_minutes, formJson.servings);
                onClose();
            }
        }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>Enter the new name:</DialogContentText>
            <TextField 
                autoFocus
                required
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder={recipe ? recipe.name : "Name"}
                fullWidth/>
            <DialogContentText>Enter the new prep time (in minutes):</DialogContentText>
            <TextField 
                autoFocus
                required
                id="prep_time_minutes"
                name="prep_time_minutes"
                label="Prep time"
                type="number"
                etep="any"
                placeholder={recipe ? recipe.prep_time_minutes : 0}
                fullWidth/>
            <DialogContentText>Enter the new cook time (in minutes):</DialogContentText>
            <TextField 
                autoFocus
                required
                id="cook_time_minutes"
                name="cook_time_minutes"
                label="Cook time"
                type="number"
                step="any"
                placeholder={recipe ? recipe.cook_time_minutes : 0}
                fullWidth/>
            <DialogContentText>Enter the number of servings:</DialogContentText>
            <TextField 
                autoFocus
                required
                id="servings"
                name="servings"
                label="Servings"
                type="number"
                step="1"
                placeholder={recipe ? recipe.servings : 0}
                fullWidth/>
            <DialogContentText>Enter the instructions:</DialogContentText>
            <TextField
                multiline
                autoFocus
                required
                id="instructions"
                name="instructions"
                label="Instructions"
                type="text"
                placeholder={recipe ? recipe.instructions : ""}
                fullWidth/>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
        </DialogActions>

        </Dialog>
    )
}

export {NewRecipeDialog};