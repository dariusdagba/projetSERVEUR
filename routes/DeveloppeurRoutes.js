const express = require('express')
const DeveloppeurController = require("../controllers/DeveloppeurController")

const developpeurRouter = express.Router()

// Routes
// GET /developpeurs : Récupère tous les developpeurs
developpeurRouter.get('/developpeurs', async (req, res) => {
    try {
        const developpeurs = await DeveloppeurController.getAllDeveloppeurs()
        res.status(200).send(developpeurs);
    } catch (err) {
        res.status(500).send('Erreur serveur.');
    }
});

// GET /developpeurs/:id : Récupère un Developpeur par son ID
developpeurRouter.get('/developpeurs/:id', async (req, res) => {
    try {
        const developpeur = await DeveloppeurController.getOneDeveloppeur(req.params.id);
        if (!developpeur) {
            res.status(404).send("Developpeur non trouvé.");
        }
        res.status(200).send(developpeur);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// POST /developpeurs : Ajoute un nouveau Developpeur
developpeurRouter.post('/developpeurs', async (req, res) => {
    
    const nom = req.body.nom
    const prenom = req.body.prenom
    const code = req.body.code
    const anciennete = req.body.anciennete

    if (!nom || !prenom || !code || !anciennete) {
        res.status(400).send("Données incomplètes.");
    }

    try {
        const nouveauDeveloppeur = await DeveloppeurController.addOneDeveloppeur(req.body)
        res.status(201).send(nouveauDeveloppeur);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// PUT /developpeurs/:id : Modifie un Developpeur existant
developpeurRouter.put('/developpeurs/:id', async (req, res) => {
    try {
        
        const nom = req.body.nom
        const prenom = req.body.prenom
        const code = req.body.code
        const anciennete = req.body.anciennete
        const projets = req.body.projets

        if (!nom && !prenom && !code && !anciennete && !projets) {
            res.status(400).send("Données incomplètes.");
        }

        const developpeur = await DeveloppeurController.modifyDeveloppeur(req.params.id, req.body);
        
        if (!developpeur) {
            return res.status(404).send("Developpeur non trouvé.");
        }
        
        
        res.status(200).send(developpeur);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /developpeurs : Supprime tous les developpeurs
developpeurRouter.delete('/developpeurs', async (req, res) => {
    try {
        await DeveloppeurController.deleteAllDeveloppeurs();
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /developpeurs/:id : Supprime un Developpeur par son ID
developpeurRouter.delete('/developpeurs/:id', async (req, res) => {
    try {
        const Developpeur = await DeveloppeurController.deleteOneDeveloppeur(req.params.id);
        if (!Developpeur) {
            return res.status(404).send("Developpeur non trouvé.");
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

module.exports = developpeurRouter