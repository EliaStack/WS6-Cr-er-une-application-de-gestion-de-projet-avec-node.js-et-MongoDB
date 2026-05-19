const express = require('express'); //Import de express
const router = express.Router(); //Créaton du router
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff'); //Import du fichier js controllers

/**
 * @swagger
 * tags:
 * name: Users
 * description: Gestion des utilisateurs
 */


//Met tous
router.post('/', auth, multer, stuffCtrl.createThing); //Apelle de la fct createThing

/**
 * @swagger
 * /api/users/login:
 * post:
 *  summary: Connexion
 *  tags:[Users]
 *  requestBody:
 *      required:true
 *      content:
 *          application/json:
 *              schema:
 *                  type object
 *                  required:
 *                      -email
 *                      -password
 *                  properties:
 *                    email: 
 *                      type: string
 *                      format: email
 *  *                 password: 
 *                      type: string
 *                      format: password       
 * responses:
 *   200: 
 *    description: Authentification réussie         
 *    content:
 *      application/json:
 *              schema:
 *                  type object
 *                  properties:
 *                    token: 
 *                      type: string
 *  400:
 *    description: Authentification échouée    
 * 
 */


//Mettre à jour
router.put('/:id', auth, multer, stuffCtrl.modifyThing); //Apelle de la fct modifyThing

//Supprimer en fonction de l'id
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Récupère en fonction de l'id
router.get('/:id', auth, stuffCtrl.getOneThing);

//Récupère tous
router.get('/', auth, stuffCtrl.getAllThings);


module.exports = router; //Export des données















