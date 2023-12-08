
//Main pour tester l'appel des programmes

//Programme pour créer un compte
const accountConnexion = require('./accountConnexion');
let whoIsUser = accountConnexion();
console.log(whoIsUser)
console.log('user est de type ' + whoIsUser[0]);
console.log('user s\'appelle ' + whoIsUser[1]);

//Programme pour créer fichier Vcard avec infos de l'utilisateur
const infoToVcard = require('./infoToVcard');
infoToVcard(whoIsUser[1]);