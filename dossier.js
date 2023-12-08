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

function lireTest(fichier){
    let test = importerQuestions(fichier);
    return test;
}

function lireDossier(dossier){
    const cheminDossier = path.join(__dirname, '..', dossier);
    let valide = estUnDossier(chemindossier);
    if (valide) {
        const ensembleDeQuestions = [];

    } else {
        console.log('Le chemin d\'accès n\'est pas un dossier ou n\'existe pas.');
    }
}

async function parcourirDossierAsync(dossier) {
    try {
        const fichiers = await fs.readdir(dossier);
        const fichiersGift = fichiers.filter(fichier => path.extname(fichier) === '.gift');
        const fichiersDossier = [];
        fichiersGift.forEach(async fichier => {
            fichiersDossier.push(path.join(dossier, fichier))
            console.log(path.join(dossier, fichier));
        });
        return fichiersDossier;
    } catch (erreur) {
        console.error('Erreur lors du parcours du dossier :', erreur);
    }
}

function estUnDossier(chemin) {
    try {
        const stats = fs.statSync(chemin);
        return stats.isDirectory();
    } catch (error) {
        console.error('Erreur lors de la vérification du dossier :', error);
        return false;
    }
}
