import { REACT_APP_API_URL, api } from "./config";

const ITEMS_API_URL = `${REACT_APP_API_URL}/item`;

const getItems = async () => {
    const res = await api.get(`${ITEMS_API_URL}/`)
    return res.data;
}

const editItemName = async (id, name) => {
    const data = {
        name: name
    }
    const res = await api.put(`${ITEMS_API_URL}/${id}`, data)
    return res.data;
}

const deleteItem = async (id) => {
   const res = await api.delete(`${ITEMS_API_URL}/${id}`); 
   return res.data;
}

const addItem = async (name, category) => {
    const data = {
        name: name,
        category: category
    }

    const res = await api.post(`${ITEMS_API_URL}`, data)
    return res.data;
}

export {getItems, editItemName, deleteItem, addItem};