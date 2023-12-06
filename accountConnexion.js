//npm install readline-sync
//npm install chevrotain
var readlineSync = require('readline-sync');
const fs = require('node:fs');



console.log(' -------------------------------------------------------------------------------------------------');
console.log('|Welcome to the account connexion Window.                                                         |');
console.log('|What do you want to do ?                                                                         |');
console.log('|                  [1] Log-in                                 [2] Register                        |');
console.log(' -------------------------------------------------------------------------------------------------');


choisir: while (true) {     //Tant que le choix n'est pas bon, on redemande de choisir
    var choix = readlineSync.question("Choix : ");
    if (choix == 1){

        //Log-in

        //On lit d'abord le fichier avec les mots de passe / usernames
        fs.readFile('userLogins.txt', 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            const allUserLoginInfos = data;
        
            
            console.log(allUserLoginInfos);   
        });

        

        /*
            //On utilise le lexer
            let SelectLexer = new Lexer(allTokens);
            let lexingResult = SelectLexer.tokenize(allUserLoginInfos);

            console.log("Resultats du Lexer :");
            console.log(lexingResult);
*/





        break;


    } else if (choix == 2){

        //Register

        var userName = readlineSync.question("Entrez votre nom d'utilisateur : ");
        
        var samePassword = false;           //On va s'assurer que l'utilisateur rentre le bon mot de passe en le demandant 2 fois
        while (samePassword == false){      //On vérifie que l'utilisateur rentre bien le même mot de passe 
            var password = readlineSync.question("Entrez votre mot de passe : ");
            var passwordVerif = readlineSync.question("Entrez a nouveau votre mot de passe : ");
            if (password == passwordVerif){
                samePassword = true;
            } else {
                console.log("Erreur : vos deux mots de passe sont différents. Veuillez recommencer.")
            }
        }

        //On crée le string qui va être injecté dans le fichier
        var userLoginInfos = '\nUsername:' + userName + '\nPassword:' + password;    
        
        //On injecte dans le fichier
        fs.appendFile('userLogins.txt', userLoginInfos, err => {
            if (err) {
              console.log("Erreur");
            } else {
                console.log("Compte enregistré !")
            }
          });

        break;


    } else {
        console.log("Choix invalide, veuillez recommencer.");
    }

}