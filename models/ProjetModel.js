const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    progres: { type: String, required: true },
    deadline: { type: String, required: true },
    developpeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developpeur' }],
});

module.exports = mongoose.model('Projet', projetSchema);