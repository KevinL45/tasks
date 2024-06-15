<template>
    <title>Liste des tâches</title>
    <div class="Home">
      <h1>Liste des tâches</h1>
    </div>
    <br>
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Tache</h5>
    <p class="card-text">Nom de l'employée</p>
    <p class="card-text">Heure de début et fin</p>
    <a href="#" class="btn btn-danger">Supprimer</a>
  </div>
</div>

</template>

<script>
//import TaskService from "@/services/TaskService.vue";
import axios from 'axios';
export default {
  data(){
    return{
      tasks:[
      ]
    }
  },
  mounted(){
    this.getTasks();

  },
  methods:{
    getTasks(){
      axios.get('https://127.0.0.1:8000/api/tasks').then(res =>{
        console.log(res)
      })
    }
  }
  
};
</script>