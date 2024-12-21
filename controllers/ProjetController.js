
const ProjetModel = require("../models/ProjetModel")
class ProjetController {

    static async getAllProjets(){
        const Projets= await ProjetModel.find();
        return Projets
    }
    static async getOneProjet(id) {
        const projet = ProjetModel.findById(id);
        return projet
    }

    static async addOneProjet(nouvellesDonnee) {
        const nouveauProjet = new ProjetModel(nouvellesDonnee);
        await nouveauProjet.save();
        return nouveauProjet
    }

    static async modifyProjet(id, nouvellesDonnee) {
        const projetModifie = await ProjetModel.findByIdAndUpdate(id, nouvellesDonnee);
        return projetModifie
    }

    static async deleteAllProjets() {
        await ProjetModel.deleteMany();
        return null
    }

    static async deleteOneProjet(id) {
        const projetSupprime = await ProjetModel.findByIdAndDelete(id);
        return projetSupprime
    }
}

module.exports = ProjetController