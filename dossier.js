const fs = require('fs');
const {Parser} = require('./parser');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');
const vega = require('vega');
const vegalite = require('vega-lite');
const path = require('path');

//fonction avec en argument le chemin du fichier à importer
function importerQuestions(chemin){
    const parser = new Parser();
    let data = fs.readFileSync(chemin, 'utf8');
        parser.parse(data);
        let results = parser.parsedQuestions;
        return results;
}

function obtenirFichiers(cheminDossier) {
    try {
        const nomsFichiers = fs.readdirSync(cheminDossier);
        return nomsFichiers;
    } catch (erreur) {
        console.error('Erreur lors de la récupération des noms de fichiers :', erreur.message);
        return [];
    }
}

function questionsDossiers(cheminDossier){
    let questionsAllFichiers = [];
    const nomsFichiers = obtenirFichiers(cheminDossier);
    nomsFichiers.forEach ((fichier) => {
        const questionOneFichier = importerQuestions('../Groupe/' + fichier);
        questionsAllFichiers = questionsAllFichiers.concat(questionOneFichier);
    });
    return questionsAllFichiers;
}

function nombreTypeQuestion(Questions){
    let countType = [
        ['Description', 0],
        ['ChoixMultiple',0],
        ['Appariement', 0],
        ['ReponseCourte',0],
        ['VraiFaux', 0],
        ['ReponseNumerique',0]
       ];
    Questions.forEach((question) => {
        countType.forEach((index) => {
            
        })
    })
}

function comparerTest(cheminTest, cheminGroupe){
    const testAComparer = importerQuestions(cheminTest); //questions du test
    const groupeAComparer = questionsDossiers(cheminGroupe); //questions du dossier

}

module.exports = {
    importerQuestions, 
    obtenirFichiers,
    questionsDossiers,
    nombreTypeQuestion,
    comparerTest,
}
