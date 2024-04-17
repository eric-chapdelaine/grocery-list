import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';

const HomePage = () => {
  const Pages = {
    planned_meals: "Planned Meals",
    recipes: "Recipes",
    items: "Items",
    grocery_lists: "Grocery Lists",
  };

    return (
        <Stack direction="column" spacing={2}>
          {Object.keys(Pages).map((p, idx) =>(
            <Link key={idx} to={p}>
                <Button variant="contained"
                        style={{backgroundColor: '#FF9FF3'}}>
                        {Pages[p]}
                </Button>
            </Link>
          ))}
        </Stack>);
}

export {HomePage};