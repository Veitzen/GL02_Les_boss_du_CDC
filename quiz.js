const questionsModule = require('./questions');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');

// Afficher les questions sélectionnées pour le quiz
function afficherQuizz() {
    if (questionsModule.questionselectionnee.length === 0) {
        console.log('Pas de test en cours');
    } else {
        console.log('Votre test :');
        questionsModule.questionselectionnee.forEach((question, index) => {
            console.log(`${index + 1}. ${question.text}`);
        });
    }
}


// Exporter les méthodes pour pouvoir les utiliser dans d'autres fichiers
module.exports = {
    afficherQuizz
};
