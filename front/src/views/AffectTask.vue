<template>
      <title>Affectation - Tâches</title>
    <div class="affecttask">
      <h1>Affectation d'une tâche</h1>
    
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Libelle</th>
      <th scope="col">La tâche est affecté à</th>
      <th scope="col">Heure de début</th>
      <th scope="col">Heure de fin</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.id }}</td>
      <td>{{ task.libelle }}</td>
      <td>{{ task.employee }}</td>
      <td>{{ time(task.heureDebut) }}</td>
      <td>{{ time(task.heureFin) }}</td>
      <td>
        <button type="submit" class="btn btn-primary" @click="showForm(task)" >Modifier</button>
      </td>
    </tr>
  </tbody>
      </table>
    </div>

    <br/>
  <div v-if="visibleForm" > 
  <form method="put" @submit.prevent="updateTask(task)">
      <div class="form-group">
          <label for="libelle">Tâche</label>
          <input  name="libelle" type="text" class="form-control" v-model="task.libelle" placeholder="Entrez le nom de la tâche"   required>
        </div>
        <div class="form-group">
          <label for="employe">Employé</label>
          <select class="form-select" v-model="task.employee" required>
            <option v-for="e in employees" :key="e.id" :values="e.id">{{ e.id }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="heureDebut">Heure de début</label>
          <input v-model="task.heureDebut" name="heureDebut" type="time" class="form-control" placeholder="Entrez l'heure de début"   required>
        </div>
        <div class="form-group">
          <label for="heureFin">Heure de fin</label>
          <input v-model="task.heureFin" name="heureFin" type="time" class="form-control" placeholder="Entrez l'heure de fin"   required>
        </div>
        <button type="submit" class="btn btn-primary" @click="updateTask(task)">Affecter</button>
  </form></div>
   

 
  </template>

<script>
import axios from 'axios';
import {formatTime} from "@/components/js/FormatTime"

export default {
  data(){
    return{
      //Initialisation des tableaux
      tasks:[],
      employees:[],
      //boolean
      visibleForm:false,
      //Initialisation de la variable
      task:null,

    };
  },
  mounted(){
    this.getTasks();
    this.getEmployees();

  },
  methods:{
    
   async getTasks(){
    //Affiche la liste des tâches
      const response = await axios.get('https://127.0.0.1:8000/api/tasks');
      this.tasks = response.data['hydra:member']
      //Affiche les données dans la console
      console.warn(this.tasks)
    },

    async getEmployees(){
      const response = await axios.get('https://127.0.0.1:8000/api/employees');
      this.employees = response.data['hydra:member']
      //Affiche les données dans la console
      console.warn(this.employees)
    },

    async updateTask(task){
      //Affiche les données dans la console
      console.log(task)
      const response = await axios.put("https://127.0.0.1:8000/api/task/update/"+task.id,task);
      console.warn(response)
      //Retourne false si le bouton "Modifier" est cliqué
      this.visibleForm = false
      this.getTasks()

    },

    showForm(task){
      
      //Retourne true si le bouton "Modifier" est cliqué
      this.visibleForm = true

      //Tâche choisi
      this.task = {
        id : task.id,
        libelle : task.libelle,
        heureDebut : this.time(task.heureDebut),
        heureFin : this.time(task.heureFin)
      }
    },

    time(d){
      return formatTime(d);
    }
  }
  
};
</script>