//npm install readline-sync
//npm install chevrotain


//---------------------------------------------------------------------------
//Vient proposer à l'utilisateur de se Login ou de se Register
//Si utilisateur est bien login : isIdentified = true, enteredID = 'Nom de l'utilisateur'
//---------------------------------------------------------------------------



var readlineSync = require('readline-sync');
const fs = require('node:fs');


function connexionWindow() {
        console.log(' -------------------------------------------------------------------------------------------------');
        console.log('|Welcome to the account connexion Window.                                                         |');
        console.log('|What do you want to do ?                                                                         |');
        console.log('|                  [1] Log-in                                 [2] Register                        |');
        console.log(' -------------------------------------------------------------------------------------------------');
}



connexionWindow();
choisir: while (true) {     //Tant que le choix n'est pas bon, on redemande de choisir
    var choix = readlineSync.question("Choix : ");
    if (choix == 1){

        //Log-in

            let isIdentified = false;

            //On lit d'abord le fichier avec les mots de passe / usernames
            fs.readFile('userLogins.txt', 'utf-8', function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    const allUserLoginInfos = data;
                
                //On transforme le string obtenu en tableau 
                const tab_allUserLoginInfos = allUserLoginInfos.split("\n");
                console.log(tab_allUserLoginInfos);
        
                
                while (isIdentified == false){
                    //On demande maintenant à l'utilisateur son login et mot de passe
                    var enteredID = readlineSync.question("Entrez votre nom d'utilisateur : ");
                    var enteredPASSWORD = readlineSync.question("Entrez votre mot de passe : ");

                    for (let i = 0; i< tab_allUserLoginInfos.length; i++){
                        if (tab_allUserLoginInfos[i] == 'Username:' + enteredID + '-Password:' + enteredPASSWORD){
                            isIdentified = true;
                            break;
                        }
                        
                    }
                    if (isIdentified == true){
                        console.log('Bonjour ' + enteredID + '. Vous êtes bien connecté.');
                    } else {
                        console.log('Utilisateur ou mot de passe erroné. Veuillez recommencer.');
                    }
                }
            });

        
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
                console.log("Erreur : vos deux mots de passe sont différents. Veuillez recommencer.");
            }
        }

        

        //On crée le string qui va être injecté dans le fichier
        var userLoginInfos = '\nUsername:' + userName + '-Password:' + password;    
        
        //On injecte dans le fichier
        fs.appendFile('userLogins.txt', userLoginInfos, err => {
            if (err) {
              console.log("Erreur");
            } else {
                
                
            }
        });

        console.log("Compte enregistré !");
        connexionWindow();

        


    } else {
        console.log("Choix invalide, veuillez recommencer.");
    }

}