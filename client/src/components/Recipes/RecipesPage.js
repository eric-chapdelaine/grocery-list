import { useEffect, useState } from "react"
import { getRecipes, createNewRecipe } from "../../services/recipesService";
import { CardActions, CardContent } from "@mui/material";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { ErrorAlert } from "../util/ErrorAlert";
import { NewRecipeDialog } from "./NewRecipeDialog";

const RecipeCard = ({recipe}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {recipe.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Prep time: {recipe.prep_time_minutes} minutes
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Cook time: {recipe.cook_time_minutes} minutes
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Servings: {recipe.servings}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/recipes/${recipe.id}`}>
                <Button>Open</Button>
                </Link>
            </CardActions>

        </Card>
    )
}

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [openNew, setOpenNew] = useState(false);
    const [error, setError] = useState(null);

    const refreshData = async () => {
        let res = await getRecipes().catch(setError);
        setRecipes(res || []);
    };

    useEffect(() => {
        setError(null);
        refreshData();
    }, []);
    return (
        <>
        <ErrorAlert error={error}/>
        <Button onClick={() => {setOpenNew(true)}}>Create New Recipe</Button>
        <Stack spacing={2}>
        {recipes.map((r, idx) => (
            <RecipeCard key={idx} recipe={r} />
        ))}
        </Stack>
        <NewRecipeDialog
            open={openNew}
            onClose={() => setOpenNew(false)}
            onSubmit={async (name, instructions, prep_time, cook_time, servings) => {
                await createNewRecipe(name, instructions, prep_time, cook_time, servings).catch(setError);
                refreshData();
            }}/>
        </>
    )
}

export {RecipesPage}