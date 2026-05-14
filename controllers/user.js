const bcrypt = require('bcrypt');
const user = require('../models/user');

exports.signup = (req, res, next) => { //Enregistrement de new user
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({ //Nouvelle user
                email: req.body.email,
                password: hash
            });
            user.save() //Enregistre ds la base de données
                .then(() => res.status(201).json({ message: 'Utilisateur créer !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => { //Connecter des utilisateurs existants
    user.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        } else {
                            res.status(200).json({
                                //Nécessaire pour l'auth des requête émise par le client
                                userId: user._id,
                                token: 'TOKEN'
                            });
                        }
                    })
                    .catche(error => {
                        res.status(500).json({ error }); //Erreur serveur
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error }); //Erreur serveur
        })

};
















