
/**
 * Fonction pour créer un identifiant unique pour les tâches.
 * @param {Array} taskTab - Tableau des tâches existantes.
 * @returns {number} - Identifiant créé.
 */
export function createId(taskTab) {
    // Si le tableau n'est pas vide on crée l'identifiant sinon on retourne 0
    if (taskTab.length > 0) {
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
 * Fonction pour charger les tâches depuis le stockage local
 * et mettre à jour l'interface utilisateur.
 * @param {Array} taskTab - Tableau contenant les tâches.
 */
export function LoadTask(taskTab) {
    const ul_cardContainer = document.querySelector(".card-container");
    const task = JSON.parse(localStorage.getItem("Task")) || [];
    ul_cardContainer.textContent = "";

    for (let i = 0; i < task.length; i++) {
        // Création de la carte
        const li_cardGroup = createCard(task[i]);
        ul_cardContainer.appendChild(li_cardGroup);
        taskTab.push(task[i]);
    }
    // Mise à jour de l'affichage
    UpdateDisplay(taskTab);
}

/**
 * Fonction pour mettre à jour l'affichage de la page HTML en fonction des tâches.
 * @param {Array} taskTab - Tableau contenant les tâches.
 */
export function UpdateDisplay(taskTab) {
    // Références des objets du DOM
    const cardGroup = document.querySelectorAll(".card-group");
    let nbr = taskTab.length;

    // Vérifie les cases à cocher et met à jour l'affichage.
    for (let i = 0; i < taskTab.length; i++) {
        if (cardGroup[i].children[0].children[0].checked) {
            UpdateCheckbox(cardGroup[i], 1);
            nbr--;
        }
        else {
            UpdateCheckbox(cardGroup[i], 0);
        }
    }
    // Affiche le nombre de tâches restantes.
    ShowTaskNumber(taskTab, nbr);

    // Met à jour la hauteur des cartes en fonction de leur contenu.
    UpdateCardHeight(taskTab);
}

export function UpdateCardHeight(taskTab) {
    const cardGroup = document.querySelectorAll(".card-group");
    // Ajuste la taille de la carte
    for (let i = 0; i < taskTab.length; i++) {
        cardGroup[i].style.height = "50px";
        if (cardGroup[i].scrollHeight > cardGroup[i].offsetHeight) {
            const marge = parseInt(cardGroup[i].scrollHeight / 50 + 1);
            cardGroup[i].style.height = `${(marge * 50) + marge * (marge + 1)}px`;
            cardGroup[i].style.gridRow = `span ${marge}`;
        }
    }
}
/**
 * Fonction pour créer une carte représentant une tâche.
 * @param {Object} task - Objet représentant une tâche.
 * @returns {HTMLLIElement} - Élément de liste représentant la carte de la tâche.
 */
function createCard(task) {
    const li_cardGroup = document.createElement('li');
    li_cardGroup.className = "card-group";

    // Crée la partie gauche de la carte.
    const div_cardLeft = document.createElement("div");
    div_cardLeft.className = "card-left"

    // Checkbox
    const input_cardCheckbox = CreateCheckbox(task, "input", "card-checkbox", "checkbox",)
    div_cardLeft.appendChild(input_cardCheckbox);

    const div_cardText = document.createElement('div');
    div_cardText.className = "card-text";

    // Crée les paragraphes
    div_cardText.appendChild(CreateParagraph("card-title", task.name));
    div_cardText.appendChild(CreateParagraph("card-description", task.description));

    div_cardLeft.appendChild(div_cardText);
    li_cardGroup.appendChild(div_cardLeft);

    // Crée la partie droite de la carte.
    const div_cardButton = document.createElement("div");
    div_cardButton.className = "card-button";

    // Crée les bouton Supprimer et Modifier
    div_cardButton.appendChild(CreateButton("card-delete", "Supprimer", "trash-solid"));
    div_cardButton.appendChild(CreateButton("card-edit", "Modifier", "pen-to-square-solid"));

    li_cardGroup.appendChild(div_cardButton);

    return li_cardGroup;
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
/**
 * Fonction de création de case à cocher
 * @param {Object} task 
 * @param {string} chckElement 
 * @param {string} chckClass 
 * @param {string} chckType 
 * @returns 
 */
function CreateCheckbox(task, chckElement, chckClass, chckType) {
    const input_cardCheckbox = document.createElement(chckElement);
    input_cardCheckbox.className = chckClass;
    input_cardCheckbox.type = chckType;
    input_cardCheckbox.checked = task.finished;

    return input_cardCheckbox;
}

/**
 * Fonction de mise à jour des checkbox
 * @param {Object} card 
 * @param {number} index 
 */
const checkboxValueTab = [["white", "gray"], ["none", "line-through"], ["auto", "none"], ["visible", "hidden"]];
function UpdateCheckbox(card, index) {
    card.style.background = checkboxValueTab[0][index];
    card.children[0].children[1].children[0].style.background = checkboxValueTab[0][index];
    card.children[0].children[1].children[0].style.textDecoration = checkboxValueTab[1][index];
    card.children[0].children[1].children[1].style.textDecoration = checkboxValueTab[1][index];
    card.children[1].children[1].style.pointerEvents = checkboxValueTab[2][index];
    card.children[1].children[1].style.visibility = checkboxValueTab[3][index];
}

function ShowTaskNumber(taskTab, nbr) {
    document.querySelector(".task-info").innerHTML =
        taskTab.length == 0 ? `Aucune tâche pour le moment` :
            nbr <= 1 ? `il vous reste <span class="task-nbr">${nbr}</span> tâche !` :
                `il vous reste <span class="task-nbr">${nbr}</span> tâches !`;
}
