// Fonctions nécessaires
import { LoadTaskTab, SaveTaskTab, UpdateDisplay, UpdateCardHeight, DeleteTaskTab } from "../modules/functions.js";


// Chargement des tâches dans la constante taskTab[]
const taskTab = await LoadTaskTab("index.html");
if (taskTab.toString().substr(0, 10) == 'Error: 500')
    document.querySelector('.error').textContent = taskTab;

// Référence DOM
const cardGroup = document.querySelectorAll(".card-group");

/**
 * Ajout des écouteurs d'événements sur chaque groupe de cartes.
 */
for (let i = 0; i < cardGroup.length; i++) {
    // Ecouteurs
    const checkbox = cardGroup[i].children[0].children[0].children[0];
    const deleteButton = cardGroup[i].children[0].children[1].children[0];
    const editButton = cardGroup[i].children[0].children[1].children[1];

    // Met à jour la taille de chaque tâche
    UpdateCardHeight(cardGroup[i]);

    // Ecouteurs sur les checkbox
    checkbox.addEventListener("click", () => {
        // Modification de la valeur du checkbox dans le tableau de tâche
        taskTab[i].finished = cardGroup[i].children[0].children[0].children[0].checked;

        // Enregistrement sur le serveur
        SaveTaskTab(taskTab);
        
        // Mise à jour de l'affichage
        UpdateDisplay(taskTab, cardGroup[i], parseInt(document.querySelector(".task-nbr").textContent));
    })

    // Ecouteurs sur les boutons "Supprimer"
    deleteButton.addEventListener("click", () => {
        if (confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")) {
            // Suppression de la tâche du serveur
            DeleteTaskTab(taskTab[i].id);
            location.reload();
        }
    })

    // Ecouteurs sur les boutons "Modifier"
    editButton.addEventListener("click", () => {
        sessionStorage.setItem("Edit", JSON.stringify(taskTab[i]));
    })

    // Ecouteur sur le changement de taille de la fenêtre (responsive)
    window.addEventListener('resize', (event) => {
        // Met à jour la taille de chaque tâche
        UpdateCardHeight(cardGroup[i]);
    });
}
