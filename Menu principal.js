const colors = require('colors');
let fs = require('fs'); 
const rd = require('readline-sync'); 
const par = require('./parser.js');
const { Question } = require('./qcm.js');
const vegalite = require('vega-lite');
const cli = require("@caporal/core").default;

//Tableau ou les questions sélectionnées seront stockés
//let questionsSelectionnees = [];
//On n'appelle pas cette variable dans les fonctions comme elle est définie dans le fichier
function importerquestions(){
    const parser = par.Parser;
    let data=rd.readlineSync('U5-p49-Subject_verb_agreement.gift', 'utf8');
    parser.Parse(data);
    let parsedQuestions=parser.parsedQuestions;
    return parsedQuestions;
}


function questionSelection(parsedQuestions, numeroQuestion, action) {
    if (action === 'selection') {
        // Ajouter la question à la liste des questions sélectionnées
        // Vous pourriez avoir une propriété pour stocker les questions sélectionnées dans votre classe
        questionsSelectionnees.push(parsedQuestions[numeroQuestion - 0]);
        console.log(`Question ${numeroQuestion} sélectionnée.`.green);
    
        console.log(`${parsedQuestions[numeroQuestion].text} (${parsedQuestions[numeroQuestion].typeQuestion})`.green);
    
    } else if (action === 'deselection') {
        // Retirer la question de la liste des questions sélectionnées
                if (!questionsSelectionnees.includes(parsedQuestions[numeroQuestion - 0])) {
                    console.log("On ne peut supprimer un element qui n'existe pas".red);
                } else if(questionsSelectionnees.includes(parsedQuestions[numeroQuestion - 0])){
                    
                // Vous pourriez avoir une propriété pour stocker les questions sélectionnées dans votre classe
                questionsSelectionnees = questionsSelectionnees.filter((question) => question !== parsedQuestions[numeroQuestion]);
                console.log(`Question ${numeroQuestion} désélectionnée.`.green);
                        }
    } else {
        console.log('Action invalide. Utilisez "selection" ou "deselection".'.red);
    }   
}

function afficherSelection(){
    console.log(questionsSelectionnees.forEach((questions,index) =>{console.log(`Question ${index}: ${questions.text}   (${questions.typeQuestion})\n`.green);}));
}

function hasDuplicates() {
    return _.uniq(questionsSelectionnees).length !== questionsSelectionnees.length;
}

function simulateTest() {
    // Afficher le message de démarrage de la simulation
    console.log('\n\tSimulation du test en cours...\n');
    console.log('Le test est en marche commencer deja a remplir:\n');
    let point=0;
    // Boucler sur les questions sélectionnées
    for (let i = 0; i < questionsSelectionnees.length; i++) {
        const question = questionsSelectionnees[i];
        
        // Afficher la question
        //console.log(``);

        // Demander à l'enseignant de fournir une réponse simulée
        let reponse = readlineSync.question(`Question ${i + 1}: ${question.text} ________`);
        
        
        const rep=`${question.answers}`;
       //n'extrait pas toute les reponses
        let  match = rep.match(/\{=(.*?)\}/);
        let chaineExtraite = match ? match[1] : null;
        
        if(reponse===chaineExtraite){
            point=point+1;
        }

        // Afficher la réponse correcte (à des fins de vérification)
        console.log(`Reponse correcte: ${question.answers}`);

        }

    // Afficher le message de fin de simulation
    console.log('Simulation du test terminée.Et vous avez eu '+point+'/'+questionsSelectionnees.length);
}

module.exports = {
    questionSelection,
    afficherSelection,
    hasDuplicates,
    simulateTest,
    importerquestions
};

//menu tant que pour le menu
/*while (true) {
    let choix = readlineSync.keyInSelect(['Afficher tous les questions', 'Selectionner les questions du test','Afficher tous les questions selectionnes','Qualiter du test','Simuler Test','Quitter'], 'Que souhaitez-vous faire ?');
    
    parser.parse(data);
    
    if (choix === 0) {
            
            if (parser.errorCount === 0) {
            } else {
                console.log("The .gift file contains error".red);
            }
            //console.log(parser.tokenize(data));
            
            console.log(parser.parsedQuestions.forEach((questions,index) =>{console.log(`Question ${index}: ${questions.text}   (${questions.typeQuestion})\n`.green);}));
           
      
    } else if (choix === 1) {

                while (true) {
                    let choix1 = readlineSync.keyInSelect(['selection', 'deselection', 'Terminer la selection'], 'Quel operation souhaitez vous utiliser ?');
                
                    if (choix1 === 0) {
                                let userInput = readlineSync.question('entrer un entier ');
                                let number=parseInt(userInput);
                                
                                //parser.parse(data);// en gros il faut rappeller le parser sinon parse.parsedQuestions=0
                                //verifier que le nombre entrer appartient à la liste de classe
                                if (!isNaN(userInput) && userInput >= 0 && userInput < parser.parsedQuestions.length) {
                                    parser.QuestionSelection(number,"selection");
                                    
                                } else {
                                    console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                                }

                    } else if (choix1 === 1) {
                                let userInput = readlineSync.question('entrer un entier ');
                                let number=parseInt(userInput);
                                
                                //parser.parse(data);// en gros il faut rappeller le parser sinon parse.parsedQuestions=0
                                //verifier que le nombre entrer appartient à la liste de classe
                                if ( !isNaN(userInput) && userInput >= 0 && userInput < parser.parsedQuestions.length) {
                                    parser.QuestionSelection(number,"deselection");
                                    
                                } else {
                                    console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                                }
                                
                                
                            
                    } else if (choix1 === 2) {
                           break; // Quitter le programme
                    }
                }
      
    } else if (choix === 2) {
          parser.AfficherSelection();
    
    }else if (choix === 3) {
                    const a=parser.hasDuplicates();
                if(!a){
                    console.log("Le test sans problème".green);
                }else{
                    console.log("Le test contient des doublons de meme question".red);
                }
          
  }else if (choix === 4) {
    parser.simulateTest();
         
  
  }else if (choix === 5) {
        break; // Quitter le programme
      }
}	*/