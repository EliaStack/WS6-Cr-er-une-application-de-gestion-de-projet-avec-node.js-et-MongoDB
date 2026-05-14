const mongoose = require('mongoose'); //Importer mongoose lié à MongoDB
const Thing = require('./models/thing'); //Import du modèle de schéma thing 
const express = require('express'); //Importer express

const app = express(); //Pour créer une app

app.use(express.json()); //Intercèpte toutes les requêtes qui sont en JSON (GET,POST,ect...)

mongoose.connect('mongodb+srv://User1_Elia:Elia@ws6-oc.k1ttgr3.mongodb.net/test')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => {
        console.log('Connexion à MongoDB échouée !');
        console.error(err); // <== AJOUTEZ CETTE LIGNE
    });


app.use((req, res, next) => { //Par rapport aux défaut CORS qui serra appliqué à toutes les requêtes vu que pas de route de spécifier
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Met tous
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; //Faux id envoyé par le frontend
    const thing = new Thing({ //New instance
        ...req.body
    });
    thing.save() //Enregistre les données
        .then(() => res.status(201).json({ message: 'Objet enregistré !' })) //I l faut dire que tout va bien au cas où
        .catch(error => res.status(400).json({ error }));
});

//Mettre à jour
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

//Su^^rimer en fonction de l'id
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

//Récupère en fonction de l'id
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

//Récupère tous
app.get('/api/stuff', (req, res, next) => {
    Thing.find() //Trouver tt les things
        .then(things => res.status(200).json(things)) //Récup tableaux des things
        .catch(error => res.status(400).json({ error }));
});

module.exports = app; //Exporte les fichiers pour les rendres accesibles nottament avec serveur node


