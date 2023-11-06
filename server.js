const express = require("express");
const { dataVerification, dataSave } = require("./dataFunctions.js");
const path = require("path");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Affichage des tâche
app.get('/taskTab', (query, result) => {
    dataVerification(path.join(__dirname, 'taskTab.json'), (error, taskTab) => {
        if (error)
            result.status(500).json(error);

        result.status(200).json(taskTab);
    })
})

// Enregistrement d'une nouvelle tâche
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