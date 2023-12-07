const fs = require('fs');
const Parser = require('./parser');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');

function afficherQuestions() {
    // Créez une instance de Parser
    const parser = new Parser();

    // Lisez le fichier et effectuez le parsing
    fs.readFile('GIFT-examples.gift', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Effectuez le parsing
        parser.parse(data);

        // Accédez aux questions analysées
        const questions = parser.parsedQuestions;

        // Affichez les questions sans les réponses
        questions.forEach((question, index) => {
            console.log(`${index + 1}. ${question.text}`);
            console.log(); // Ligne vide pour séparer les questions
        });
    });
}

function afficherQuestion(index) {
    // Créez une instance de Parser
    const parser = new Parser();

    // Lisez le fichier et effectuez le parsing
    fs.readFile('GIFT-examples.gift', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Effectuez le parsing
        parser.parse(data);

        // Accédez aux questions analysées
        const questions = parser.parsedQuestions;

        // Vérifiez si l'index est valide
        if (index >= 0 && index < questions.length) {
            // Affichez la question correspondante
            const question = questions[index];
            console.log(`${index + 1}. ${question.text}`);
        } else {
            console.log('Index invalide. Veuillez spécifier un index valide.');
        }
    });
}

const questionselectionnee = []; // Liste pour stocker les questions sélectionnées

function selectionnerQuestion(index) {
    // Créez une instance de Parser
    const parser = new Parser();

    // Lisez le fichier et effectuez le parsing
    fs.readFile('GIFT-examples.gift', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Effectuez le parsing
        parser.parse(data);

        // Accédez aux questions analysées
        const questions = parser.parsedQuestions;

        // Vérifiez si l'index est valide
        if (index >= 0 && index < questions.length) {
            // Ajoutez la question à la liste questionselectionnee
            questionselectionnee.push(questions[index]);
            console.log(`Question ${index + 1} sélectionnée et ajoutée à la liste.`);
        } else {
            console.log('Index invalide. Veuillez spécifier un index valide.');
        }
    });
}

function deselectionnerQuestion(index) {
    // Vérifiez si l'index est valide
    if (index >= 0 && index < questionselectionnee.length) {
        // Supprimez la question de la liste questionselectionnee
        const deselectedQuestion = questionselectionnee.splice(index, 1)[0];
        console.log(`Question ${index + 1} désélectionnée et retirée de la liste.`);
        return deselectedQuestion;
    } else {
        console.log('Question non sélectionnée');
        return null;
    }
}

function dansLeTest(index) {
    return questionselectionnee.some((question) => question.index === index);
}

// Exportez les méthodes pour pouvoir les utiliser dans d'autres fichiers
module.exports = {
    afficherQuestions,
    afficherQuestion,
    selectionnerQuestion,
    deselectionnerQuestion,
    dansLeTest,
    questionselectionnee
};


//METHODES

class Question {
    static afficher(questions, index) {
        if (index >= 0 && index < questions.length) {
            const question = questions[index];
            console.log(`Titre : ${question.title}`);
            console.log(`Format : ${question.format}`);
            console.log(`Texte : ${question.text}`);
            console.log(`Réponses : ${question.answers.join(', ')}`);
            console.log(`Type de question : ${question.typeofQuestion()}`);
        } else {
            console.log('Index de question invalide.');
        }
    }

    afficherliste(){

    }
}

class QCM {
    afficherQCM() {
        this.questions.forEach((question, index) => {
            console.log(`Question ${index + 1}:`);
            Question.afficher(this.questions, index);
            console.log();
        });
    }
    
    // Vérifiez si la question à l'index spécifié est déjà dans la liste questionselectionnee
    questionDejaSelectionnee(index) {
        return this.questionselectionnee.some(question => question.title === this.questions[index].title);
    }

    selectionnerQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            if (!this.questionDejaSelectionnee(index)) {
                const selectedQuestion = new Question(
                    this.questions[index].title,
                    this.questions[index].format,
                    this.questions[index].text,
                    []
                );
                selectedQuestion.typeQuestion = this.questions[index].typeofQuestion();
                this.questionselectionnee.push(selectedQuestion);
                console.log(`Question ${index + 1} sélectionnée et ajoutée à la liste.`);
            } else {
                console.log(`La question à l'index ${index + 1} est déjà sélectionnée dans le test.`);
            }
        } else {
            console.log('Index invalide. Veuillez spécifier un index valide.');
        }
    }

    deselectionnerQuestion(index) {
        if (!this.questionDejaSelectionnee(index)) {
            console.log(`La question à l'index ${index + 1} n'est pas présente dans la liste.`);
            return null;
        } else if (index >= 0 && index < this.questionselectionnee.length) {
            const deselectedQuestion = this.questionselectionnee.splice(index, 1)[0];
            console.log(`Question ${index + 1} désélectionnée et retirée de la liste.`);
            return deselectedQuestion;
        } else {
            console.log('Index invalide. Veuillez spécifier un index valide.');
            return null;
        }
    }

}

