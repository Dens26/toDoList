
const taskTab = [];

/**
 * Fonction de création de boutons
 * @param {string} buttonName 
 * @param {string} buttonTitle 
 * @param {string} buttonSrc 
 * @returns 
 */
function CreateButton(buttonName, buttonTitle, buttonSrc) {
    const a_card = document.createElement("a");
    a_card.className = buttonName;
    a_card.href = buttonTitle == "Modifier" ? "edit-form.html" : "#";
    a_card.title = buttonTitle;

    const a_card_img = document.createElement('img');
    a_card_img.src = "../icons/" + buttonSrc + ".svg";
    a_card_img.alt = "Logo " + buttonName;
    a_card.appendChild(a_card_img);

    return a_card;
}

/**
 * Fonction de création de contenu texte
 * @param {string} paramClass 
 * @param {string} paramContent 
 * @returns 
 */
function CreateParagraph(paramClass, paramContent) {
    const p = document.createElement('p');
    p.className = paramClass;
    p.textContent = paramContent;

    return p;
}

const ul_cardContainer = document.querySelector(".card-container");
/***
 * Fonction de chargement des tâches depuis le local storage
 */
function LoadTask() {
    const task = JSON.parse(localStorage.getItem("Task")) || [];
    ul_cardContainer.textContent = "";
    for (let i = 0; i < task.length; i++) {
        taskTab.push(task[i]);
        // Création de la carte
        const li_cardGroup = document.createElement("li");
        li_cardGroup.className = "card-group";

        // Div de la PARTIE GAUCHE
        const div_cardLeft = document.createElement("div");
        div_cardLeft.className = "card-left"

        // Checkbox
        const input_cardCheckbox = document.createElement("input");
        input_cardCheckbox.className = "card-checkbox";
        input_cardCheckbox.type = "checkbox";
        input_cardCheckbox.checked = task[i].finished;
        div_cardLeft.appendChild(input_cardCheckbox);

        const div_cardText = document.createElement('div');
        div_cardText.className = "card-text";

        // Contenu des tâches
        div_cardText.appendChild(CreateParagraph("card-title", task[i].name));
        div_cardText.appendChild(CreateParagraph("card-description", task[i].description));


        div_cardLeft.appendChild(div_cardText);
        li_cardGroup.appendChild(div_cardLeft);

        // Div de la PARTIE DROITE
        const div_cardButton = document.createElement("div");
        div_cardButton.className = "card-button";

        // Création des bouton Supprimer et Modifier
        div_cardButton.appendChild(CreateButton("card-delete", "Supprimer", "trash-solid"));
        div_cardButton.appendChild(CreateButton("card-edit", "Modifier", "pen-to-square-solid"));

        li_cardGroup.appendChild(div_cardButton);

        ul_cardContainer.appendChild(li_cardGroup);
    }
    // Mise à jour de l'affichage
    UpdateDisplay();
}

LoadTask();

// Référence DOM
const cardGroup = document.querySelectorAll(".card-group");
/* Checkbok     : cardGroup[i].children[0].children[0]
 * Title        : cardGroup[i].children[0].children[1].children[0]
 * Description  : cardGroup[i].children[0].children[1].children[1]
 * Delete       : cardGroup[i].children[1].children[0]
 * Edit       : cardGroup[i].children[1].children[1]
*/

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
        UpdateDisplay();
    })
    // Ecouteurs sur les boutons Supprimer
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
    cardGroup[i].children[1].children[1].addEventListener("click", () => {
        sessionStorage.setItem("Edit", JSON.stringify(taskTab[i]));
    })
}

/**
 * Fonction de mise à jour de l'affichage de la page html
 */
function UpdateDisplay() {
    // Références des objets du DOM
    const cardGroup = document.querySelectorAll(".card-group");
    nbr = taskTab.length;
    console.log(nbr);

    // Vérification du checkbox
    for (let i = 0; i < taskTab.length; i++) {
        // Modification de l'affichage pour la tâche coché (background, texte barré, bouton edit désactivé)
        if (cardGroup[i].children[0].children[0].checked) {
            cardGroup[i].style.background = "grey";
            cardGroup[i].children[0].children[1].children[0].style.textDecoration = "line-through";
            cardGroup[i].children[0].children[1].children[1].style.textDecoration = "line-through";
            cardGroup[i].children[1].children[1].style.pointerEvents = "none";
            cardGroup[i].children[1].children[1].style.visibility = "hidden";

            nbr--;
        }
        else {
            // Modification de l'affichage pour la tâche décoché (background, texte normal, bouton edit ré-activé)
            cardGroup[i].style.background = "whitesmoke";
            cardGroup[i].children[0].children[1].children[0].style.textDecoration = "none";
            cardGroup[i].children[0].children[1].children[1].style.textDecoration = "none";
            cardGroup[i].children[1].children[1].style.pointerEvents = "auto";
            cardGroup[i].children[1].children[1].style.visibility = "visible";
        }
    }
    // Affichage du nombre de tâches restantes
    document.querySelector(".task-info").innerHTML =
        taskTab.length == 0 ? `Aucune tâche pour le moment` :
            nbr == 0 ? `il vous reste <span class="task-nbr">${nbr}</span> tâche !` :
                `il vous reste <span class="task-nbr">${nbr}</span> tâche !`;

}