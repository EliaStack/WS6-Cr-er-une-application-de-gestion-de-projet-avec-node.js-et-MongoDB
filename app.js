const mongoose = require('mongoose'); //Importer mongoose lié à MongoDB
const stuffRoutes = require('./routes/stuff'); //Importndes routes
const express = require('express'); //Importer express

//Authentification
const userRoutes = require('./routes/user');

const path = require('path');


const app = express(); //Pour créer une app

app.use(express.json()); //Intercèpte toutes les requêtes qui sont en JSON (GET,POST,ect...)

mongoose.connect('mongodb+srv://User1_Elia:Elia@ws6-oc.k1ttgr3.mongodb.net/test')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => {
        console.log('Connexion à MongoDB échouée !');
        console.error(err); // <== AJOUTEZ CETTE LIGNE
    });


app.use((req, res,next) => { //Par rapport aux défaut CORS qui serra appliqué à toutes les requêtes vu que pas de route de spécifier
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes); //Remettre le début de la route pour dire que stuffRoutes est envoyé à l'api stuff

app.use('/api/auth', userRoutes); //Enregistrement des routes, racine de tout ce qui est liée à l'authentification
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node


