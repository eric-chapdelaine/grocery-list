import { REACT_APP_API_URL, api } from "./config";

const PLANNED_MEALS_API_URL = `${REACT_APP_API_URL}/planned_meal`

const getPlannedMeals = async () => {
    const res = await api.get(`${PLANNED_MEALS_API_URL}/`);
    return res.data;
}

const createPlannedMeal = async (date, meal_type, recipe_id) => {
    let data = {
        date: date,
        meal_type: meal_type,
        recipe_id: recipe_id
    }
    const res = await api.post(`${PLANNED_MEALS_API_URL}/`, data)
    return res.data;
}

const editPlannedMeal = async (id, date, meal_type, recipe_id) => {
    let data = {
        date: date,
        meal_type: meal_type,
        recipe_id: recipe_id
    }
    const res = await api.put(`${PLANNED_MEALS_API_URL}/${id}`, data);
    return res.data;
}

const deletePlannedMeal = async (id) => {
    const res = await api.delete(`${PLANNED_MEALS_API_URL}/${id}`);
    return res.data;
}

export {getPlannedMeals, createPlannedMeal, editPlannedMeal, deletePlannedMeal}