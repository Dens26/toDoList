// Dépendances nécessaire
const express = require("express");
const path = require("path");

// Fonction de gestion des données
const { dataLoad, dataSave } = require("./dataFunctions.js");

// Initialisation du serveur
const port = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.use(express.json());

/**
 * Retroune les tâche du fichier taskTab.json ou l'erreur rencontré
 */
app.get('/taskTab', (query, result) => {
    // Chargement du tableau de tâches
    dataLoad(path.join(__dirname, 'taskTab.json'), (error, taskTab) => {
        if (error)
            result.status(500).json(error);

        result.status(200).json(taskTab);
    })
})

/**
 * Enregistre la donné reçu en POST dans le fichier taskTab ou l'erreur rencontré
 */
app.post('/taskTab', (query, result) => {
    // Récupération de la tâche
    taskTab = query.body;
    // Enregistrement du tableau de tâches
    dataSave(path.join(__dirname, 'taskTab.json'), taskTab, (error, taskTab) => {
        if (error)
            result.status(500).json(error);

        result.status(200).json(taskTab);
    })
})

app.delete('/taskTab/:id', (query, result) => {
    // Chargement du tableau de tâches
    dataLoad(path.join(__dirname, 'taskTab.json'), (error, taskTab) => {
        if (error)
            result.status(500).json(error);

        // Tentative de suppression de la tâche
        try {
            taskTab.splice(taskTab.indexOf(taskTab.find(task => task.id == query.params.id)), 1);
        } catch {
            result.status(500).json("Une erreur s'est produit pendant la suppresion de la tâche");
        }
        // Enregistrement du tableau restant
        dataSave(path.join(__dirname, 'taskTab.json'), taskTab, (error, taskTab) => {
            if (error)
                result.status(500).json(error);

            result.status(200).json(taskTab);
        })
    })
})

app.listen(port, () => {
    console.log("Server is online!");
});