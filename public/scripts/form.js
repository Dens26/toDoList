// Fonctions et classes nécessaires
import { createId, SaveTaskTab, LoadTaskTab } from "../modules/functions.js";
import { TaskObject } from "../modules/class.js";

// Référence DOM
const formTask = document.querySelector("#form-task");

// Récupération du tableau de tâche et de la tâche à modifier
const edit = JSON.parse(sessionStorage.getItem("Edit"));

// Récupération du tableau
let taskTab = await LoadTaskTab("form.html");
if (taskTab.toString().substr(0, 10) == 'Error: 500')
    taskTab = [];

// Récupération du bouton déclencheur du formulaire
let params = new URLSearchParams(document.location.search);
if (params.get('value') == "edit") {
    // Affichage des valeurs dans le formulaire
    formTask[0].value = edit.name;
    formTask[1].textContent = edit.description;
    formTask[2].textContent = "Modifier";
}

// Ecouteur sur le bouton "Ajouter"
formTask.addEventListener("submit", async (evt) => {
    // Si la tâche n'est pas null
    const formData = new FormData(formTask);
    const name = formData.get("name");
    const description = formData.get("description");

    if (name.length != 0 && description.length != 0) {
        evt.preventDefault();
        if (params.get('value') == "new") {
            // Création de l'id
            let id = createId(taskTab);

            // Nouvelle variables task
            taskTab.push(new TaskObject(id, name, description, false));
            await SaveTaskTab(taskTab);
        }
        else if (params.get('value') == "edit") {
            // Récupération de la tâche à modifier
            let task = taskTab.find(data => data.id == edit.id);

            // Modification de la tâche
            task.name = name;
            task.description = description;

            // Enregistrement
            await SaveTaskTab(taskTab);
        }
        window.location.href = "index.html";
    }
})


