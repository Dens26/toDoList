/**
 * Fonction pour récupérer des données.
 * @param {string} _url - url du chemin de récupération des données
 * @returns retourne Tableau de tâche ou -1 en cas d'échec
 */
export async function fetchLoadTaskTab(_url) {
    const url = `http://localhost:5000/${_url}`;
    try {
        const response = await fetch(url);
        if (response.ok)
            return await response.json();
        else
        {
            const error = await response.json();
            throw new Error(`${response.status} : ${error}`);
        }
    }
    catch (error) {
        return error;
    }
}

/**
 * Fonction qui effectue une requête POST pour enregistrer les données.
 * @param {Array} taskTab - Le tableau de tâche à enregistrer.
 * @param {string} _url - url du chemin d'enregistrement des données
 * @returns retourne -1 en cas d'échec
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
    }
    catch {
        return -1;
    }
}