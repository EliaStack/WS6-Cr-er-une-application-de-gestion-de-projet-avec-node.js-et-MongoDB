console.log('Création du serveur');

//Création du serveur
const http = require('http'); //importer le package http qui donne accès à http
const app = require('./app'); //Lien JS de l'appli

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app); //Lien enter le serveur et l'application

//Attente des requêtes envoyées en écoutant le port
server.listen(process.env.PORT || 3000);

/////////////////////////////////////////////////////////////////////////////////////////////////////







