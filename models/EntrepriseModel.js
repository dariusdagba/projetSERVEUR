const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    dateCreation: { type: String, required: true },
    adresse: { type: mongoose.Schema.Types.ObjectId, ref: 'Adresse' },
    developpeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developpeur' }],
    projets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projet' }],
});

module.exports = mongoose.model('Entreprise', entrepriseSchema);