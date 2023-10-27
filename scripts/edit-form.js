// Référence du DOM
const editTaskButton = document.querySelectorAll(".addTask-button");
const taskName = document.getElementById('name');
const taskDescription = document.getElementById('description');

// Récupération du tableau de tâche et de la tâche à modifier
const taskTab = JSON.parse(localStorage.getItem("Task")) || [];
const edit = JSON.parse(sessionStorage.getItem("Edit"));

// Affichage des valeurs dans le formulaire
taskName.value = edit.name;
taskDescription.value = edit.description;

editTaskButton[0].addEventListener("click", () => {
    // Si la tâche n'est pas null
    if (inputName.value.length != 0 && inputDescription.value.length != 0) {
        task = taskTab.find(data => data.id == edit.id);

        task.name = taskName.value;
        task.description = taskDescription.value;

        // Ajout de la tâche dans les "Updated" et "Task"
        localStorage.setItem("Updated", JSON.stringify(task));
        localStorage.setItem("Task", JSON.stringify(taskTab));
    }
})