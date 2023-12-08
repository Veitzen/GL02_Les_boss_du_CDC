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

function TypeQuestion(Questions){
    let countType = [
        ['Description', 0],
        ['ChoixMultiple',0],
        ['Appariement', 0],
        ['ReponseCourte', 0],
        ['VraiFaux', 0],
        ['ReponseNumerique', 0],
        ['ReponseNumeriqueMultiple', 0],
        ['Composition', 0]
       ];
    Questions.forEach((question) => {
        countType.forEach((type) => {
            if (question.typeQuestion === type[0]) {
                type[1]++;
            }
        });
    })
    const repartType = pourcentageType(countType, Questions);
    return repartType;
}

function pourcentageType(repartType, Questions){
    repartType.forEach((type) => {
        const pourcentage = (type[1] * 100) / Questions.length;
        type[2] = parseFloat(pourcentage.toFixed(1));
    });
    return repartType;
}

function comparerTest(cheminTest, cheminGroupe){
    const testAComparer = importerQuestions(cheminTest); //questions du test
    const groupeAComparer = questionsDossiers(cheminGroupe); //questions du dossier
    const repartTest = TypeQuestion(testAComparer); //repartition des questions dans le test
    const repartGroupe = TypeQuestion(groupeAComparer); //repartition des questions dans le groupe
    console.log('Voici une comparaison de la répartitions des types de questions dans votre test avec le dossier de test choisi \n');
    repartTest.forEach((type, index) => {
        console.log(`${type[0]} : votre test -> ${type[2]}% // ${repartGroupe[index][2]}%`);
    })
}

module.exports = {
    importerQuestions, 
    obtenirFichiers,
    questionsDossiers,
    TypeQuestion,
    pourcentageType,
    comparerTest,
}
