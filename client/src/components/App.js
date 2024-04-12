import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { GroceryListPage } from './GroceryList/GroceryListPage';
import { GroceryList } from './GroceryList/GroceryList';
import { HomePage } from './HomePage';

function NotFound() {
  return <>Error 404: Page not found!</>;
}

function App() {
return (
    <Router>
      <div style={{paddingTop: '20px'}}>
        <Container maxWidth="sm">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </Container>
        <hr />
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            {/* <Route path="/recipes" element={<Recipes />} />
            <Route path="/items" element={<Items />} /> */}
            <Route path="/grocery_lists" element={<GroceryListPage />} />
            <Route path="/grocery_lists/:id" element={<GroceryList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        </div>
    </Router>
  );
}

export default App;
