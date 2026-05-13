const express = require('express'); //Pour importer express

const app = express(); //Pour créer une app

app.use((req, res, next) => {
    console.log('Requête reçue');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => { //Emission/réception du serveur
    res.json({ message: 'Votre requête a bien été reçue' });
    next();
})

app.use((req,res)=>{ //Pas de 'next()' parce que dernier middlewear
console.log('Réponse envoyée avec suucès');
});

module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node


