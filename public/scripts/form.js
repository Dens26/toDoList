// Fonctions et classes nécessaires
import { createId, SaveTaskTab, LoadTaskTab } from "../modules/functions.js";
import { TaskObject } from "../modules/class.js";

// Référence DOM
const submitButton = document.querySelectorAll(".submit-button");
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");

// Récupération du tableau de tâche et de la tâche à modifier
const edit = JSON.parse(sessionStorage.getItem("Edit"));
// Récupération du tableau
const taskTab = await LoadTaskTab("form.html");
console.log(taskTab);

// Récupération du bouton déclencheur du formulaire
let params = new URLSearchParams(document.location.search);
if (params.get('value') == "edit") {
    // Affichage des valeurs dans le formulaire
    inputName.value = edit.name;
    inputDescription.value = edit.description;
    submitButton[0].textContent = "Modifier";
}

// Ecouteur sur le bouton "Ajouter"
submitButton[0].addEventListener("click", () => {
    // Si la tâche n'est pas null
    if (inputName.value.length != 0 && inputDescription.value.length != 0) {
        if (params.get('value') == "new") {
            // Création de l'id
            let id = createId(taskTab);

            // Nouvelle variables task
            let task = new TaskObject(id, inputName.value, inputDescription.value, false);

            // Ajout de la tâche dans les "Added" et "Task"
            localStorage.setItem("Added", JSON.stringify(task));

            taskTab.push(task);
            // localStorage.setItem("Task", JSON.stringify(taskTab));
            SaveTaskTab(taskTab);
        }
        else if (params.get('value') == "edit") {
            // Récupération de la tâche à modifier
            let task = taskTab.find(data => data.id == edit.id);

            // Modification de la tâche
            task.name = inputName.value;
            task.description = inputDescription.value;

            // Ajout de la tâche dans les "Updated" et "Task"
            localStorage.setItem("Updated", JSON.stringify(task));
            // localStorage.setItem("Task", JSON.stringify(taskTab));
            SaveTaskTab(taskTab);
        }
    }
})


