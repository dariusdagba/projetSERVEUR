const AdresseModel = require("../models/AdresseModel")
class AdresseController {

    static async getAllAdresses(){
        const Adresses= await AdresseModel.find();
        return Adresses
    }
    static async getOneAdresse(id) {
        const adresse = AdresseModel.findById(id);
        return adresse
    }

    static async addOneAdresse(nouvellesDonnee) {
        const nouveauAdresse = new AdresseModel(nouvellesDonnee);
        await nouveauAdresse.save();
        return nouveauAdresse
    }

    static async modifyAdresse(id, nouvellesDonnee) {
        const adresseModifie = await AdresseModel.findByIdAndUpdate(id, nouvellesDonnee);
        return adresseModifie
    }

    static async deleteAllAdresses() {
        await AdresseModel.deleteMany();
        return null
    }

    static async deleteOneAdresse(id) {
        const adresseSupprime = await AdresseModel.findByIdAndDelete(id);
        return adresseSupprime
    }
}

module.exports = AdresseController