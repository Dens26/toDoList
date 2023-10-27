// Référence DOM
const addTaskButton = document.querySelectorAll(".addTask-button");

// Classe pour la création de tâche
class TaskObject {
    constructor(id, name, description, finished) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.finished = finished;
    }
}

// Référence du DOM
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");

// Récupération du tableau
const taskTab = JSON.parse(localStorage.getItem("Task")) || [];

// Ecouteur sur le bouton ajouter
addTaskButton[0].addEventListener("click", evt => {
    // Si la tâche n'est pas null
    if (inputName.value.length != 0 && inputDescription.value.length != 0) {
        id = 0;
        if (taskTab.length > 0) {
            // Création de l'id unique
            idTab = [];
            for (let i = 0; i < taskTab.length; i++) {
                idTab.push(taskTab[i].id);
            }
            id = Math.max(...idTab) + 1;
        }

        // Nouvelle variables task
        task = new TaskObject(id, inputName.value, inputDescription.value, false);

        // Ajout de la tâche dans les "Added" et "Task"
        localStorage.setItem("Added", JSON.stringify(task));

        taskTab.push(task);
        localStorage.setItem("Task", JSON.stringify(taskTab));
    }
})