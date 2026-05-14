const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router

const stuffCtrl = require('../controllers/stuff'); //Import du fichier js controllers

//Met tous
router.post('/', stuffCtrl.createThing); //Apelle de la fct createThing

//Mettre à jour
router.put('/:id', stuffCtrl.modifyThing); //Apelle de la fct modifyThing

//Supprimer en fonction de l'id
router.delete('/:id', stuffCtrl.deleteThing);

//Récupère en fonction de l'id
router.get('/:id', stuffCtrl.getOneThing);

//Récupère tous
router.get('/', stuffCtrl.getAllThings);


module.exports = router; //Export des données















