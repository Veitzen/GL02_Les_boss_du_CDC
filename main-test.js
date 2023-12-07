
//Main pour tester l'appel des programmes

//Programme pour créer fichier Vcard avec infos de l'utilisateur
//const infoToVcard = require('./infoToVcard');
//infoToVcard();

//Programme pour créer un compte
const accountConnexion = require('./accountConnexion');
let whoIsUser = accountConnexion();
console.log('user est de type ' + whoIsUser);