
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
    getTasks(){
        return api.get('/tasks')
    },
    //Saisir la tâche
    postTask(task){
        return api.post('/task',task)
    },
    //Modifier la tâche
    updateTask(id, task){
        return api.put('/task/'+id, task)
    },
    //Supprimer une tache
    deleteTask(id){
        return api.delete('/tasks/'+id)
    }
}