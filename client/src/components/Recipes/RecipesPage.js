import { useEffect, useState } from "react"
import { getRecipes } from "../../services/recipesService";
import { CardActions, CardContent, ListItem, ListItemText } from "@mui/material";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

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

    const refreshData = async () => {
        let res = await getRecipes();
        setRecipes(res || []);
    };

    useEffect(() => {
        refreshData().catch((e) => alert(e));
    }, []);
    return (
        <>
        <Stack spacing={2}>
        {recipes.map((r, idx) => (
            <RecipeCard key={idx} recipe={r} />
        ))}
        </Stack>
        </>
    )
}

export {RecipesPage}