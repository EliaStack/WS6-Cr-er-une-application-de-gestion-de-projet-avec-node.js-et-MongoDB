const express = require('express'); //Import de express
const auth = require('../middleware/auth');
const router = express.Router(); //Créaton du router


const stuffCtrl = require('../controllers/stuff'); //Import du fichier js controllers

//Met tous
router.post('/', auth, stuffCtrl.createThing); //Apelle de la fct createThing

//Mettre à jour
router.put('/:id', auth, stuffCtrl.modifyThing); //Apelle de la fct modifyThing

//Supprimer en fonction de l'id
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Récupère en fonction de l'id
router.get('/:id', auth, stuffCtrl.getOneThing);

//Récupère tous
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router; //Export des données















