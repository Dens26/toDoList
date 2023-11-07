// Dépendances nécessaire
const express = require("express");
const path = require("path");

// Fonction de gestion des données
const { dataVerification, dataSave } = require("./dataFunctions.js");

// Initialisation du serveur
const port = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.use(express.json());

/**
 * Retroune les tâche du fichier taskTab.json ou l'erreur rencontré
 */
app.get('/taskTab', (query, result) => {
    dataVerification(path.join(__dirname, 'taskTab.json'), (error, taskTab) => {
        if (error){
            return result.status(500).json(error);
        }
        return result.status(200).json(taskTab);
    })
})

/**
 * Enregistre la donné reçu en POST dans le fichier taskTab ou l'erreur rencontré
 */
app.post('/taskTab', (query, result) => {
    dataVerification(path.join(__dirname, 'taskTab.json'), (error, taskTab) => {
        if (error)
            result.status(500).json(error);
        
        taskTab = query.body;
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