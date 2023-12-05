// Déclaration de classes qu'on utilise dans le projet (les 2 types d'objets qu'on manipule)

// Définir la classe Question à partir de "Sémantique des données"
class Question {

    constructor(title, format, text, answerString) {
        this.title = title;
        this.format = format;
        this.text = text;
        this.answerString = answerString;
    }

    typeofQuestion() {
        if((this.text.match(/<Answer>/g) || []).length == 1) {
            if((/{(T|F|TRUE|FALSE)/g.exec(this.answerString[0]) != null)) {
                return "VraiFaux";
            } else if((/->/g).exec(this.answerString[0]) != null) {
                return "Appariement";
            } else if(this.answerString[0].startsWith("{#")) {
                if(this.answerString[0].includes("=")) {
                    return "ReponseNumeriqueMultiple";
                } else {
                    return "ReponseNumerique";
                }
            } else if(this.answerString[0] == "{}") {
                return "Composition";
            } else if(this.answerString[0].includes("~")){
                return "ChoixMultiple";
            }
            else {
                return "ReponseCourte";
            }
        } else {
            return "MotManquant";
        }
    }

    goodAnswer(){
        if(this.answerString.length >1){
            this.answerString.map(answer => {
                let results = this.retroactionAnswer(answer);
                console.log(results);
                if(results != undefined){
                    if(results.length == undefined){
                        this.retroaction = results.retroaction;
                    } else {
                        this.retroaction = results;
                }
            }
            });
        } else {
            let results = this.retroactionAnswer(this.answerString[0]);
            if(results != undefined){
                if(results.length == undefined){
                    this.retroaction = results.retroaction;
                } else {
                    this.retroaction = results;
                }
            }
        }
        switch (this.typeofQuestion()) {
            case "VraiFaux":
                this.goodAnswers = this.answerString[0].slice(1,2);
                break;
            case "ReponseCourte":
                let goodAnswerArray = this.answerString[0].slice(1, -1).split("=").slice(1);
                if(goodAnswerArray.length == 1){
                    this.goodAnswers = goodAnswerArray[0].trim();
                } else {
                    this.goodAnswers = [];
                    goodAnswerArray.map(answer => {
                        answer = answer.trim();
                        this.goodAnswers.push(answer);
                    });
                }
                break;
                case "Appariement":
                    let answers = this.answerString[0].slice(1,-1);
                    answers = answers.split("=").slice(1);
                    this.goodAnswers = [];
                    answers.map(answer => {
                        this.goodAnswers.push({question : answer.split("->")[0].trim(), answer : answer.split("->")[1].trim()});
                    });
                    break;
                case "ChoixMultiple":
                    break;
            default:
                break;
        }
    }

    retroactionAnswer(answer){
        let line = answer;
        if(this.typeofQuestion() == "ReponseNumerique" || this.typeofQuestion() == "ReponseNumeriqueMultiple"){
            line = line.trim().slice(2,-1);
        } else {
            line = line.trim().slice(1,-1);
        }
        if(this.typeofQuestion() == "VraiFaux"){
            let retroaction = line.split("#");
            
            return {answer : retroaction[0], retroaction : retroaction[1]};
        }
        if(line.includes("#")){
            let retroaction = line.split("#");        
            if(retroaction.length >2){
                let returnArray = [];
                for(let i=1; i<retroaction.length; i++){
                    let retroactionLine = retroaction[i].split(/=|~/g);
                    returnArray.push({answer : retroaction[i-1].split(/=|~/g)[1], retroaction : retroactionLine[0]});
                }
                return returnArray;
            } else {
                let answer = line.slice(line.indexOf("#")+1)[0];
                return {answer : answer, retroaction : retroaction};
            }
        }
    }
    feedback(){
        for(let i=0; i<this.answerString.length; i++){
            if(this.answerString[i].includes("SYMBOL6") == true){
                this.feedback = this.answerString[i].split("SYMBOL6")[1].replace("}","").trim();
            }
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