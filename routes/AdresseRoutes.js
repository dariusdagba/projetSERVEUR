const express = require('express')
const AdresseController = require("../controllers/AdresseController")

const adresseRouter = express.Router()

// Routes
// GET /Adresses : Récupère tous les Adresses
adresseRouter.get('/adresses', async (req, res) => {
    try {
        const Adresses = await AdresseController.getAllAdresses()
        res.status(200).send(Adresses);
    } catch (err) {
        res.status(500).send('Erreur serveur.');
    }
});

// GET /adresses/:id : Récupère un Adresse par son ID
adresseRouter.get('/adresses/:id', async (req, res) => {
    try {
        const adresse = await AdresseController.getOneAdresse(req.params.id);
        if (!adresse) {
            res.status(404).send("Adresse non trouvé.");
        }
        res.status(200).send(adresse);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// POST /Adresses : Ajoute un nouveau Adresse
adresseRouter.post('/adresses', async (req, res) => {
    
    const pays = req.body.pays
    const province = req.body.province
    const ville = req.body.ville
    const voie = req.body.voie
    const numero = req.body.numero

    if (!pays || !province || !ville || !voie || !numero) {
        res.status(400).send("Données incomplètes.");
    }

    try {
        const nouveauAdresse = await AdresseController.addOneAdresse(req.body)
        res.status(201).send(nouveauAdresse);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// PUT /adresses/:id : Modifie un Adresse existant
adresseRouter.put('/adresses/:id', async (req, res) => {
    try {
        
        const pays = req.body.pays
        const province = req.body.province
        const ville = req.body.ville
        const voie = req.body.voie
        const numero = req.body.numero
        const entreprise = req.body.entreprise

        if (!pays && !province && !ville && !voie && !numero && !entreprise) {
            res.status(400).send("Données incomplètes.");
        }

        const adresse = await AdresseController.modifyAdresse(req.params.id, req.body);
        
        if (!adresse) {
            return res.status(404).send("Adresse non trouvé.");
        }
        
        
        res.status(200).send(adresse);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /Adresses : Supprime tous les Adresses
adresseRouter.delete('/adresses', async (req, res) => {
    try {
        await AdresseController.deleteAllAdresses();
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /adresses/:id : Supprime un Adresse par son ID
adresseRouter.delete('/adresses/:id', async (req, res) => {
    try {
        const Adresse = await AdresseController.deleteOneAdresse(req.params.id);
        if (!Adresse) {
            return res.status(404).send("Adresse non trouvé.");
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

module.exports = adresseRouter