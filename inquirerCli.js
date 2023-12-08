
var accountConnexion = require('./accountConnexion.js');
var readlineSync = require('readline-sync');
var {Parser} = require('./parser.js');
var fs = require('fs');
var {QCM}= require('./qcm.js');
var colors = require('colors');

isConneted = true;
while (true) {
    if(isConneted == false){
        var whoIsUser = accountConnexion();
        isConneted = true;
    }
    if(test == undefined){
        var test = new QCM([]);
    }
    if(importQuestions == undefined){
        var importQuestions = new QCM([]);
    }
    if (importQuestions.questions.length == 0) {
        let choix = readlineSync.keyInSelect(['Parcourir la banque de question', 'Quitter'], 'Que souhaitez-vous faire ?');
        if (choix === 0) {
            importQuestions = parcourirBanqueQuestion();
        } else if (choix === 1) {
            break; // Quitter le programme
        }
    } else {
    let choix = readlineSync.keyInSelect(['Parcourir la banque de question', 'Selectionner les questions du test', 'Afficher toutes les questions selectionnées', 'Qualite du test', 'Simuler Test', 'Exporter Test', 'Quitter'], 'Que souhaitez-vous faire ?');

    if (choix === 0) {
        importQuestions = parcourirBanqueQuestion();
    } else
    if (choix === 1) {
        while (true) {
            let choix1 = readlineSync.keyInSelect(['Selection', 'Deselection', 'Terminer la selection'], 'Quel operation souhaitez vous utiliser ?');
            if (choix1 === 0) {
                let userInput = readlineSync.question('Entrer un entier entre 0 et ' + (importQuestions.questions.length-1)+' : ');
                let number = parseInt(userInput);
                if (!isNaN(userInput) && userInput >= 0 && userInput < importQuestions.questions.length-1) {
                    questionSelection(importQuestions, test, number, "selection");

                } else {
                    console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                }

            } else if (choix1 === 1) {
                let userInput = readlineSync.question('Entrer un entier entre 0 et ' + (test.questions.length-1)+' : ');
                let number = parseInt(userInput);
                if (!isNaN(userInput) && userInput >= 0 && userInput < importQuestions.questions.length) {
                    questionSelection(importQuestions, test, number, "deselection");

                } else {
                    console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                }
            } else if (choix1 === 2) {
                break; // Quitter le programme
            }
        }
    } else if (choix === 2) {
        test.afficherToutesQuestions();

    } else if (choix === 3) {
        test.verifierQualite();
    } else if (choix === 4) {
        test.passerTest();

    } else if (choix === 5) {
        test.exporterFichier();
        console.log("Le fichier a été exporté avec succès.".green);
    }
    else if (choix === 6) {
        break; // Quitter le programme
    }
    }
}

if (test.questions.length == 0) {
}

function parcourirBanqueQuestion() {
    let importQuestions;
    console.clear();
    let path = "./questions_data";
    const getDirectories = fs.readdirSync(__dirname+'/questions_data', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    console.log("Veuillez choisir un dossier :");
    getDirectories.forEach(element => {
        console.log(element);
    });
    let choix = readlineSync.question("Choix : ");
    path += "/" + choix;
    const getFile = fs.readdirSync(path);
    console.log("Veuillez choisir un fichier :");
    getFile.forEach(element => {
        console.log(element);
    });
    choix = readlineSync.question("Choix : ");
    path += "/" + choix;
    let importRaw = fs.readFileSync(path, 'utf8');
    let parser = new Parser();
    parser.parse(importRaw);
    importQuestions = new QCM(parser.parsedQuestions);
    console.log("Voici les questions importées :");
    importQuestions.afficherToutesQuestions();
    return importQuestions;
}

function questionSelection(parsedQuestions, test ,numeroQuestion, action) {
    if (action === 'selection') {
        // Ajouter la question à la liste des questions sélectionnées
        // Vous pourriez avoir une propriété pour stocker les questions sélectionnées dans votre classe
        test.questions.push(parsedQuestions.questions[numeroQuestion - 0]);
        console.log(`Question ${numeroQuestion} sélectionnée.`.green);
        console.log(`${parsedQuestions.questions[numeroQuestion].text} (${parsedQuestions.questions[numeroQuestion].typeOfQuestion})`.green);
    } else if (action === 'deselection') {
        // Retirer la question de la liste des questions sélectionnées
        // Vous pourriez avoir une propriété pour stocker les questions sélectionnées dans votre classe
                test.questions = test.questions.filter((question) => question !== parsedQuestions.questions[numeroQuestion]);
                console.log(`Question ${numeroQuestion} désélectionnée.`.green);

    } else {
        console.log('Action invalide. Utilisez "selection" ou "deselection".'.red);
    }   
}