import { REACT_APP_API_URL, api } from "./config";

const RECIPES_API_URL = `${REACT_APP_API_URL}/recipe`;

const getRecipes = async () => {
    const res = await api.get(`${RECIPES_API_URL}/`);
    return res.data;
}

const getRecipe = async (id) => {
    const res = await api.get(`${RECIPES_API_URL}/${id}`);
    return res.data[0];
}

const getItemsInRecipe = async (id) => {
    const res = await api.get(`${RECIPES_API_URL}/${id}/items`);
    return res.data;
}

const editItemInRecipe =  async (recipe_id, item_id, new_quantity, new_unit) => {
    let data = {
        new_quantity: new_quantity,
        new_unit: new_unit
    };
    const res = await api.put(`${RECIPES_API_URL}/${recipe_id}/items/${item_id}`, data);
    return res.data;
}

const addItemToRecipe = async (recipe_id, item_id, quantity, unit) => {
    let data = {
        item_id: item_id,
        quantity: quantity,
        unit: unit
    }
    const res = await api.post(`${RECIPES_API_URL}/${recipe_id}/items`, data);
    return res.data;
};

const deleteItemInRecipe = async (recipe_id, item_id) => {
    const res = await api.delete(`${RECIPES_API_URL}/${recipe_id}/items/${item_id}`);
    return res.data;
}

const editRecipe = async (id, name, prep_time, cook_time, servings, instructions) => {
    let data = {
        name: name,
        prep_time_minutes: prep_time,
        cook_time_minutes: cook_time,
        servings: servings,
        instructions: instructions
    };
    console.log(data);
    const res = await api.put(`${RECIPES_API_URL}/${id}`, data);
    return res.data;
}

const deleteRecipe = async (id) => {
    const res = await api.delete(`${RECIPES_API_URL}/${id}`);
    return res.data;
}


export {getRecipes, getRecipe, getItemsInRecipe, editItemInRecipe, addItemToRecipe, deleteItemInRecipe, editRecipe, deleteRecipe};