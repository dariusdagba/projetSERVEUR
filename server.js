const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const app = express();
app.use(bodyParser.json());

const adresseRouter=require("./routes/AdresseRoutes")
const developpeurRouter=require("./routes/DeveloppeurRoutes")
const entrepriseRouter=require("./routes/EntrepriseRoutes")
const projetRouter=require("./routes/ProjetRoutes")

app.use(adresseRouter)
app.use(developpeurRouter)
app.use(entrepriseRouter)
app.use(projetRouter)


app.listen(3024, () => {
    console.log(`Le serveur écoute sur le port 3024`);
    // Connexion à MongoDB
    mongoose
    .connect('mongodb://localhost:27017/groupe2')
    .then(() => console.log('Connexion avec MongoDB effectuée avec succès'))
    .catch((err) => console.error('Connexion avec MongoDB échouée'));

});