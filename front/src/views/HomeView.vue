<template>
    <title>Liste des tâches</title>
    <div class="Home">
      <h1>Liste des tâches</h1>

      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Libelle</th>
      <th scope="col">Heure de début</th>
      <th scope="col">Heure de fin</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.id }}</td>
      <td>{{ task.libelle }}</td>
      <td>{{ time(task.heureDebut) }}</td>
      <td>{{ time(task.heureFin) }}</td>
      <a href="#" class="btn btn-danger" @click="deleteTask(task.id)">Supprimer</a>
    </tr>
  </tbody>
      </table>
    </div>

</template>

<script>

import axios from 'axios';
import {formatTime} from "@/components/js/FormatTime"

export default {
  data(){
    return{
      tasks:[]
    };
  },
  mounted(){
    this.getTasks();

  },
  methods:{
    
   async getTasks(){
    //Affiche la liste des tâches
      const response = await axios.get('https://127.0.0.1:8000/api/tasks');
      this.tasks = response.data['hydra:member']
      //Affiche les données dans la console
      console.warn(this.tasks)
    },

    async deleteTask(id){
      //Supprimer une tâche
      await axios.delete("https://127.0.0.1:8000/api/tasks/"+id);
      console.log("La tâche est supprimée")
       // Mise à jour des tâches
       this.tasks = this.tasks.filter(task => task.id !== id);
    },
    time(d){
      return formatTime(d);
    }
  }
};
</script>