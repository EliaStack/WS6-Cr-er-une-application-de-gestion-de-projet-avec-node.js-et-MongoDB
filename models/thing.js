const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ //Par rapport à app.js pas besoin add id car Mongo fait en auto
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('thing', thingSchema); //Exporter le modèle avec les données
//thing = nom du fichier js, thingSchema=nom de la const


 