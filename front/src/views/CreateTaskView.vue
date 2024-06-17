<template>
  <title>Formulaire - Tâche</title>
    <div class="formulaire">
      <h1>Création d'une tâche</h1>
    </div>
    <form method="post" @submit.prevent="submit">
        <div class="form-group" action="home">
          <label for="libelle">Tâche</label>
          <input  name="libelle" type="text" class="form-control" v-model="formData.libelle" placeholder="Entrez le nom de la tâche"   required>
        </div>
        <div class="form-group">
          <label for="heureDebut">Heure de début</label>
          <input name="heureDebut" type="time" class="form-control" v-model="formData.heureDebut" placeholder="Entrez l'heure de début"   required>
        </div>
        <div class="form-group">
          <label for="heureFin">Heure de fin</label>
          <input  name="heureFin" type="time" class="form-control" v-model="formData.heureFin" placeholder="Entrez l'heure de fin"   required>
        </div>
        <button type="submit" class="btn btn-primary">Ajouter</button>
  </form>
</template>

  <script>
  import axios from 'axios';
  //import TaskService from '@/services/TaskService';

  export default{
    name:"createTask",
    data(){
      return {
        formData:{
          libelle:null,
          heureDebut:null,
          heureFin:null
        },
        jsonFormat:null
      }
      
    },
    methods:{
      async submit() {
          //Insertion des données dans la base de donneés passant par une API
          const response = await axios.post('https://127.0.0.1:8000/api/task/create',this.formData);
          console.warn(response)
          //Reintilalisation du formulaire
          this.formData = {
          libelle: null,
          heureDebut: null,
          heureFin: null,
          };
      }
    }
  }

</script>