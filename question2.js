const fs = require('fs');
const Parser = require('./parser');
const {Question} = require('./qcm');
const {QCM} = require('./qcm');


function afficherQuestions() {
    const parser = new Parser();
    fs.readFile('GIFT-examples.gift', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        parser.parse(data);
        const questions = parser.parsedQuestions;

        // Affichez les questions sans les réponses
        questions.forEach((question, index) => {
            console.log(`${index + 1}. ${question.text}`);
            console.log(); // Ligne vide pour séparer les questions
        });
    });
}