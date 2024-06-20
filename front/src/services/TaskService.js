import axios from 'axios';

export const getTasks = async () => {
    const response = await axios.get('https://127.0.0.1:8000/api/tasks');
    console.warn(response);
    return response.data['hydra:member'];
};

export const postTask = async (task) => {
    const response = await axios.post('https://127.0.0.1:8000/api/task/create', task);
    console.warn(response);
};

export const updateTask = async (id, task) => {
   const response = await axios.put("https://127.0.0.1:8000/api/task/update/" + id, task);
   console.warn(response);
};

export const deleteTask = async (id) => {
    await axios.delete("https://127.0.0.1:8000/api/tasks/" + id);
};
