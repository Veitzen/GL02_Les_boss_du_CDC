const questionsModule = require('./questions');
const quizModule = require('./quiz');
const questionselectionnee = questionsModule.questionselectionnee;
const prompt = require('prompt-sync')();


questionsModule.afficherQuestions();

function accueil() {
    rl.question('Accueil, "Afficher" pour afficher les questions, "Test" pour afficher le test en cours', (commande) => {
        if (commande.toLowerCase() === 'Afficher'){
            questionsModule.afficherQuestions();
            rl.question('Entrez l indice de la question à selectionner ou deselectionner, "Retour" pour revenir à l accueil', (indice) => {
                if (indice.parseInt(valeur, 10)){
                    console.log('Vous avez choisi la question ${index}');
                    questionsModule.afficherQuestion(index);
                    rl.question('"Selectionner" pour ajouter à votre test, "Deselectionner" pour supprimer de votre test, "Retour" pour revenir à l accueil', (choix) => {
                        if (choix.toLowerCase() === 'Selectionner'){
                            questionsModule.selectionnerQuestion(index);
                            console.log('La question ${index} aété ajoutée au text en cours');
                        } else if (choix.toLowerCase() === 'Deselectionner') {
                            const presente = questionsModule.dansLeTest(index);
                            if (presente) {
                                questionselectionnee.deselectionnerQuestion(index);
                                console.log('La question ${index} a été ajoutée au test en cours');
                                quizModule.afficherQuizz();
                            } else {
                                console.log('La question ${index} n est pas dans le test en cours');
                            };
                        } else if (choix.toLowerCase() === 'Retour') {
                            accueil();
                        } else {
                            console.log("Saisie Invalide");
                        }
                    })
                } else if (indice.toLowerCase() === 'Retour') {
                    accueil();
                }
            })
        } else if (commande.toLowerCase() === 'Test'){
            quizModule.afficherQuizz();
        }
    })

}

function accueil2(){
    const commande = prompt('Accueil, "Afficher" pour afficher les questions, "Test" pour afficher le test en cours');
    if (commande === 'Afficher'){
        questionsModule.afficherQuestions();
        const indice = prompt('Entrez l indice de la question à selectionner ou deselectionner, "Retour" pour revenir à l accueil');
            if (indice === 'Retour'){
                accueil2();
            } else if (Number.isInteger(indice)) {
                console.log('Vous avez choisi la question ${indice}');
                questionsModule.afficherQuestion(indice);
                const choix = prompt('"Selectionner" pour ajouter à votre test, "Deselectionner" pour supprimer de votre test, "Retour" pour revenir à l accueil');
                if (choix === 'Selectionner'){
                    questionsModule.selectionnerQuestion(indice);
                    console.log('La question ${indice} aété ajoutée au text en cours');
                } else if (choix === 'Deselectionner') {
                    const presente = questionsModule.dansLeTest(indice);
                    if (presente) {
                        questionselectionnee.deselectionnerQuestion(indice);
                        console.log('La question ${indice} a été ajoutée au test en cours');
                        quizModule.afficherQuizz();
                    } else {
                        console.log('La question ${indice} n est pas dans le test en cours');
                    };
                } else if (choix === 'Retour') {
                    accueil2();
                } else {
                    console.log("Saisie Invalide");
                }
            }
    } else if (commande === 'Test'){
        quizModule.afficherQuizz();
    }
}

prompt('Accueil, "Afficher" pour afficher les questions, "Test" pour afficher le test en cours');
accueil2();



/*function poserQuestions() {
    rl.question('Entrez un index pour afficher la question correspondante, "selectionner" pour choisir une question, ou "quiz" pour gérer le quiz : ', (reponse) => {
        if (reponse.toLowerCase() === 'selectionner') {
            rl.question('Entrez l\'index de la question à sélectionner : ', (index) => {
                questionsModule.selectionnerQuestion(parseInt(index, 10));
                poserQuestions();
            });
        } else if (reponse.toLowerCase() === 'quiz') {
            gererQuiz();
        } else {
            const index = parseInt(reponse, 10);
            if (!isNaN(index)) {
                console.log(`Question ${index}:`);
                console.log(questionsModule.questionquiz[index - 1].text);
            }
            poserQuestions();
        }
    });
}

function gererQuiz() {
    rl.question('Que voulez-vous faire dans le quiz? (ajouter/retirer/afficher/terminer) : ', (action) => {
        switch (action.toLowerCase()) {
            case 'ajouter':
                rl.question('Entrez l\'index de la question à ajouter au quiz : ', (index) => {
                    quizModule.ajouterQuestionAuQuiz(parseInt(index, 10));
                    gererQuiz();
                });
                break;
            case 'retirer':
                rl.question('Entrez l\'index de la question à retirer du quiz : ', (index) => {
                    quizModule.retirerQuestionDuQuiz(parseInt(index, 10));
                    gererQuiz();
                });
                break;
            case 'afficher':
                quizModule.afficherQuiz();
                gererQuiz();
                break;
            case 'terminer':
                poserQuestions();
                break;
            default:
                console.log('Action non reconnue. Veuillez choisir entre "ajouter", "retirer", "afficher" ou "terminer".');
                gererQuiz();
        }
    });
}

// Fonction récursive pour créer une navigation imbriquée
function naviguer() {
    rl.question('Que voulez-vous faire? (poserStatut/poserQuestions/naviguer/terminer) : ', (choix) => {
        switch (choix.toLowerCase()) {
            case 'poserstatut':
                poserStatut();
                naviguer();
                break;
            case 'poserquestions':
                poserQuestions();
                naviguer();
                break;
            case 'naviguer':
                naviguer();
                break;
            case 'terminer':
                rl.close();
                break;
            default:
                console.log('Choix non reconnu. Veuillez choisir entre "poserStatut", "poserQuestions", "naviguer" ou "terminer".');
                naviguer();
        }
    });
}

// Commencez le programme en appelant la fonction de navigation
naviguer();*/