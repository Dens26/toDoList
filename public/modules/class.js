/**
 * Fichier des classes
 */

// Classe de donnée pour la création de tâche
export class TaskObject {
    constructor(id, name, description, finished) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.finished = finished;
    }
}