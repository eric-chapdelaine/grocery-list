import { REACT_APP_API_URL, api } from "./config";

const GROCERY_LIST_API_URL = `${REACT_APP_API_URL}/grocery_list`;

const getGroceryLists = async () => {
    const res = await api.get(`${GROCERY_LIST_API_URL}/`)
    return res.data;
}

const addGrocerylist = async (name) => {
    const data = {name: name};
    const res = await api.post(`${GROCERY_LIST_API_URL}/`, data);
    return res.data;
}

const updateGroceryList = async (id, name) => {
    const data = {name: name};
    const res = await api.put(`${GROCERY_LIST_API_URL}/${id}`, data);
    return res.data;
}

const deleteGroceryList = async (id) => {
    const res = await api.delete(`${GROCERY_LIST_API_URL}/${id}`);
    return res.data;
}

const getItemsFromList = async (id) => {
    const res = await api.get(`${GROCERY_LIST_API_URL}/${id}`);
    return res.data;
}

const addItemToList = async (id, item_id, quantity, unit) => {
    const data = {
        itemId: item_id,
        quantity: quantity,
        unit: unit
    }
    const res = await api.post(`${GROCERY_LIST_API_URL}/${id}/items`, data);
    return res.data;
}

const deleteItemFromList = async (id) => {
    const res = await api.delete(`${GROCERY_LIST_API_URL}/item/${id}`);
    return res.data;
}

const setPickedUp = async (id, picked_up) => {
    const data = {
        picked_up: picked_up 
    }
    const res = await api.post(`${GROCERY_LIST_API_URL}/item/${id}`, data);
    return res.data
}

export {getGroceryLists, addGrocerylist, updateGroceryList, deleteGroceryList, getItemsFromList, addItemToList, deleteItemFromList, setPickedUp};