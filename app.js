const express = require('express'); //Pour importer express

const app = express(); //Pour créer une app

app.use((req,res)=>{ //Emission/réception du serveur
    res.json({message: 'Votre requête a bien été reçue'});
})


module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node


