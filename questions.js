const fs = require('fs');
const {Parser} = require('./parser');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');
const vega = require('vega');
const vegalite = require('vega-lite');


//importer les questions depuis les fichiers à l'aide du parser
//retourner un tableau de class Question
function importerQuestions(){
    const parser = new Parser();
    let data = fs.readFileSync('GIFT-examples.gift', 'utf8');
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
        "data": {
            "values" : Values
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "type", "type": "nominal"},
            "y": {"field": "count", "type": "quantitative"},
        },
    };

    let specCompiled = vegalite.compile(spec).spec;
    const runtime = vega.parse(specCompiled);
    const view = new vega.View(runtime).renderer('svg').run();
    mySvg = view.toSVG();
        mySvg.then(svg => {
            fs.writeFileSync('histogram.svg', svg);
            view.finalize();
            console.log('L\'histogramme a été enregistré avec succès dans le fichier "histogram.svg".');
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
    statistiques
};


