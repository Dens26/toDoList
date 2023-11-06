const fs = require("fs");

function dataVerification(filePath, callback) {
    // Le fichier n'existe pas
    if (!fs.existsSync(filePath))
        return callback("Le fichier de données n'éxiste pas.", null);

    // Lecture du fichier
    fs.readFile(filePath, (error, data) => {
        // Erreur de lecture
        if (error)
            return callback("Erreur lors de la lecture du fichier de données.", null);

        let taskTab;
        try {
            taskTab = JSON.parse(data);
        }// Erreur lors de la conversion en JSON
        catch (error) {
            return callback("Fichier non conforme.", null);
        }

        // // Le tableau ne contient pas de données
        // if (!Array.isArray(taskTab) || taskTab.length == 0)
        //     return callback("Vous n'avez aucune tâche en cours.", null);

        // Retourne la donnée si aucune erreur n'a été relevé
        return callback(null, taskTab);
    })
}

function dataSave(filePath, taskTab, callback) {
    // Enregistrement des modifications dans le fichier
    fs.writeFile(filePath, JSON.stringify(taskTab), (err) => {
        if (err) {
            return callback("Erreur lors de l'enregistrement des données.", null);
        }
        return callback(null, taskTab);
    });
}
module.exports = {
    dataVerification,
    dataSave
};
