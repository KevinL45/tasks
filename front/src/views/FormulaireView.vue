<template>
  <title>Formulaire</title>
    <div class="formulaire">
      <h1>Formulaire</h1>
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

  export default{
    name:"postData",
    data(){
      return {
        formData:{
          libelle:null,
          heureDebut:"10:00",
          heureFin:"18:00"
        }
      }
      
    },
    methods:{
      submit(){
          //Afficher les données dans la console
          console.log(this.formData)

          //Insertion des données dans la base de donneés passant par une API

          //Retour à la page d'accueil avec un message de validation
          
      }
    }
  }

</script>