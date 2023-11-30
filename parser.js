// Définition de la classe parser à utiliser
class Parser {
    parsedQuestions = [];
    comments = [];
    errorCount = 0;

    tokenize(data) {
        let tData = data.replaceAll(/\r/g, "\n").replaceAll(/\r\n/g, "\n");
        tData = data.split("\n");
        tData = tData.filter(line => line != "");
        tData.map((line, index, elements) => {
            elements[index] = elements[index].replace(/\s\s+/g, " ");
            if (line.search(/{#$|{$/g)!= -1) {
                if(elements[index].endsWith("{# ")){
                    elements[index] = elements[index].replace("{# ", "");
                    elements[index + 1] = "{# " + elements[index + 1];
                } else {
                elements[index] = elements[index].replace(" {", "");
                elements[index + 1] = "{" + elements[index + 1];
                }
            }
        });
        // Mettre en commun les questions d'appariement et les questions à réponses multiples
        let temp = [];
        for (let i = 0; i < tData.length; i++) {
            if(tData[i].startsWith("{")){
                let response = "";
                let sybNotFound = true;
                while(sybNotFound && i < tData.length-1){
                    if(tData[i].endsWith("}")){
                        response = response.concat(' ', tData[i]);
                        sybNotFound = false;
                        temp.push(response);
                    } else {
                        if (response === "") {
                            response = response.concat(tData[i]);
                        } else {
                        response = response.concat(' ', tData[i]);
                        }
                        i++;
                    }
                }
                if (i === tData.length-1) {
                    response = response.concat(' ', tData[i]);
                    temp.push(response);
                }
            } else {
                temp.push(tData[i]);
            }
        }
        tData = temp;
        // Mettre en commun le texte des questions de type "Texte troué"
        temp = [];
        for (let i = 0; i < tData.length; i++) {
            if (!(tData[i].includes("//") || tData[i].includes("::"))) {
                let response = "";
                let sybNotFound = true;
                while(sybNotFound && i < tData.length-1){
                    if(tData[i].startsWith("//") || tData[i].startsWith("::")){
                        sybNotFound = false;
                        temp.push(response);
                        temp.push(tData[i]);
                    } else {
                        if (response === "") {
                            response = response.concat(tData[i]);
                        } else {
                        response = response.concat(' ', tData[i]);
                        }
                        i++;
                    }
                }
                if (i === tData.length-1) {
                    response = response.concat(' ', tData[i]);
                    temp.push(response);
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
            }
            else{
                let question = {
                    title: this.title(tData[i]),
                    format: this.format(tData[i]),
                };
                this.comments = [];
                let regexPattern = /{.*?}/g;
                if(this.answer(tData[i]) === undefined){
                    question.text = this.text(tData[i]);
                    this.errMsg("No answer for a question.", tData[i]);
                } else {
                    if(regexPattern.exec(tData[i]) !== null){
                        question.answers = this.answer(tData[i]);
                        question.text = this.text(tData[i]);
                    } else {
                        question.answers = this.answer(tData[i+1]);
                        question.text = this.text(tData[i]) + this.text(tData[i+1]);
                        i++
                    }
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
                // Tout le texte est le titre de la question
                let answers = this.answer(line);
                let text = line;
                answers.map(answer => {
                    text = text.replace(answer, "");
                });
                return text;
            }
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
        text = line.replace("::"+this.title(line)+"::", "");
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
fs.readFile('U5-p49-Subject_verb_agreement.gift', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let parser = new Parser();
    if (parser.errorCount === 0) {
    } else {
        console.log("The .gift file contains error");
    }
    parser.parse(data);
    console.log(parser.parsedQuestions);
    console.log(parser.tokenize(data));
});