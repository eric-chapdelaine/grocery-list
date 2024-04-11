import {useParams } from 'react-router-dom';

const GroceryList = () => {
    const {id} = useParams();
    return <>Viewing grocery list {id}</>;
}

export {GroceryList};