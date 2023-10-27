// Référence du DOM
const editTaskButton = document.querySelectorAll(".addTask-button");
const inputName = document.getElementById('name');
const inputDescription = document.getElementById('description');

// Récupération du tableau de tâche et de la tâche à modifier
const taskTab = JSON.parse(localStorage.getItem("Task")) || [];
const edit = JSON.parse(sessionStorage.getItem("Edit"));

// Affichage des valeurs dans le formulaire
inputName.value = edit.name;
inputDescription.value = edit.description;

editTaskButton[0].addEventListener("click", () => {
    // Si la tâche n'est pas null
    if (inputName.value.length != 0 && inputDescription.value.length != 0) {
        
        task = taskTab.find(data => data.id == edit.id);

        task.name = inputName.value;
        task.description = inputDescription.value;

        // Ajout de la tâche dans les "Updated" et "Task"
        localStorage.setItem("Updated", JSON.stringify(task));
        localStorage.setItem("Task", JSON.stringify(taskTab));
    }
})