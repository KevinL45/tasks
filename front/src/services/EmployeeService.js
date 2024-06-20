
import { axios } from "axios";

//Appeler une API
const api = axios.create({
    //L'url de l'api
    baseURL:"https://127.0.0.1:8000/api",
    //Format JSON
    headers: {
    'Content-Type': 'application/json'
  }
});

export const getEmployees = async () => {
    const response = await api.get('/employees');
    return response.data["hydra:member"];
};

