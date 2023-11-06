import {fetchLoadTaskTab, fetchSaveTaskTab} from "./server-function.js";

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
 * Fonction pour charger les tâches depuis le fichier coté serveur
 * et mettre à jour l'interface utilisateur.
 * @param {Array} taskTab - Tableau contenant les tâches.
 */
export async function LoadTaskTab(pageName) {
    const taskTab = [];
    const ul_cardContainer = document.querySelector(".card-container");
    // const task = JSON.parse(localStorage.getItem("Task")) || [];
    const task = await fetchLoadTaskTab("taskTab");
    if (pageName == "index.html")
        ul_cardContainer.textContent = "";

    let nbr = 0;
    for (let i = 0; i < task.length; i++) {
        // Création de la carte
        const li_cardGroup = createCard(task[i]);
        taskTab.push(task[i]);
        if (pageName == "index.html") {
            ul_cardContainer.appendChild(li_cardGroup);
            // Mise à jour de l'affichage
            if (!li_cardGroup.children[0].children[0].checked) nbr++;
            UpdateDisplay(task, li_cardGroup, nbr);
        }
    }
    // Met à jour le nombre de tâches restante
    if (pageName == "index.html")
        ShowTaskNumber(task, nbr);
    return taskTab;
}

/**
 * Fonction pour Enregistrer les tâches dans le fichier coté serveur
 * @param {Array} taskTab - Tableau contenant les tâches
 */
export async function SaveTaskTab(taskTab) {
    const task = await fetchSaveTaskTab(taskTab, "taskTab");
}

/**
 * Fonction pour mettre à jour l'affichage de la page HTML en fonction des tâches.
 * @param {Array} taskTab - Tableau contenant les tâches.
 */
export function UpdateDisplay(task, card, nbr) {
    // let nbr = cardGroup.length;
    // Vérifie les cases à cocher et met à jour l'affichage.
    if (card.children[0].children[0].checked) {
        UpdateCheckbox(card, 1);
        nbr--;
    }
    else {
        UpdateCheckbox(card, 0);
        nbr++;
    }
    // Met à jour le nombre de tâches restante
    ShowTaskNumber(task, nbr);

    // Met à jour la hauteur des cartes en fonction de leur contenu.
    UpdateCardHeight(card);
}

/**
 * Affiche le nombre de tâches restantes.
 * @param {Array} task - Tableau contenant les tâches à afficher.
 * @param {number} nbr - Nombre de tâches restantes à effectuer.
 */
export function ShowTaskNumber(task, nbr) {
    document.querySelector(".task-info").innerHTML =
        task.length == 0 ? `Aucune tâche pour le moment` :
            nbr <= 1 ? `il vous reste <span class="task-nbr">${nbr}</span> tâche !` :
                `il vous reste <span class="task-nbr">${nbr}</span> tâches !`;
}

/**
 * Ajuste la hauteur de la carte pour s'adapter au contenu.
 * @param {HTMLElement} card - carte à mettre à jour.
 */
export function UpdateCardHeight(card) {
    // Définit la hauteur initiale de la carte à 50px
    card.style.height = "50px";

    // Vérifie si le contenu dépasse la hauteur de la carte
    if (card.scrollHeight > card.offsetHeight) {

        // Calcule le nombre de lignes nécessaires pour afficher le contenu
        const numRow = parseInt(card.scrollHeight / 50 + 1);

        // Calcule la nouvelle hauteur de la carte en fonction du nombre de lignes nécessaires
        card.style.height = `${(numRow * 50) + numRow * (numRow + 1)}px`;

        // Met à jour la propriété de la grille pour s'étendre sur le nombre de lignes nécessaires
        card.style.gridRow = `span ${numRow}`;
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
 * Crée un bouton avec le nom, le titre et l'icône spécifiés.
 * @param {string} buttonName - Nom de la classe CSS du bouton.
 * @param {string} buttonTitle - Texte qui apparaîtra au survol du bouton.
 * @param {string} buttonSrc - Nom du fichier SVG de l'icône du bouton
 * @returns {HTMLAnchorElement} - Élément de lien ancré (balise <a>) créé.
 */
function CreateButton(buttonName, buttonTitle, buttonSrc) {
    // Crée l'élément et sa classe
    const a_card = document.createElement("a");
    a_card.className = buttonName;

    // Définit le lien de destination en fonction du titre du bouton
    a_card.href = buttonTitle == "Modifier" ? "form.html?value=edit" : "#";
    a_card.title = buttonTitle;

    // Crée un élément d'image pour l'icône du bouton
    const a_card_img = document.createElement('img');
    a_card_img.src = "../icons/" + buttonSrc + ".svg";
    a_card_img.alt = "Logo " + buttonName;

    // Ajoute l'image à l'élément
    a_card.appendChild(a_card_img);

    // Retourne l'élément créé
    return a_card;
}

/**
 * Crée un élément de paragraphe
 * @param {string} paramClass - Nom de la classe
 * @param {string} paramContent - Contenu du paragraphe.
 * @returns {HTMLParagraphElement} - Élément de paragraphe (balise <p>) créé.
 */
function CreateParagraph(paramClass, paramContent) {
    // Crée l'élément de paragraphe, sa classe et son contenu
    const p = document.createElement('p');
    p.className = paramClass;
    p.textContent = paramContent;

    // Retourne l'élément créé
    return p;
}
/**
 * Crée un élément de case à cocher
 * @param {Object} task - tâche
 * @param {string} chckElement - Nom de l'élément à créer.
 * @param {string} chckClass - Nom de la classe CSS.
 * @param {string} chckType - Type de la case à cocher
 * @returns {HTMLInputElement} - Élément de case à cocher (input de type checkbox)
 */
function CreateCheckbox(task, chckElement, chckClass, chckType) {
    // Crée l'élément, sa classe et son type
    const input_cardCheckbox = document.createElement(chckElement);
    input_cardCheckbox.className = chckClass;
    input_cardCheckbox.type = chckType;

    // Coche la case à cocher si la tâche est terminée
    input_cardCheckbox.checked = task.finished;

    // Retourne l'élément
    return input_cardCheckbox;
}

/**
 * Met à jour l'apparence et l'interaction des éléments de la carte en fonction de l'état de la case à cocher.
 * @param {Object} card - Objet représentant l'élément de carte à mettre à jour.
 * @param {number} index - Indice spécifiant l'état de la case à cocher. Valeur possible (0,1)
 */
const checkboxValueTab = [["white", "gray"], ["none", "line-through"], ["visible", "hidden"]];
function UpdateCheckbox(card, index) {
    card.style.background = checkboxValueTab[0][index]; // background
    card.children[0].children[1].children[0].style.textDecoration = checkboxValueTab[1][index]; // Titre de la tâche
    card.children[0].children[1].children[1].style.textDecoration = checkboxValueTab[1][index]; // Description de la tâche
    card.children[1].children[1].style.visibility = checkboxValueTab[2][index]; // Visibilité du bouton
}
