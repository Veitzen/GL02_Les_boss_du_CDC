// Définition de la classe parser à utiliser
class Parser {
    parsedQuestions = [];
    comments = [];
    errorCount = 0;

    tokenize(data) {
        let tData = data.replace("\t", "");
        tData = tData.split("\n");
        tData = tData.map(line => line.trim());
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
                let question = {
                    title: this.title(tData[i]),
                    format: this.format(tData[i]),
                    text: '',
                    answers: []
                };
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

let fs = require('fs');
fs.readFile('GIFT-examples.gift', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let parser = new Parser();
    if (parser.errorCount === 0) {
    } else {
        console.log("The .gift file contains error");
    }
    console.log(parser.tokenize(data));
    parser.parse(data);
    console.log(parser.parsedQuestions);
});