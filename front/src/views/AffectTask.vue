<template>
      <title>Affectation - Tâches</title>
    <div class="affecttask">
      <h1>Affectation d'une tâche</h1>
    
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Libelle</th>
      <th scope="col">Heure de début</th>
      <th scope="col">Heure de fin</th>
      <th scope="col">Nom de l'employé</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.id }}</td>
      <td>{{ task.libelle }}</td>
      <td>{{ time(task.heureDebut) }}</td>
      <td>{{ time(task.heureFin) }}</td>
      <td>{{ task.employee }}</td>
      <a href="#" class="btn btn-success" @click="deleteTask(task.id)">Affecter</a>
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
      tasks:[],
      employee:null,
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

    async getEmployee(id){
      const response = await axios.get('https://127.0.0.1:8000/api/employees/'+id);
      this.employee = response.data['hydra:member']
      //Affiche les données dans la console
      console.warn(this.employee)
    },
    time(d){
      return formatTime(d);
    }
  }
  
};
</script>