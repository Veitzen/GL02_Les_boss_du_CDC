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
        if ((this.text.match(/<Answer>/g) || []).length == 0) {
            return "Description";
        }
        if ((this.text.match(/<Answer>/g) || []).length == 1) {
            if ((/{(T|F|TRUE|FALSE)/g.exec(this.answerString[0]) != null)) {
                return "VraiFaux";
            } else if ((/->/g).exec(this.answerString[0]) != null) {
                return "Appariement";
            } else if (this.answerString[0].startsWith("{#")) {
                if (this.answerString[0].includes("=")) {
                    return "ReponseNumeriqueMultiple";
                } else {
                    return "ReponseNumerique";
                }
            } else if (this.answerString[0] == "{}") {
                return "Composition";
            } else if (this.answerString[0].includes("~")) {
                return "ChoixMultiple";
            }
            else {
                return "ReponseCourte";
            }
        } else {
            return "MotManquant";
        }
    }

    goodAnswer() {
        if (this.typeofQuestion() == "Description") {
            return;
        }
        switch (this.typeofQuestion()) {
            case "VraiFaux":
                let answer = this.answerString[0].slice(1, 2);
                if (this.answerString[0].includes("#")) {
                    if (this.answerString[0].match(/\#[^(\#|\~|\}|\=)]{1,}/gm).length == 2) {
                        let retroactionGoodAnswer = this.answerString[0].match(/\#[^(\#|\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        let retroactionBadAnswer;
                        switch (answer) {
                            case "T":
                                retroactionBadAnswer = this.answerString[0].match(/\#[^(\#|\~|\}|\=)]{1,}/gm)[1].replace("#", "").trim();
                                break;
                            case "F":
                                retroactionBadAnswer = this.answerString[0].match(/\#[^(\#|\~|\}|\=)]{1,}/gm)[1].replace("#", "").trim();
                                break;
                            default:
                                break;
                        }
                        this.goodAnswers = { answer: answer, retroaction: retroactionGoodAnswer, retroactionBadAnswer: retroactionBadAnswer };
                    } else {
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        this.goodAnswers = { answer: answer, retroaction: retroaction };
                    }
                } else {
                    this.goodAnswers = { answer: answer };
                }
                break;
            case "ReponseCourte":
                let goodAnswerArray = this.answerString[0].slice(1, -1).split("=").slice(1);
                // Cas où il y a une seule bonne réponse
                if (goodAnswerArray.length == 1) {
                    // Cas où il y a une rétroaction
                    if (goodAnswerArray[0].slice(2).includes("#")) {
                        let answer = goodAnswerArray[0].split("#")[0].trim();
                        let retroaction = goodAnswerArray[0].split("#")[1].trim();
                        this.goodAnswers = { answer: answer, retroaction: retroaction };
                    } else {
                        this.goodAnswers = { answer: goodAnswerArray[0].trim() };
                    }
                }
                // Cas où il y a plusieurs bonnes réponses
                else {
                    this.goodAnswers = [];
                    goodAnswerArray.map(answer => {
                        if (answer.includes("#")) {
                            let answer = goodAnswerArray[0].split("#")[0].trim();
                            let retroaction = goodAnswerArray[0].split("#")[1].trim();
                            this.goodAnswers.push({ answer: answer, retroaction: retroaction });
                        } else {
                            answer = answer.trim();
                            this.goodAnswers.push({ answer: answer });
                        }
                    });
                }
                break;
            case "Appariement":
                let answers = this.answerString[0].slice(1, -1).split("=").slice(1);
                this.goodAnswers = [];
                answers.map(answer => {
                    if (answer.includes("#")) {
                        let seperateArray = answer.split("->");
                        let question = seperateArray[0].trim().replace("=", "");
                        let retroaction = seperateArray[1].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        let expectedMatch = seperateArray[1].replace(/\#[^(\~|\}|\=)]{1,}/gm, "").trim();
                        this.goodAnswers.push({ question: question, expectedMatch: expectedMatch, retroaction: retroaction });
                    } else {
                        this.goodAnswers.push({ question: answer.split("->")[0].trim(), answer: answer.split("->")[1].trim() });
                    }
                });
                break;
            case "ChoixMultiple":
                // Cas où il y a plusieurs bonnes réponses ou pourcentage de points
                if (this.answerString[0].includes("~%")) {
                    let answers = this.answerString[0].match(/\%(-|)\d*\%[^(\~||\=|\})]{1,}/gm);
                    this.goodAnswers = [];
                    answers.map(answer => {
                        let weight = parseFloat(answer.match(/\%(-|)\d*\%/gm)[0].replace("%", "").trim()) / 100;
                        let answerString = answer.replace(/\%(-|)\d*\%/gm, "").trim();
                        // Vérifier si il y a une rétroaction
                        if (answerString.includes("#")) {
                            answerString = answerString.split("#")[0].trim();
                            let retroaction = answer.replace(/\%(-|)\d*\%/gm, "").match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                            let answerObject = { answer: answerString, weight: weight, retroaction: retroaction };
                            this.goodAnswers.push(answerObject);
                        } else {
                            let answerObject = { answer: answerString, weight: weight };
                            this.goodAnswers.push(answerObject);
                        }
                    });
                    // Ajout =[Answer] qui vaut 100% des points
                    if (this.answerString[0].includes("=")) {
                        let answer = this.answerString[0].match(/\=[^(|\~|\}|=)]{1,}/gm);
                        answer.map(answer => {
                            if (answer.includes("#")) {
                                let answerString = answer.replace(/\=[^(\#|\~|\})]{1,}/gm, "").trim();
                                let retroaction = answer.match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                                let answerObject = { answer: answerString, weight: 1, retroaction: retroaction };
                                this.goodAnswers.push(answerObject);
                            } else {
                                let answerString = answer.replace("=", "").trim();
                                let answerObject = { answer: answerString, weight: 1 };
                                this.goodAnswers.push(answerObject);
                            }
                        });
                    }
                    // Ajout des réponses ~[Answer] qui vaut 0% des points
                    if (/\~[^(|\~|\}|%|=)]{1,}/gm.exec(this.answerString[0]) != null) {
                        let answerFalse = this.answerString[0].match(/\~[^(|\~|\}|%|=)]{1,}/gm);
                        answerFalse.map(answer => {
                            if (answer.includes("#")) {
                                let answerString = answer.replace(/\~[^(\#|\~|\})]{1,}/gm, "").trim();
                                let retroaction = answer.match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                                let answerObject = { answer: answerString, weight: 0, retroaction: retroaction };
                                this.goodAnswers.push(answerObject);
                            } else {
                                let answerString = answer.replace("~", "").trim();
                                let answerObject = { answer: answerString, weight: 0 };
                                this.goodAnswers.push(answerObject);
                            }
                        });
                    }
                } else {
                    // Cas où il y a une seule bonne réponse
                    if (this.answerString[0].includes("#")) {
                        let answer = this.answerString[0].match(/\=[^(\~|\})]{1,}/gm)[0].replace("=", "").trim();
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        let answerObject = { answer: answer, retroaction: retroaction };
                        this.goodAnswers = answerObject;
                    }
                    let answer = this.answerString[0].match(/\=[^(\#|\~|\})]{1,}/gm)[0].replace("=", "").trim();
                    this.goodAnswers = { answer: answer };
                }
                break;
            case "ReponseNumerique":
                // Cas avec borne définie par ":"
                if (this.answerString[0].includes(':')) {
                    let number = parseFloat(this.answerString[0].match(/((\d*(,|\.)\d*)|\d*):/g)[0].replace(":", ""));
                    let marge = parseFloat(this.answerString[0].match(/:((\d*(,|\.)\d*)|\d*)/g)[0].replace(":", ""));
                    if (this.answerString[0].slice(2).includes("#")) {
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        this.goodAnswers = { answer: [number - marge, number + marge], retroaction: retroaction };
                    } else {
                        this.goodAnswers = { answer: [number - marge, number + marge] };
                    }
                    // Cas avec borne définie par ".."
                } else if (this.answerString[0].includes('..')) {
                    let borne = this.answerString[0].match(/\d*(,|\.)\d*\.\.\d(.|,)\d*/g)[0].split("..");
                    borne.forEach((element, index) => {
                        borne[index] = parseFloat(element.replace(",", "."));
                    });
                    if (this.answerString[0].slice(2).includes("#")) {
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        this.goodAnswers = { answer: borne, retroaction: retroaction };
                    } else {
                        this.goodAnswers = { answer: borne };
                    }
                }
                else {
                    // Cas avec rétroaction
                    if (this.answerString[0].slice(2).includes("#")) {
                        let answer = parseFloat(this.answerString[0].match(/\{#((\d*(,|\.)\d*)|\d*)/g)[0].replace("{#", ""));
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        this.goodAnswers = { answer: answer, retroaction: retroaction };
                    } else {
                        let answer = parseFloat(this.answerString[0].match(/\{#((\d*(,|\.)\d*)|\d*)/g)[0].replace("{#", ""));
                        this.goodAnswers = { answer: answer };
                    }
                }
                break;
            case "ReponseNumeriqueMultiple":
                this.goodAnswers = [];
                // Cas où il y a plusieurs bonnes réponses ou pourcentage de points
                if (this.answerString[0].includes("=%")) {
                    let answers = this.answerString[0].match(/\=\%(-|)\d*\%[^(\~||\=|\})]{1,}/gm);
                    this.goodAnswers = [];
                    answers.map(answer => {
                        let weight = parseFloat(answer.match(/\%(-|)\d*\%/gm)[0].replace("%", "").trim()) / 100;
                        let answerString = answer.replace(/=\%(-|)\d*\%/gm, "").trim();
                        if (answerString.includes(":")) {
                            let number = parseFloat(answerString.match(/((\d*(,|\.)\d*)|\d*):/g)[0].replace(":", ""));
                            let marge = parseFloat(answerString.match(/:((\d*(,|\.)\d*)|\d*)/g)[0].replace(":", ""));
                            answerString = [number - marge, number + marge];
                        } else if (answerString.includes("..")) {
                            let borne = this.answerString[0].match(/((\d*(,|\.)\d*)|\d*)\.\.((\d*(,|\.)\d*)|\d*)/g)[0].split("..");
                            borne.forEach((element, index) => {
                                borne[index] = parseFloat(element.replace(",", "."));
                            });
                            answerString = borne;
                        }
                        // Vérifier si il y a une rétroaction
                        if (answer.slice(2).includes("#")) {
                            let retroaction = answer.replace(/\%(-|)\d*\%/gm, "").match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                            let answerObject = { answer: answerString, weight: weight, retroaction: retroaction };
                            this.goodAnswers.push(answerObject);
                        } else {
                            let answerObject = { answer: answerString, weight: weight };
                            this.goodAnswers.push(answerObject);
                        }
                    });
                    // Ajout =[Answer] qui vaut 100% des points
                    if (this.answerString[0].includes("=")) {
                        let answer = this.answerString[0].match(/\=(\d*(,|\.)\d*|\d*)(:|\.\.| )(\d*(,|\.)\d*|\d*)[^=|}]*/gm);
                        answer.map(answer => {
                            let answerString = answer.match(/\=(\d*(,|\.)\d*|\d*)(:|\.\.)(\d*(,|\.)\d*|\d*)[^=]*/gm)[0];
                            if (answerString.includes(":")) {
                                let number = parseFloat(answerString.match(/((\d*(,|\.)\d*)|\d*):/g)[0].replace(":", ""));
                                let marge = parseFloat(this.answerString[0].match(/:((\d*(,|\.)\d*)|\d*)/g)[0].replace(":", ""));
                                answerString = [number - marge, number + marge];
                            } else if (answerString.includes("..")) {
                                let borne = this.answerString[0].match(/\d*(,|\.)\d*\.\.\d(.|,)\d*/g)[0].split("..");
                                borne.forEach((element, index) => {
                                    borne[index] = parseFloat(element.replace(",", "."));
                                });
                                answerString = borne;
                            }
                            if (answer.slice(2).includes("#")) {
                                let retroaction = answer.match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                                let answerObject = { answer: answerString, weight: 1, retroaction: retroaction };
                                this.goodAnswers.push(answerObject);
                            } else {
                                let answerString = answer.replace("=", "").trim();
                                let answerObject = { answer: answerString, weight: 1 };
                                this.goodAnswers.push(answerObject);
                            }
                        });
                    }
                } else {
                    // Cas où il y a une seule bonne réponse
                    if (this.answerString[0].includes("#")) {
                        let answer = this.answerString[0].match(/\=[^(\~|\})]{1,}/gm)[0].replace("=", "").trim();
                        let retroaction = this.answerString[0].match(/\#[^(\~|\}|\=)]{1,}/gm)[0].replace("#", "").trim();
                        let answerObject = { answer: answer, retroaction: retroaction };
                        this.goodAnswers = answerObject;
                    }
                    let answer = this.answerString[0].match(/\=[^(\#|\~|\})]{1,}/gm)[0].replace("=", "").trim();
                    this.goodAnswers = { answer: answer };
                }
                break;
            default:
                break;
        }
    }

    possibleAnswers() {
        switch (this.typeofQuestion()) {
            case "VraiFaux":
                this.possibleAnswers = ["T", "F"];
                break;
            case "Appariement":
                this.possibleAnswers = [];
                this.goodAnswers.map(answer => {
                    this.possibleAnswers.push(answer.answer);
                });
                break;
            case "ChoixMultiple":
                this.possibleAnswers = [];
                if (this.typeofQuestion() == "ChoixMultiple") {
                    this.goodAnswers.map(answer => {
                        this.possibleAnswers.push(answer.answer);
                    });
                }
                break;
        }
    }

    feedback() {
        for (let i = 0; i < this.answerString.length; i++) {
            if (this.answerString[i].includes("SYMBOL6") == true) {
                this.feedback = this.answerString[i].split("SYMBOL6")[1].replace("}", "").trim();
            }
        }
    }

    specialSymbolsRevert(data) {
        let specialSymbols = ["\\~", "\\=", "\\#", "\\{", "\\}", "####"];
        specialSymbols.map((symbol, index) => {
            data = data.replace("SYMBOL" + (index + 1), symbol);
        });
        return data;
    }

    analyseText() {
        this.feedback();
        this.specialSymbolsRevert(this.text);
        for (let i = 0; i < this.answerString.length; i++) {
            this.specialSymbolsRevert(this.answerString[i]);
        }
        for (let i = 0; i < this.goodAnswer.length; i++) {
            this.specialSymbolsRevert(this.goodAnswer[i]);
        }
        this.typeQuestion = this.typeofQuestion();
        this.goodAnswer();
    }
}



// Définition de la classe QCM à partir de "Sémantique des données"
class QCM {
    questions = [];
    constructor(questions) {
        this.questions = questions;
    }
}

module.exports = { Question, QCM };