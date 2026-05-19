const mongoose = require('mongoose'); //Importer mongoose lié à MongoDB
const stuffRoutes = require('./routes/stuff'); //Importndes routes
const express = require('express'); //Importer express
const helmet = require('helmet'); //Ajout d'une couche sécurité
const dotenv = require('dotenv');
//Authentification
const userRoutes = require('./routes/user');

const path = require('path');

dotenv.config();
const app = express(); //Pour créer une app
app.use(helmet()); //Appel de helmet dans .appS
app.use(express.json()); //Intercèpte toutes les requêtes qui sont en JSON (GET,POST,ect...)


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ws6-oc.k1ttgr3.mongodb.net/test')
            .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch ((err) => {
        console.log('Connexion à MongoDB échouée !');
        console.error(err); // <== AJOUTEZ CETTE LIGNE
    });


//const connectDB = async () => {
 //   try { //Sa peut prendre du temps donc try/await
 //       await mongoose.connect('mongodb+srv://User1_Elia:Elia@ws6-oc.k1ttgr3.mongodb.net/test')
//            .then(() => console.log('Connexion à MongoDB réussie !'))
//    } catch (err) {
 //       console.log('Connexion à MongoDB échouée !');
  //      console.error(err); // <== AJOUTEZ CETTE LIGNE
 //   };
//};
//module.exports = connectDB; 
//a add qd il sera ds un autre fichier et add connectDB; dans app.js (c'est l'appel)


app.use((req, res, next) => { //Par rapport aux défaut CORS qui serra appliqué à toutes les requêtes vu que pas de route de spécifier
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//ou
//npm install cors
//const cors = require('cors');
//app.use(cors());
// pour mettre un sel domaine app.use(cors({ origin: 'http://localhost:4200' }));


app.use('/api/stuff', stuffRoutes); //Remettre le début de la route pour dire que stuffRoutes est envoyé à l'api stuff

app.use('/api/auth', userRoutes); //Enregistrement des routes, racine de tout ce qui est liée à l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); //express.static = donne accès aux fichiers de manière public

module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node


