

//---------------------------------------------------------------------------
//Vient afficher à l'utilisateur le profil moyen des examens
//On considère que si ce programme est appelé : on a déjà vérifié que le user est un admin et que le user a demandé à voir les statistiques
//
//parametres entrée : nombre questions choix multiple
// -----------------: nombre questions vrai faux
// -----------------: nombre questions entrer date
// -----------------: nombre questions entrer mot
// -----------------: nombre questions AUTRE
//parametres sortie : void
//---------------------------------------------------------------------------




const averageExamProfile = (ENTRYnbrMultChoice, ENTRYnbrTrueFalse, ENTRYnbrDate, ENTRYnbrWord, ENTRYnbrOther) => {

//On met en int tous les paramètres d'entrée
let nbrMultChoice = Number(ENTRYnbrMultChoice);
let nbrTrueFalse = Number(ENTRYnbrTrueFalse);
let nbrDate = Number(ENTRYnbrDate);
let nbrWord = Number(ENTRYnbrWord);
let nbrOther = Number(ENTRYnbrOther);

//On set le nombre total de questions
let nbrTotalQuest = nbrMultChoice + nbrTrueFalse + nbrDate + nbrWord + nbrOther;
console.log('Nombre total de questions : ' + nbrTotalQuest);


//On définit le pourcentage de chaque type de question

let percentMultChoice = nbrMultChoice / (nbrTotalQuest/100);
let percentTrueFalse = nbrTrueFalse / (nbrTotalQuest/100);
let percentDate = nbrDate / (nbrTotalQuest/100);
let percentWord = nbrWord / (nbrTotalQuest/100);
let percentOther = nbrOther / (nbrTotalQuest/100);

//On set l'affichage de chaque statistique

let index = 0;

let affMultChoice = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
index = 0;
for (let i = 0; i < percentMultChoice & percentMultChoice > i+5; i += 10){
    affMultChoice[index] = '+';
    index += 1;
}

let affTrueFalse = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
index = 0;
for (let i = 0; i < percentTrueFalse & percentTrueFalse > i+5; i += 10){
    affTrueFalse[index] = '+';
    index += 1;
}

let affDate = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
index = 0;
for (let i = 0; i < percentDate & percentDate > i+5; i += 10){
    affDate[index] = '+';
    index += 1;
}

let affWord = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
index = 0;
for (let i = 0; i < percentWord & percentWord > i+5; i += 10){
    affWord[index] = '+';
    index += 1;
}

let affOther = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
index = 0;
for (let i = 0; i < percentOther & percentOther > i+5; i += 10){
    affOther[index] = '+';
    index += 1;
}

console.log('Pourcentage choix multiples = ' + percentMultChoice);
console.log('Affichage prévu choix multiple : ' + affMultChoice);

console.log('-------------------------------------------------------');
console.log('\nStatistiques du pourcentage de questions par type :\n' +
            '100%| ' + affMultChoice[9] + '  ' + affTrueFalse[9] + '  ' + affDate[9] + '  ' + affWord[9] + '  ' + affOther[9] + ' \n' + 
            '    | ' + affMultChoice[8] + '  ' + affTrueFalse[8] + '  ' + affDate[8] + '  ' + affWord[8] + '  ' + affOther[8] + ' \n' + 
            '    | ' + affMultChoice[7] + '  ' + affTrueFalse[7] + '  ' + affDate[7] + '  ' + affWord[7] + '  ' + affOther[7] + ' \n' + 
            '    | ' + affMultChoice[6] + '  ' + affTrueFalse[6] + '  ' + affDate[6] + '  ' + affWord[6] + '  ' + affOther[6] + ' \n' + 
            '    | ' + affMultChoice[5] + '  ' + affTrueFalse[5] + '  ' + affDate[5] + '  ' + affWord[5] + '  ' + affOther[5] + ' \n' + 
            ' 50%| ' + affMultChoice[4] + '  ' + affTrueFalse[4] + '  ' + affDate[4] + '  ' + affWord[4] + '  ' + affOther[4] + ' \n' + 
            '    | ' + affMultChoice[3] + '  ' + affTrueFalse[3] + '  ' + affDate[3] + '  ' + affWord[3] + '  ' + affOther[3] + ' \n' + 
            '    | ' + affMultChoice[2] + '  ' + affTrueFalse[2] + '  ' + affDate[2] + '  ' + affWord[2] + '  ' + affOther[2] + ' \n' + 
            '    | ' + affMultChoice[1] + '  ' + affTrueFalse[1] + '  ' + affDate[1] + '  ' + affWord[1] + '  ' + affOther[1] + ' \n' + 
            '    | ' + affMultChoice[0] + '  ' + affTrueFalse[0] + '  ' + affDate[0] + '  ' + affWord[0] + '  ' + affOther[0] + ' \n' + 
            '-----[1][2][3][4][5]---\n' +
            '[1] Choix multiple : ' + percentMultChoice.toFixed(2) + '%\n' +
            '[2] Vrai / Faux : ' + percentTrueFalse.toFixed(2) + '%\n' +
            '[3] Entrer date : ' + percentDate.toFixed(2) + '%\n' +
            '[4] Entrer mot : ' + percentWord.toFixed(2) + '%\n' +
            '[5] Autre : ' + percentOther.toFixed(2) + '%');
console.log('-------------------------------------------------------');

        
        
};
module.exports = averageExamProfile;