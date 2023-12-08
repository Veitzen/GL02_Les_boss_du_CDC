var readlineSync = require('readline-sync');
//Main pour tester l'appel des programmes

//Programme pour créer un compte
const accountConnexion = require('./accountConnexion');
let whoIsUser = accountConnexion();
console.log(whoIsUser)
console.log('user est de type ' + whoIsUser[0]);
console.log('user s\'appelle ' + whoIsUser[1]);

//Programme pour créer fichier Vcard avec infos de l'utilisateur
const infoToVcard = require('./infoToVcard');

let choix = readlineSync.question("\nVoulez vous creer un Vcard ?\n[1] Oui     [2] Non\n");
if (choix == 1){
    infoToVcard(whoIsUser[1]);
}

//Programme pour afficher les statistiques moyennes des examens
    //Simulation des paramètres d'entrée
    let ENTRYnbrMultChoice = '12';
    let ENTRYnbrTrueFalse = '8';
    let ENTRYnbrDate = '15';
    let ENTRYnbrWord = '22';
    let ENTRYnbrOther = '3';   

const averageExamProfile = require('./averageExamProfile');
if (whoIsUser[0] == 'SRYEM'){
    let choix = readlineSync.question("Voulez vous voir les statistiques des examens ?\n[1] Oui     [2] Non\n");
    if (choix == 1){
    averageExamProfile(ENTRYnbrMultChoice, ENTRYnbrTrueFalse, ENTRYnbrDate, ENTRYnbrWord, ENTRYnbrOther);
    }
}
