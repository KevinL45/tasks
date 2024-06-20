import { axios } from "axios";

export const getEmployees = async () => {
    const response = await axios.get('https://127.0.0.1:8000/api/employees');
    return response.data['hydra:member'];
};