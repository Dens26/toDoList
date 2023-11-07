//#region Fonction d'acces au serveur
/**
 * Fonction pour charger les données du serveur
 * @param {string} _url - url du chemin de récupération des données
 * @returns retourne Tableau de tâche ou l'erreur en cas d'échec
 */
export async function fetchLoadTaskTab(_url) {
    const url = `http://localhost:5000/${_url}`;
    try {
        const response = await fetch(url);
        if (response.ok)
            return await response.json();
        else {
            const error = await response.json();
            throw new Error(`${response.status} : ${error}`);
        }
    }
    catch (error) {
        throw error;
    }
}

/**
 * Fonction qui effectue une requête POST pour enregistrer les données.
 * @param {Array} taskTab - Le tableau de tâche à enregistrer.
 * @param {string} _url - url du chemin d'enregistrement des données
 * @returns retourne l'erreur en cas d'échec
 */
export async function fetchSaveTaskTab(taskTab, _url) {
    const url = `http://localhost:5000/${_url}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskTab)
        })
        if (response.ok)
            await response.json();
        else {
            const error = await response.json();
            throw new Error(`${response.status} : ${error}`);
        }
    }
    catch (error) {
        throw error;
    }
}

export async function fetchDeleteTaskTab(taskId, _url){
    console.log("ici");
    const url = `http://localhost:5000/${_url}/${taskId}`;
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "DELETE"
        });
        if (response.ok)
            await response.json();
        else {
            const error = await response.json();
            throw new Error(`${response.status} : ${error}`);
        }
    }
    catch (error) {
        throw error;
    }
}
//#endregion