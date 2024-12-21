
const EntrepriseModel = require("../models/EntrepriseModel")
class EntrepriseController {

    static async getAllEntreprises(){
        const Entreprise= await EntrepriseModel.find();
        return Entreprise
    }
    static async getOneEntreprise(id) {
        const entreprise = EntrepriseModel.findById(id);
        return entreprise
    }

    static async addOneEntreprise(nouvellesDonnee) {
        const nouveauEntreprise = new EntrepriseModel(nouvellesDonnee);
        await nouveauEntreprise.save();
        return nouveauEntreprise
    }

    static async modifyEntreprise(id, nouvellesDonnee) {
        const entrepriseModifie = await EntrepriseModel.findByIdAndUpdate(id, nouvellesDonnee);
        return entrepriseModifie
    }

    static async deleteAllEntreprises() {
        await EntrepriseModel.deleteMany();
        return null
    }

    static async deleteOneEntreprise(id) {
        const entrepriseSupprime = await EntrepriseModel.findByIdAndDelete(id);
        return entrepriseSupprime
    }
}

module.exports = EntrepriseController