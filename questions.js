const fs = require('fs');
const {Parser} = require('./parser');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');
const vega = require('vega');
const vegalite = require('vega-lite');
const { forEach } = require('vega-lite/build/src/encoding');
const path = require('path');


//importer les questions depuis les fichiers à l'aide du parser
//retourner un tableau de class Question
//fonction utilisée pour l'exemple
function importerQuestions(){
    const parser = new Parser();
    let data = fs.readFileSync('GIFT-examples.gift', 'utf8');
        parser.parse(data);
        let results = parser.parsedQuestions;
        return results;
}

//fonction avec en argument le chemin du fichier à importer
function importerQuestions(chemin){
    const parser = new Parser();
    let data = fs.readFileSync(chemin, 'utf8');
        parser.parse(data);
        let results = parser.parsedQuestions;
        return results;
}

//parcourir le tableau des class Question et afficher l'index et le contenu de chaque question
function afficherAllQuestions(Questions) {
    Questions.forEach((parsedQuestion, index) => {
        console.log(`${index + 1}. ${parsedQuestion.text} \n`);
    });
}

//afficher la question d'index précisé par l'utilisateur
function afficherQuestion(Questions, index) {
    if (index > 0 && index <= Questions.length){
        console.log(`${index}. ${Questions[index-1].text} \n`);
    }else{
        console.log('Index invalide');
        return false;
    }
}
    
//afficher le contenu du test crée par l'utilisateur
function afficherTest(Test){
    if (Test.length != 0){
        console.log('Votre test : \n')
        afficherAllQuestions(Test);
    }else{
        console.log('Aucune question dans votre test');
        return false;
    }
}

//vérifier sir la question concernée est déjà présente dans le test
//ajouter à la table Test la question d'index précisé par l'utilisateur
function selectionnerQuestion(Questions, Test, index){
    if (index > 0 && index <= Questions.length){
        let already = false;
        Test.forEach((parsedQuestion) => {
            if (parsedQuestion === Questions[index-1]) {
                already = true;
            }
        })
        if (already === true){
            console.log(`La question ${index} est déjà dans votre test`);
            return false;
        }else{
            Test.push(Questions[index-1]);
        console.log(`La question ${index} a été ajoutée à votre test`);
        }
    }else{
        console.log('Index invalide');
        return false;
    }
}

//supprimer du test la question d'index précisé par l'utilisateur
//l'index spécifié est l'index dans le test != l'index dans la liste de question
function deselectionnerQuestion(Test, index){
    if (index > 0 && index <= Test.length){
        Test.splice(index-1, 1);
        console.log(`La question ${index} a été supprimée de votre test`);
    }else{
        console.log('Index invalide');
        return false;
    }
}

function lireTest(fichier){
    let test = importerQuestions(fichier);
    return test;
}

function lireDossier(dossier){
    const cheminDossier = path.join(__dirname, '..', dossier);
    let valide = estUnDossier(cheminossier);
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


//afficher les statistiques d'un test
//enregistre un histogramme avec la répartition des types de question dans le test
function statistiques(Test){
    let Values = [];
    Test.forEach((parsedQuestion) => {
        Values.push({
            type: parsedQuestion.typeQuestion,
            count: 1,
        });
    })
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title":"Répartition des types de questions dans votre test",
        "data": {
            "values" : Values
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "type", "type": "nominal"},
            "y": {"field": "count", "type": "quantitative"},
            "size": {"value": 20},
            "color": {"value": "#8C466F "}
        },
    };

    let specCompiled = vegalite.compile(spec).spec;
    const runtime = vega.parse(specCompiled);
    const view = new vega.View(runtime).renderer('svg').run();
    mySvg = view.toSVG();
        mySvg.then(svg => {
            fs.writeFileSync('histogram.svg', svg);
            view.finalize();
            console.log('L\'histogramme a été enregistré avec succès dans le fichier "histogram.svg". \n');
        })
        .catch(error => console.error(error));
}



// Exportez les fonctions pour pouvoir les utiliser dans d'autres fichiers
module.exports = {
    importerQuestions,
    afficherAllQuestions,
    afficherQuestion,
    afficherTest,
    selectionnerQuestion,
    deselectionnerQuestion,
    lireTest,
    lireDossier,
    parcourirDossierAsync,
    statistiques
};


