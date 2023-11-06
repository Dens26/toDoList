/**
 * Fonction pour récupérer des données.
 * @param {string} _url - url du chemin de récupération des données
 * @returns
 */
export async function fetchLoadTaskTab(_url) {
    const url = `http://localhost:5000/${_url}`;
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Erreur ${response.status}`);
        else
            return await response.json();
    }
    catch (error) {
        return -1;
    }
}

/**
 * Fonction qui effectue une requête POST pour enregistrer les données.
 * @param {Array} taskTab - Le tableau de tâche à enregistrer.
 * @param {string} _url - url du chemin d'enregistrement des données
 * @returns
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
        if (!response.ok)
            throw new Error(`Erreur ${response.status}`);
        await response.json();
    }
    catch (error) {
        return -1;
    }
}