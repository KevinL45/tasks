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
            <option v-for="e in employees" :key="e.id" v-bind:value="e.id">{{ e.name }}</option>
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
      //Retourne false si le bouton "Modifier" est cliqué
      visibleForm:false,
      //Initialisation de la variable
      task:null,

    };
  },
  mounted(){
    //Liste des tâches
    this.getTasks();
    //Liste des employées
    this.getEmployees();

  },
  methods:{
    
   async getTasks(){
      const response = await axios.get('https://127.0.0.1:8000/api/tasks');
      //La liste des tâches
      this.tasks = response.data['hydra:member']
    },

    async getEmployees(){
      const response = await axios.get('https://127.0.0.1:8000/api/employees');
      //La liste des employés
      this.employees = response.data['hydra:member']
    },

    getEmployeeNameUrl(url_api){
      //L'id de l'employé
      let employee_id = this.extractId(url_api);
      //Trouve l'id dans la liste des employés
      const employee = this.employees.find(e => e.id === employee_id);
      //Si l'employé existe, affiche son nom sinon "Non affecté"
      return employee ? employee.name : 'Non affecté';
    },
    

    async updateTask(task){
          if(this.task.employee && this.task.libelle){
            if (this.calclulHours(task)) {
                //Si l'employé existe
                  //Modification des données de la tâche
                  const response = await axios.put("https://127.0.0.1:8000/api/task/update/"+task.id,task);
                  //Affiche le status de la requête
                  console.warn(response)
                  //Retourne false si le bouton "Modifier" est cliqué
                  this.visibleForm = false
                  //Liste des tâches
                  this.getTasks()
                  //Affiche un message 
                  alert('La tâche a été modifié.');
            }else{
                  alert('L\'employé ne peut pas traiter plus d\'une tâche à la fois et ne peut pas travailler plus de 8 heures.');
            }
        }else{
            //Affiche un message 
            alert('Champs incomplet');
          }

    },

    extractId(url_api)
    {
      //Retourne le chiffre après le /
      return url_api ? parseInt(url_api.split('/').pop()) : null;
    },


    calclulHours(newTask) {

        //Affiche l'id de l'employer 
        console.log( "New Task : "+newTask.employee)
        //
        const convertToMinutes = time => time.split(':').reduce((h, m) => h * 60 + +m);
        //Converti heureDebut et heureFin en minutes
        const [newStart, newEnd] = [convertToMinutes(newTask.heureDebut), convertToMinutes(newTask.heureFin)];
        //Si les minutes de fin sont inferieurs aux minutes de début, retourne false
        if (newEnd <= newStart) return false;  
        //Calcul la durée
        const durationTask = newEnd - newStart;
        //Affiche la durée dans la console
        console.log("Durée : "+durationTask)
        //Total de minutes
        let totalMinutes = 0;

        //Liste des tâches 
        for (let task of this.tasks) {
          //Si l'id de l'employé existe 
          if (this.extractId(task.employee) === newTask.employee) {
              
              //Converti les heures en objet Date
              const debut = new Date(task.heureDebut)
              const fin = new Date(task.heureFin)
              //Calcul la duréé
              const duration = (fin - debut) / 60000
              totalMinutes += duration;

            }
        }
        console.log("total : "+totalMinutes)

        return durationTask + totalMinutes <= 480;        
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