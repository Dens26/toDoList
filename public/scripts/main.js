// import * as Functions from "../modules/functions.js";
import { LoadTask, UpdateDisplay, UpdateCardHeight } from "../modules/functions.js";

const taskTab = [];
LoadTask(taskTab);

// Référence DOM
const cardGroup = document.querySelectorAll(".card-group");

/**
 * Différents écouteurs de la pages html
 */
for (let i = 0; i < cardGroup.length; i++) {
    // Ecouteurs sur les checkbox
    cardGroup[i].children[0].children[0].addEventListener("click", () => {
        // Modification de la valeur du checkbox dans le tableau de tâche
        taskTab[i].finished = cardGroup[i].children[0].children[0].checked;

        // Enregistrement dans le localStorage
        localStorage.setItem("Task", JSON.stringify(taskTab));
        if (taskTab[i].finished) {
            localStorage.setItem("Finished", JSON.stringify(taskTab[i]));
        }
        // Mise à jour de l'affichage
        UpdateDisplay(taskTab);
    })
    // Ecouteurs sur les boutons "Supprimer"
    cardGroup[i].children[1].children[0].addEventListener("click", () => {
        if (confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")) {
            // Ajout d'une clé dernier supprimé
            localStorage.setItem("deleted", JSON.stringify(taskTab[i]));

            // Suppression de la tâche
            taskTab.splice(i, 1);
            localStorage.setItem("Task", JSON.stringify(taskTab));

            // Rafraichissement de la page pour voir la modification
            location.reload();
        }
    })
    // Ecouteurs sur les boutons "Modifier"
    cardGroup[i].children[1].children[1].addEventListener("click", () => {
        sessionStorage.setItem("Edit", JSON.stringify(taskTab[i]));
    })

    window.addEventListener('resize', (event) => {
        UpdateCardHeight(taskTab);
    });

}
