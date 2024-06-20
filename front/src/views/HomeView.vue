<template>
    <title>Liste des tâches</title>
    <div class="Home">
      <h1>Liste des tâches</h1>

      <table class="table">
  <thead>
    <tr>
      <th scope="col"><a class="btn btn-primary" @click="sortById()">Id</a></th>
      <th scope="col"><a class="btn btn-primary" @click="sortByLibelle()">Libelle</a></th>
      <th scope="col"><a class="btn btn-primary" @click="sortByHeureDebut()">Heure de début</a></th>
      <th scope="col"><a class="btn btn-primary" @click="sortByHeureFin()">Heure de fin</a></th>
      <th scope="col">...</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.id }}</td>
      <td>{{ task.libelle }}</td>
      <td>{{ time(task.heureDebut) }}</td>
      <td>{{ time(task.heureFin) }}</td>
      <td>
      <a class="btn btn-danger" @click="deleteTask(task.id)">Supprimer</a>
    </td>
    </tr>
  </tbody>
      </table>
    </div>

</template>

<script>

import axios from 'axios';
import {formatTime} from "@/components/js/FormatTime";

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

    async sortById(){
      //Trier par Id
      this.tasks.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }); 
    },

    async sortByLibelle(){
      //Trier par Id
      this.tasks.sort((a, b) => {
      if (a.libelle < b.libelle) {
        return -1;
      }
      if (a.libelle > b.libelle) {
        return 1;
      }
      return 0;
    }); 
    },

    async sortByHeureDebut(){
      //Trier par Id
      this.tasks.sort((a, b) => {
      if (a.heureDebut < b.heureDebut) {
        return -1;
      }
      if (a.heureDebut > b.heureDebut) {
        return 1;
      }
      return 0;
    }); 
    },

    async sortByHeureFin(){
      //Trier par Id
      this.tasks.sort((a, b) => {
      if (a.heureFin < b.heureFin) {
        return -1;
      }
      if (a.heureFin > b.heureFin) {
        return 1;
      }
      return 0;
    }); 
    },
    time(d){
      return formatTime(d);
    }
  }
};
</script>