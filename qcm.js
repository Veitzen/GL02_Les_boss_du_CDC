// Déclaration de classes qu'on utilise dans le projet (les 2 types d'objets qu'on manipule)

// Définir la classe Question à partir de "Sémantique des données"
class Question {

    constructor(title, format, text, answers) {
        this.title = title;
        this.format = format;
        this.text = text;
        this.answers = answers;
    }
    
    typeofQuestion() {
        if(this.text.endsWith("<Answer>")) {
            if((/{(T|F|TRUE|FALSE)/g.exec(this.answers[0]) != null)) {
                return "VraiFaux";
            } else if((/->/g).exec(this.answers[0]) != null) {
                return "Appariement";
            } else if(this.answers[0].startsWith("{#")) {
                if(this.answers[0].includes("=")) {
                    return "ReponseNumeriqueMultiple";
                } else {
                    return "ReponseNumerique";
                }
            } else if(this.answers[0] == "{}") {
                return "Composition";
            } else if(this.answers[0].includes("~")){
                return "ChoixMultiple";
            }
            else {
                return "ReponseCourte";
            }
        } else {
            return "MotManquant";
        }
    }

}



// Définition de la classe QCM à partir de "Sémantique des données"
class QCM {
    questions = [];
    constructor(questions) {
        this.questions = questions;
    }
    
}

module.exports = {Question, QCM};