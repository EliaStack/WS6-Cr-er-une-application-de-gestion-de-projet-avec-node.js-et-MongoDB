const Thing = require('../models/thing'); //Import du modèle de schéma thing 


//Fonction POST - Met tous
exports.createThing = (req, res, next) => {
    delete req.body._id; //Faux id envoyé par le frontend
    const thing = new Thing({ //New instance
        ...req.body
    });
    thing.save() //Enregistre les données
        .then(() => res.status(201).json({ message: 'Objet enregistré !' })) //I l faut dire que tout va bien au cas où
        .catch(error => res.status(400).json({ error }));
}

//Fonction PUT - Mettre à jour
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//Fonction Delete - Supprimer en fonction de l'id
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}

//Fonction GET - Récupère en fonction de l'id
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Fonction GET - Récupère tous
exports.getAllThings = (req, res, next) => {
    Thing.find() //Trouver tt les things
        .then(things => res.status(200).json(things)) //Récup tableaux des things
        .catch(error => res.status(400).json({ error }));
};


