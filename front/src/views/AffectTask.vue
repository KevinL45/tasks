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
          <td>{{ getEmployeeNameUrl(task.employee) }}</td>
          <td>{{ time(task.heureDebut) }}</td>
          <td>{{ time(task.heureFin) }}</td>
          <td>
            <button type="submit" class="btn btn-primary" @click="showForm(task)">Modifier</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <br />
  <div v-if="visibleForm">
    <form method="put" @submit.prevent="update(task)">
      <div class="form-group">
        <label for="libelle">Tâche</label>
        <input name="libelle" type="text" class="form-control" v-model="task.libelle" placeholder="Entrez le nom de la tâche" required>
      </div>
      <div class="form-group">
        <label for="employe">Employé</label>
        <select class="form-select" v-model="task.employee" required>
          <option v-for="e in employees" :key="e.id" :value="e.id">{{ e.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="heureDebut">Heure de début</label>
        <input v-model="task.heureDebut" name="heureDebut" type="time" class="form-control" placeholder="Entrez l'heure de début" required>
      </div>
      <div class="form-group">
        <label for="heureFin">Heure de fin</label>
        <input v-model="task.heureFin" name="heureFin" type="time" class="form-control" placeholder="Entrez l'heure de fin" required>
      </div>
      <button type="submit" class="btn btn-primary">Affecter</button>
    </form>
  </div>
</template>

<script>
import { formatTime } from "@/components/js/FormatTime";
import { getTasks, updateTask } from "@/services/TaskService";
// import { getEmployees } from "@/services/EmployeeService";
import axios from "axios";

export default {
  data() {
    return {
      // Initialisation des tableaux
      tasks: [],
      employees: [],
      // Retourne false si le bouton "Modifier" est cliqué
      visibleForm: false,
      // Initialisation de la variable
      task: null,
    };
  },
  mounted() {
    // Liste des tâches
    this.listTasks();
    // Liste des employées
    this.listEmployees();
  },
  methods: {
    async listTasks() {
      // Affiche la liste des tâches
      this.tasks = await getTasks();
    },

    async listEmployees() {
      //Affiche liste des employés
      // this.employees = await getEmployees();
        const response = await axios.get('https://127.0.0.1:8000/api/employees');
        this.employees = response.data['hydra:member'];
    },

    getEmployeeNameUrl(url_api) {
      // L'id de l'employé
      let employee_id = this.extractId(url_api);
      // Trouve l'id dans la liste des employés
      const employee = this.employees.find((e) => e.id === employee_id);
      // Si l'employé existe, affiche son nom sinon "Non affecté"
      return employee ? employee.name : 'Non affecté';
    },

    async update(task) {
      // Si l'employé existe
      if (this.task.employee && this.task.libelle) {
        if (this.calculHours(task)) {
          // Modification des données de la tâche
          await updateTask(task.id, task);
          // Retourne false si le bouton "Modifier" est cliqué
          this.visibleForm = false;
          // Liste des tâches
          this.listTasks();
          // Affiche un message
          alert('La tâche a été modifiée.');
        }
      } else {
        // Affiche un message
        alert('Champs incomplets');
      }
    },

    extractId(url_api) {
      // Retourne le chiffre après le /
      return url_api ? parseInt(url_api.split('/').pop()) : null;
    },

    calculHours(newTask) {
      // Affiche l'id de l'employé
      console.log("New Task : " + newTask.employee);
      // Converti heureDebut et heureFin en minutes
      const convertToMinutes = (time) => time.split(':').reduce((h, m) => h * 60 + +m);
      const [newStart, newEnd] = [convertToMinutes(newTask.heureDebut), convertToMinutes(newTask.heureFin)];
      // Si les minutes de fin sont inférieures aux minutes de début, retourne false avec un message
      if (newEnd < newStart){
        alert("l'heure de fin est à l'heure de début");
        return false;
      }
      // Calcul la durée
      const durationTask = newEnd - newStart;
      // Affiche la durée dans la console
      console.log("Durée : " + durationTask);
      // Total de minutes
      let totalMinutes = 0;

      // Liste des tâches
      for (let task of this.tasks) {
        // Si l'id de l'employé existe
        if (this.extractId(task.employee) === newTask.employee) {
          // Converti les heures en objet Date
          const debut = new Date(task.heureDebut);
          const fin = new Date(task.heureFin);
          // Calcul la durée, 1 minutes = 60000
          const duration = (fin - debut) / 60000;
          totalMinutes += duration;
        }
      }
      // La durée de la tâche modifié + la durée total des tâches affecté par l'employé
      let total = durationTask + totalMinutes;

      // Affiche les résultat dans la console
      console.log("total de minutes : "+totalMinutes);
      console.log("Total : "+total)

      //Si le total est inferieur à 480 (8 heures), retourne true sinon false avec un message
      if (total <= 480){
        return true
      }else{
        alert("L'employé ne peut pas traiter plus d'une tâche à la fois et ne peut pas travailler plus de 8 heures.");
        return false
      }
    },

    showForm(task) {
      // Retourne true si le bouton "Modifier" est cliqué
      this.visibleForm = true;

      // Mise à jour du formulaire
      this.task = {
        id: task.id,
        libelle: task.libelle,
        heureDebut: this.time(task.heureDebut),
        heureFin: this.time(task.heureFin),
        employee: task.employee
      };
    },

    time(d) {
      return formatTime(d);
    }
  }
};
</script>
