const express = require('express')
const EntrepriseController = require("../controllers/EntrepriseController")

const entrepriseRouter = express.Router()

// Routes
// GET /entreprises : Récupère tous les Entreprises
entrepriseRouter.get('/entreprises', async (req, res) => {
    try {
        const Entreprises = await EntrepriseController.getAllEntreprises()
        res.status(200).send(Entreprises);
    } catch (err) {
        res.status(500).send('Erreur serveur.');
    }
});

// GET /entreprises/:id : Récupère un Entreprise par son ID
entrepriseRouter.get('/entreprises/:id', async (req, res) => {
    try {
        const entreprise = await EntrepriseController.getOneEntreprise(req.params.id);
        if (!entreprise) {
            res.status(404).send("Entreprise non trouvé.");
        }
        res.status(200).send(entreprise);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// POST /entreprises : Ajoute un nouveau Entreprise
entrepriseRouter.post('/entreprises', async (req, res) => {
    
    const nom = req.body.nom
    const dateCreation = req.body.dateCreation

    if (!nom || !dateCreation) {
        res.status(400).send("Données incomplètes.");
    }

    try {
        const nouveauEntreprise = await EntrepriseController.addOneEntreprise(req.body)
        res.status(201).send(nouveauEntreprise);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// PUT /entreprises/:id : Modifie un Entreprise existant
entrepriseRouter.put('/entreprises/:id', async (req, res) => {
    try {
        
        const nom = req.body.nom
        const dateCreation = req.body.dateCreation
        const adresse = req.body.adresse
        const developpeurs = req.body.developpeurs
        const projets = req.body.projets

        if (!nom && !dateCreation && !adresse && !developpeurs && !projets) {
            res.status(400).send("Données incomplètes.");
        }

        const entreprise = await EntrepriseController.modifyEntreprise(req.params.id, req.body);
        
        if (!entreprise) {
            return res.status(404).send("Entreprise non trouvé.");
        }
        
        
        res.status(200).send(entreprise);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /entreprises : Supprime tous les Entreprises
entrepriseRouter.delete('/entreprises', async (req, res) => {
    try {
        await EntrepriseController.deleteAllEntreprises();
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /Entreprises/:id : Supprime un Entreprise par son ID
entrepriseRouter.delete('/entreprises/:id', async (req, res) => {
    try {
        const Entreprise = await EntrepriseController.deleteOneEntreprise(req.params.id);
        if (!Entreprise) {
            return res.status(404).send("Entreprise non trouvé.");
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

module.exports = entrepriseRouter