<template>
    <title>Liste des tâches</title>
    <div class="Home">
      <h1>Liste des tâches</h1>
    </div>
    <br>
  <div v-for="task in tasks" :key="task.id" class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ task.libelle }}</h5>
      <p class="card-text">Nom de l'employée</p>
      <p class="card-text"> Date de début : {{ task.heureDebut }}</p>
      <p class="card-text">Date de fin : {{ task.heureFin }}</p>
      <a href="#" class="btn btn-danger" @click="deleteTask(task.id)">Supprimer</a>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
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
    //Affiche la liste des tasks
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
    }
  }
  
};
</script>