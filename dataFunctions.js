const fs = require("fs");

function dataVerification(filePath, callback) {
    // Le fichier n'existe pas
    if (!fs.existsSync(filePath))
        return callback({ error: "Le fichier de données n'éxiste pas." });

    // Lecture du fichier
    fs.readFile(filePath, (error, data) => {
        // Erreur de lecture
        if (error)
            return callback({ error: "Erreur lors de la lecture du fichier de données." });

        let taskTab;
        try {
            taskTab = JSON.parse(data);
        }// Erreur lors de la conversion en JSON
        catch (error) {
            return callback({ error: "Erreur lors de la conversion des données en JSON." });
        }

        // Le tableau ne contient pas de données
        if (!Array.isArray(taskTab) || taskTab.length == 0)
            return callback({ error: 'Aucune donnée de tâche disponible.' });

        // Retourne la donnée si aucune erreur n'a été relevé
        console.log(taskTab);
        return callback( null, taskTab);
    })
}

function dataSave(filePath, taskTab, callback) {
    // Enregistrement des modifications dans le fichier
    fs.writeFile(filePath, JSON.stringify(taskTab), (err) => {
        if (err) {
            return callback({ error: "Erreur lors de l'enregistrement des données." });
        }
        return callback(null, taskTab);
    });
}
module.exports = {
    dataVerification,
    dataSave
};
