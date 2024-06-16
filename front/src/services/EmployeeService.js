
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
export default{

    //Affiche toutes les tâches
    getEmployee(){
        return api.get('/employees')
    },
    //Saisir la tâche
    postEmployee(employee){
        return api.post('/employees', employee)
    },
    //Modifier la tâche
    updateEmployee(id, employee){
        return api.put('/employees/'+id, employee)
    },
    //Supprimer une tache
    deleteEmployee(id){
        return api.delete('/employees/'+id)
    }
}

