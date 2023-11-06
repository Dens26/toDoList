// Fonctions nécessaires
import { LoadTaskTab, SaveTaskTab, UpdateDisplay, UpdateCardHeight, ShowTaskNumber } from "../modules/functions.js";


// Chargement des tâches dans la constante taskTab[]
const taskTab = await LoadTaskTab("index.html");
// Référence DOM
const cardGroup = document.querySelectorAll(".card-group");

/**
 * Ajout des écouteurs d'événements sur chaque groupe de cartes.
 */
for (let i = 0; i < cardGroup.length; i++) {
    const checkbox = cardGroup[i].children[0].children[0];
    const deleteButton = cardGroup[i].children[1].children[0];
    const editButton = cardGroup[i].children[1].children[1];

    // Ecouteurs sur les checkbox
    checkbox.addEventListener("click", () => {
        // Modification de la valeur du checkbox dans le tableau de tâche
        taskTab[i].finished = cardGroup[i].children[0].children[0].checked;

        // Enregistrement dans le localStorage
        // localStorage.setItem("Task", JSON.stringify(taskTab));
        SaveTaskTab(taskTab);
        if (taskTab[i].finished) {
            localStorage.setItem("Finished", JSON.stringify(taskTab[i]));
        }
        // Mise à jour de l'affichage
        UpdateDisplay(taskTab, cardGroup[i], parseInt(document.querySelector(".task-nbr").textContent));
    })

    // Ecouteurs sur les boutons "Supprimer"
    deleteButton.addEventListener("click", () => {
        if (confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")) {
            // Ajout d'une clé dernier supprimé
            localStorage.setItem("deleted", JSON.stringify(taskTab[i]));

            // Suppression de la tâche
            taskTab.splice(i, 1);
            // localStorage.setItem("Task", JSON.stringify(taskTab));
            SaveTaskTab(taskTab);
            location.reload();
        }
    })

    // Ecouteurs sur les boutons "Modifier"
    editButton.addEventListener("click", () => {
        sessionStorage.setItem("Edit", JSON.stringify(taskTab[i]));
    })

    // Ecouteur sur le changement de taille de la fenêtre (responsive)
    window.addEventListener('resize', (event) => {
        UpdateCardHeight(cardGroup[i]);
    });
}
