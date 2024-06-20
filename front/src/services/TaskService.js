
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
    export const getTasks = async () => {
        const response = await api.get('/tasks');
        return response.data["hydra:member"];
    };

    export const postTask = async (task) => {
        const response = await api.post('/task/create', task);
        console.warn(response);
    };

    export const updateTask = async (id, task) => {
        const response = await api.put("/task/update/" + id, task);
        console.warn(response);
    };

    export const deleteTask = async (id) => {
        const response = await api.delete("/tasks/" + id);
        console.warn(response);
    };