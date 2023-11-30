// Déclaration de classes qu'on utilise dans le projet (les 2 types d'objets qu'on manipule)

// Définir la classe Question à partir de "Sémantique des données"
class Question {
    symb = ["//", "::", "["];

    constructor(typeQuestion, question) {
        this.typeQuestion = typeQuestion;
        this.question = question;
    }
}

class VraiFaux extends Question {
    constructor(typeQuestion, question, reponse) {
        super(typeQuestion, question);
        this.reponse = reponse;
    }
}

class ChoixMultiple extends Question {
    constructor(typeQuestion, question, reponses) {
        super(typeQuestion, question);
        this.reponses = reponses;
    }
}

class TexteTroue extends Question {
    constructor(typeQuestion, question, reponse) {
        super(typeQuestion, question);
        this.reponse = reponse;
    }
}



// Définition de la classe QCM à partir de "Sémantique des données"
class QCM {
    questions = [];
    constructor(questions) {
        this.questions = questions;
    }
}