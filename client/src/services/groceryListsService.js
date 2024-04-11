import { REACT_APP_API_URL, api } from "./config";

const GROCERY_LIST_API_URL = `${REACT_APP_API_URL}/grocery_list`;

const getGroceryLists = async () => {
    const res = await api.get(`${GROCERY_LIST_API_URL}/get_lists`)
    return res.data;
}

const addGrocerylist = async (name) => {
    const data = {name: name};
    const res = await api.post(`${GROCERY_LIST_API_URL}/add_list`, data);
    return res.data;
}

export {getGroceryLists, addGrocerylist};