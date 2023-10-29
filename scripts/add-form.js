import { createId } from "../modules/functions.js";
import { TaskObject } from "../modules/class.js";

// Référence DOM
const addTaskButton = document.querySelectorAll(".addTask-button");
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");

// Récupération du tableau
const taskTab = JSON.parse(localStorage.getItem("Task")) || [];

// Ecouteur sur le bouton "Ajouter"
addTaskButton[0].addEventListener("click", evt => {
    // Si la tâche n'est pas null
    if (inputName.value.length != 0 && inputDescription.value.length != 0) {
        let id = createId(taskTab);

        // Nouvelle variables task
        let task = new TaskObject(id, inputName.value, inputDescription.value, false);

        // Ajout de la tâche dans les "Added" et "Task"
        localStorage.setItem("Added", JSON.stringify(task));

        taskTab.push(task);
        localStorage.setItem("Task", JSON.stringify(taskTab));
    }
})