import _axios from "axios";

const REACT_APP_API_URL = "http://localhost:8000";
// const REACT_APP_API_URL = "http://192.168.1.157:8000"

const api = _axios.create();

export {REACT_APP_API_URL, api};