<template>
  <div class="Home">
        <div class="container">
          <h1>Liste des tâches</h1>
          <table class="table">
            <thead>
              <tr>
                <th class="name"><a @click="sortById()" >Id</a></th>
                <th class="name"><a @click="sortByLibelle()">Libelle</a></th>
                <th class="name"><a @click="sortByHeureDebut()">Heure de début</a></th>
                <th class="name"><a @click="sortByHeureFin()">Heure de fin</a></th>
                <th class="name">...</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.libelle }}</td>
                <td>{{ time(task.heureDebut) }}</td>
                <td>{{ time(task.heureFin) }}</td>
                <td>
                  <a class="btn btn-danger" @click="deleteOneTask(task.id)">Supprimer</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<style>
.table {
  border: 1px solid #ccc; 
  background-color: #f8f9fa; 
  padding: 15px; 
}
.name{
  cursor: pointer;
}
</style>

<script>
import { formatTime } from "@/components/js/FormatTime";
import { getTasks, deleteTask } from '@/services/TaskService';

export default {
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    this.listTasks();
  },
  methods: {
    async listTasks() {
      // Affiche la liste des tâches
      this.tasks = await getTasks();
      // Affiche les données dans la console
      console.warn(this.tasks);
    },

    async deleteOneTask(id) {
      // Supprimer une tâche
      await deleteTask(id);
      //Affiche un message
      alert('La tâche a été supprimé.');
      // Mise à jour des tâches
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    sortById() {
      // Trier par Id
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

    sortByLibelle() {
      // Trier par Libelle
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

    sortByHeureDebut() {
      // Trier par Heure de début
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

    sortByHeureFin() {
      // Trier par Heure de fin
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

    time(d) {
      return formatTime(d);
    }
  }
};
</script>
