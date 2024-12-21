const express = require('express')
const ProjetController = require("../controllers/ProjetController")

const projetRouter = express.Router()

// Routes
// GET /projets : Récupère tous les projets
projetRouter.get('/projets', async (req, res) => {
    try {
        const projets = await ProjetController.getAllProjets()
        res.status(200).send(projets);
    } catch (err) {
        res.status(500).send('Erreur serveur.');
    }
});

// GET /projets/:id : Récupère un projet par son ID
projetRouter.get('/projets/:id', async (req, res) => {
    try {
        const projet = await ProjetController.getOneProjet(req.params.id);
        if (!projet) {
            res.status(404).send("projet non trouvé.");
        }
        res.status(200).send(projet);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// POST /projets : Ajoute un nouveau projet
projetRouter.post('/projets', async (req, res) => {
    
    const titre = req.body.titre
    const progres = req.body.progres
    const deadline = req.body.deadline

    if (!titre || !progres || !deadline) {
        res.status(400).send("Données incomplètes.");
    }

    try {
        const nouveauProjet = await ProjetController.addOneProjet(req.body)
        res.status(201).send(nouveauProjet);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// PUT /projets/:id : Modifie un projet existant
projetRouter.put('/projets/:id', async (req, res) => {
    try {
        
        const titre = req.body.titre
        const progres = req.body.progres
        const deadline = req.body.deadline
        const developpeurs = req.body.developpeurs

        if (!titre && !progres && !deadline && !developpeurs) {
            res.status(400).send("Données incomplètes.");
        }

        const projet = await ProjetController.modifyProjet(req.params.id, req.body);
        
        if (!projet) {
            return res.status(404).send("projet non trouvé.");
        }
        
        
        res.status(200).send(projet);
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /projets : Supprime tous les projets
projetRouter.delete('/projets', async (req, res) => {
    try {
        await ProjetController.deleteAllProjets();
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

// DELETE /projets/:id : Supprime un projet par son ID
projetRouter.delete('/projets/:id', async (req, res) => {
    try {
        const projet = await ProjetController.deleteOneProjet(req.params.id);
        if (!projet) {
            return res.status(404).send("projet non trouvé.");
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Erreur serveur.");
    }
});

module.exports = projetRouter