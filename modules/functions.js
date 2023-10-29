/**
 * Fichier de fonctions
 */

/**
 * Fonction de création d'un id unique
 * @param {Array} taskTab 
 * @returns 
 */
export function createId(taskTab){
    if (taskTab.length > 0) {
        // Création de l'id unique
        let idTab = [];
        for (let i = 0; i < taskTab.length; i++) {
            idTab.push(taskTab[i].id);
        }
        return Math.max(...idTab) + 1;
    }
    else
        return 0;
}

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

/***
 * Fonction de chargement des tâches depuis le local storage
 */
export function LoadTask(taskTab) {
    const ul_cardContainer = document.querySelector(".card-container");
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
    UpdateDisplay(taskTab );
}

/**
 * Fonction de mise à jour de l'affichage de la page html
*/
export function UpdateDisplay(taskTab) {
    // Références des objets du DOM
    const cardGroup = document.querySelectorAll(".card-group");
    let nbr = taskTab.length;
    console.log(nbr);

    // Vérification du checkbox
    for (let i = 0; i < taskTab.length; i++) {
        // Modification de l'affichage pour la tâche coché (background, texte barré, bouton "Modifier" désactivé)
        if (cardGroup[i].children[0].children[0].checked) {
            cardGroup[i].style.background = "gray";
            cardGroup[i].children[0].children[1].children[0].style.background = 'gray';
            cardGroup[i].children[0].children[1].children[0].style.textDecoration = "line-through";
            cardGroup[i].children[0].children[1].children[1].style.textDecoration = "line-through";
            cardGroup[i].children[1].children[1].style.pointerEvents = "none";
            cardGroup[i].children[1].children[1].style.visibility = "hidden";

            nbr--;
        }
        else {
            // Modification de l'affichage pour la tâche décoché (background, texte normal, bouton "Modifier" ré-activé)
            cardGroup[i].style.background = "white";
            cardGroup[i].children[0].children[1].children[0].style.background = 'white';
            cardGroup[i].children[0].children[1].children[0].style.textDecoration = "none";
            cardGroup[i].children[0].children[1].children[1].style.textDecoration = "none";
            cardGroup[i].children[1].children[1].style.pointerEvents = "auto";
            cardGroup[i].children[1].children[1].style.visibility = "visible";
        }
    }
    // Affichage du nombre de tâches restantes
    document.querySelector(".task-info").innerHTML =
        taskTab.length == 0 ? `Aucune tâche pour le moment` :
            nbr <= 1 ? `il vous reste <span class="task-nbr">${nbr}</span> tâche !` :
                `il vous reste <span class="task-nbr">${nbr}</span> tâches !`;
}