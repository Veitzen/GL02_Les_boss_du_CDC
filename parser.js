const { Question } = require('./qcm.js');
const colors = require('colors');
var _ = require('underscore');
// Définition de la classe parser à utiliser
class Parser {
    parsedQuestions = [];
    comments = [];
    errorCount = 0;

    tokenize(data) {
        let tData = data.replace("\t", "");
        tData = tData.split("\n");
        tData = tData.map(line => {
            line = line.trim();
            if((/\s+/g).exec(line) !== null){
                line = line.replace(/\s+/g, " ");
            }
            return line;
        }
        );
        // On réécrit les lignes pour mieux les parser
        let temp = [];
        for(let i=0; i<tData.length; i++){
            if((/({$| {#$)/gm).exec(tData[i]) !== null){
                let responseLine = tData[i];
                let sybNotFound = true;
                i++;
                while(sybNotFound && i<tData.length){
                    if(tData[i].includes("}")){
                        sybNotFound = false;
                        responseLine += " " + tData[i];
                        temp.push(responseLine)
                        temp.push('');
                        i++;
                    } else {
                        responseLine += " " + tData[i];
                        i++;
                    }
                }
            } else {
                temp.push(tData[i]);
            }
        }
        tData = temp;
        return tData;
    }

    parse(data) {
        let tData = this.tokenize(data);
        for(let i=0; i<tData.length; i++){
            if(tData[i].startsWith("//")){
                this.comment(tData[i]);
            } else if (tData[i] === ''){
            } else{
                let question = new Question(this.title(tData[i]), this.format(tData[i]), "", []);
                while(tData[i] != '' && i<tData.length){
                        if(this.answer(tData[i]) != undefined){
                            question.answers = question.answers.concat(this.answer(tData[i]));
                        }
                        if(question.text == ''){
                            question.text = this.text(tData[i]);
                        } else {
                            question.text += "\n" + this.text(tData[i]);
                        }
                        i++;
                }
                question.typeQuestion = question.typeofQuestion();
                this.parsedQuestions.push(question);
            }
        }
    }

    // Comment : "//" *(VCHAR / WSP) \n ; donc à chaque ligne = 1er commentaire s'il commence par //
    comment(line){
        this.comments.push(line.replace("// ", ""));
    }

    // Title : "::" *(VCHAR / WSP) "::" \n ; pareil ici, on prend une ligne et on vérifie si elle commence par ::
    title(line){
        if(line.startsWith("::")){
            let toCheckData = line.slice(2);
            if(toCheckData.includes("::")){
                // On récupère le titre
                return toCheckData.split("::")[0];
            } else{
                this.errMsg("Question must be between with ::", line);
                }
            } 
            else{
                // Tout le texte est le titre de la question
                let answers = this.answer(line);
                let text = line;
                if(answers == undefined){
                    return text;
                } else 
                answers.map(answer => {
                    text = text.replace(answer, "<Answer>");
                });
                return text;
            }
    }

    // Format : [(html / markdown / plain / moodle)] ; par défaut c'est moodle
    format(line){
        if(line.includes("[")){
            let toCheckData = line.split("[")[1];
            if(toCheckData.includes("]")){
                // On récupère le format
                console.log(toCheckData.split("]")[0]);
                return toCheckData.split("]")[0];
            } else{
                this.errMsg("Question must be between with []", line);
            }
        }
        else {
            return "moodle";
        }
    }

    // Text : *(VCHAR / WSP) \n ; ce qui est en dehors des crochets
    text(line){
        let text = line;
        if(line.includes("::")){
            text = line.replace("::"+this.title(line)+"::", "");
        }
        let answers = this.answer(line);
        if(answers == undefined){
            return text;
        } else {
            answers.map(answer => {
                text = text.replace(answer, "<Answer>");
            });
            return text;
        }
    }

    // Answer : {*(VCHAR / WSP)} \n ; ce qui est entre les crochets
    answer(line){
        let regexPattern = /{.*?}/g;
        let answer;
        let answerArray = [];
        while ((answer = regexPattern.exec(line)) !== null) {
            answerArray.push(answer[0]);
        }
        if (answerArray.length !== 0) {
            return answerArray;
        }
    }

    // Error message
    errMsg(msg, input){
        this.errorCount++;
        console.log("Parsing Error ! on "+input+" -- msg : "+msg);
    }
}

module.exports = {Parser};

let fs = require('fs');
const readlineSync = require('readline-sync'); 
const m = require('./Menu principal.js');
let parser = new Parser();
let parsedQuestions = m.importerquestions;
fs.readFile('U5-p49-Subject_verb_agreement.gift', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }    

    while (true) {
        let choix = readlineSync.keyInSelect(['Afficher tous les questions', 'Selectionner les questions du test','Afficher tous les questions selectionnes','Qualiter du test','Simuler Test','Quitter'], 'Que souhaitez-vous faire ?');
        
        //parser.parse(data);
        
        if (choix === 0) {
                
                if (parser.errorCount === 0) {
                } else {
                    console.log("The .gift file contains error".red);
                }
                //console.log(parser.tokenize(data));
                
                console.log(parsedQuestions((questions,index) =>{console.log(`Question ${index}: ${questions.text}   (${questions.typeQuestion})\n`.green);}));
               
          
        } else if (choix === 1) {
    
                    while (true) {
                        let choix1 = readlineSync.keyInSelect(['selection', 'deselection', 'Terminer la selection'], 'Quel operation souhaitez vous utiliser ?');
                    
                        if (choix1 === 0) {
                                    let userInput = readlineSync.question('entrer un entier ');
                                    let number=parseInt(userInput);
                                    
                                    //parser.parse(data);// en gros il faut rappeller le parser sinon parse.parsedQuestions=0
                                    //verifier que le nombre entrer appartient à la liste de classe
                                    if (!isNaN(userInput) && userInput >= 0 && userInput < parser.parsedQuestions.length) {
                                        m.questionSelection(number,"selection");
                                        
                                    } else {
                                        console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                                    }
    
                        } else if (choix1 === 1) {
                                    let userInput = readlineSync.question('entrer un entier ');
                                    let number=parseInt(userInput);
                                    
                                    //parser.parse(data);// en gros il faut rappeller le parser sinon parse.parsedQuestions=0
                                    //verifier que le nombre entrer appartient à la liste de classe
                                    if ( !isNaN(userInput) && userInput >= 0 && userInput < parser.parsedQuestions.length) {
                                        m.questionSelection(number,"deselection");
                                        
                                    } else {
                                        console.log('L\'index entré n\'appartient pas à la liste d\'instances de la classe question.'.red);
                                    }
                                    
                                    
                                
                        } else if (choix1 === 2) {
                               break; // Quitter le programme
                        }
                    }
          
        } else if (choix === 2) {
              m.afficherSelection();
        
        }else if (choix === 3) {
                        const a=m.hasDuplicates();
                    if(!a){
                        console.log("Le test sans problème".green);
                    }else{
                        console.log("Le test contient des doublons de meme question".red);
                    }
              
      }else if (choix === 4) {
        m.simulateTest();
             
      
      }else if (choix === 5) {
            break; // Quitter le programme
          }
    }	
});