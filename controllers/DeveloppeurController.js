const DeveloppeurModel = require("../models/DeveloppeurModel")
class DeveloppeurController {

    static async getAllDeveloppeurs(){
        const Developpeurs= await DeveloppeurModel.find();
        return Developpeurs
    }
    static async getOneDeveloppeur(id) {
        const developpeur = DeveloppeurModel.findById(id);
        return developpeur
    }

    static async addOneDeveloppeur(nouvellesDonnee) {
        const nouveauDeveloppeur = new DeveloppeurModel(nouvellesDonnee);
        await nouveauDeveloppeur.save();
        return nouveauDeveloppeur
    }

    static async modifyDeveloppeur(id, nouvellesDonnee) {
        const developpeurModifie = await DeveloppeurModel.findByIdAndUpdate(id, nouvellesDonnee);
        return developpeurModifie
    }

    static async deleteAllDeveloppeurs() {
        await DeveloppeurModel.deleteMany();
        return null
    }

    static async deleteOneDeveloppeur(id) {
        const developpeurSupprime = await DeveloppeurModel.findByIdAndDelete(id);
        return developpeurSupprime
    }
}

module.exports = DeveloppeurController