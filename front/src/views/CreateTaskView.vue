<template>
  <title>Formulaire - Tâches</title>
    <div class="formulaire">
      <h1>Création d'une tâche</h1>
    </div>
    <form method="post" @submit.prevent="submit">
        <div id="formulaire" class="form-group" action="home">
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

  export default{
    name:"createTask",
    data(){
      return {
        formData:{
          libelle:null,
          heureDebut:"09:00",
          heureFin:"17:00"
        },
        jsonFormat:null
      }
      
    },
    methods:{
      async submit() {

          //Transformer les données en JSON
          this.jsonFormat = JSON.stringify(this.formData,null,2)

          //Affichage des données en JSON
          console.warn(this.jsonFormat)

          //Insertion des données dans la base de donneés passant par une API
          await axios.post('https://127.0.0.1:8000/api/tasks/',this.jsonFormat)
          //Si correct, affiche la bonne réponse
          .then(response => { console.log(response); })
          //Si faux, la requête est refusé
          .catch(error => { console.log(error); });

          //Reintilalisation du formulaire
          this.formData = {
          libelle: null,
          heureDebut: '09:00',
          heureFin: '17:00'
          };
      }
    }
  }

</script>