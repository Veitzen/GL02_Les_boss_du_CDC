const q = require('./questions');
const d = require('./dossier');

//const chemin = 'GIFT-examples.gift'
const chemin = '../Test/EM-U5-p34-Voc.gift'
const cheminGroupe = '../Groupe'
//const tabQuestions = d.importerQuestions(chemin);
//q.afficherAllQuestions(tabQuestions);

const questionsAllFichiers = d.questionsDossiers(cheminGroupe);
console.log(questionsAllFichiers);
