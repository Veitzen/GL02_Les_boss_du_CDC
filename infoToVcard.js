//npm install readline-sync


//------------------------------------------------------------------------------------------------
//Vient demander des informations à l'utilisateur et crée un fichier Vcard à partir de ces infos
//
// paramètres d'entrée : userID = nom de l'utilisateur
// paramètres d'entrée : void
//------------------------------------------------------------------------------------------------



var readlineSync = require('readline-sync');
const fs = require("fs");


const infoToVcard = (userID) => {


var vcardDictionnary = {
    VERSION: "4.0", //Required
    HOMEADRESS: "",
    HOMEADRESSstreet: "",
    HOMEADRESStown: "",
    HOMEADRESStownID: "",
    HOMEADRESSdepartment: "",
    HOMEADRESScountry: "",
    WORKADRESS: "",
    WORKADRESSstreet: "",
    WORKADRESStown: "",
    WORKADRESStownID: "",
    WORKADRESSdepartment: "",
    WORKADRESScountry: "",
    ANNIVERSARY: "",
    BIRTHDAY: "",
    CALENDARURI: "",
    CALADURI: "",
    CATEGORIES: "",
    CLIENTPIDMAP: "",
    EMAIL: "",
    FBURL: "",
    FORMATTEDNAME: "",  //Required 
    GENDER: "",
    GEO: "",
    IMPP: "",
    KIND: "",
    MEMBER: "",
    NAME: "",
    SURNAME: "",
    NICKNAME: "",
    NOTE: "",
    ORANIZATION: "",
    PRODID: "",
    RELATED: "",
    REVISION: "",
    REVISIONyear: "",
    REVISIONday: "",
    REVISIONmonth: "",
    REVISIONhour: "",
    REVISIONminute: "",
    REVISIONseconde: "",
    REVISIONdayoftheweek: "",
    ROLE: "",
    SORTSTRING: "",
    SOURCE: "",
    PHONE: "",
    WORKPHONE: "",
    TITLE: "",
    TIMEZONE: "",
    UID: "",
    URL: "",
    XML: "",
    SOUND: "",
    PHOTO: "",
    LOGO: "",
    LANG: "",
    KEY: "",
    BEGIN: "BEGIN:VCARD", //Required
    END: "END:VCARD"  //Required

    
  };





  //On demande à l'utilisateur d'entrer toutes les donnees de la Vcard


        choisir: while (true) {     //Tant que le choix n'est pas bon, on redemande de choisir
        var choix = readlineSync.question("Que voulez-vous ?\n[1] pour rentrer rapidement vos informations principales.\n[2] pour rentrer en detail toutes vos informations.\nChoix : ");
        if (choix == 1){

            //Entree rapide 
            vcardDictionnary.SURNAME = readlineSync.question('Entrez votre prenom : ');
            vcardDictionnary.NAME = readlineSync.question('Entrez votre nom : ');
            vcardDictionnary.PHONE = readlineSync.question('Entrez votre numero de telephone personnel : ');
            vcardDictionnary.EMAIL = readlineSync.question('Entrez votre email : ');

            
            //On va chercher les infos sur la Date au moment des entrées des données
            const date = new Date();
            vcardDictionnary.REVISIONyear = date.getFullYear();
            vcardDictionnary.REVISIONday = date.getDate();
            vcardDictionnary.REVISIONmonth = date.getMonth()+1; //Because it begins at value 0, so we need to add 1
            vcardDictionnary.REVISIONhour = date.getHours();
            vcardDictionnary.REVISIONminute = date.getMinutes();
            vcardDictionnary.REVISIONseconde = date.getSeconds();

            let dateDay = date.getDay();  //On va chercher le jour actuel : 1 for Monday ... 3 for Wednesday
            let days = ['M','T','W','T','F','S','S'];
            dateDay = days[dateDay-1];  //On traduit cette valeur en une lettre pour symboliser le jour, ex : Monday = M, Wednesday = W
            vcardDictionnary.REVISIONdayoftheweek = dateDay;

            break;


        } else if (choix == 2){

            //Entree complète de toutes les informations

            console.log('Nous commençons par vos informations personnelles :');
            vcardDictionnary.SURNAME = readlineSync.question('Entrez votre prenom : ');
            vcardDictionnary.NAME = readlineSync.question('Entrez votre nom : ');
            vcardDictionnary.ROLE = readlineSync.question('Entrez votre role (ex: Dr. ) : ')
            vcardDictionnary.NICKNAME = readlineSync.question('Entrez votre surnom : ');
            vcardDictionnary.PHOTO = readlineSync.question('Entrez l\'url de votre photo de profil : ')
            vcardDictionnary.PHONE = readlineSync.question('Entrez votre numero de telephone personnel : ');
            vcardDictionnary.EMAIL = readlineSync.question('Entrez votre email : ');

            console.log('\nNous allons maintenant à votre adresse personnelle (ex : 42 Plantation St. Baytown, LA 30314 United States of America) :\n');
            vcardDictionnary.HOMEADRESSstreet = readlineSync.question('Entrez votre numero de rue et votre rue : ');
            vcardDictionnary.HOMEADRESStown = readlineSync.question('Entrez votre ville : ');
            vcardDictionnary.HOMEADRESStownID = readlineSync.question('Entrez votre identifiant de ville : ');
            vcardDictionnary.HOMEADRESSdepartment = readlineSync.question('Entrez votre departement : ');
            vcardDictionnary.HOMEADRESScountry = readlineSync.question('Entrez votre pays : ');

            console.log('\nNous allons maintenant passer à vos informations professionelles :\n');
            vcardDictionnary.ORANIZATION = readlineSync.question('Entrez le nom de votre entreprise : ');
            vcardDictionnary.WORKPHONE = readlineSync.question('Entrez votre numero de telephone professionel : ');

            console.log('\nNous allons maintenant à votre adresse professionelle (ex : 42 Plantation St. Baytown, LA 30314 United States of America) : \n');
            vcardDictionnary.WORKADRESSstreet = readlineSync.question('Entrez le numero de rue et la rue : ');
            vcardDictionnary.WORKADRESStown = readlineSync.question('Entrez la ville : ');
            vcardDictionnary.WORKADRESStownID = readlineSync.question('Entrez l\' identifiant de ville : ');
            vcardDictionnary.WORKADRESSdepartment = readlineSync.question('Entrez le departement : ');
            vcardDictionnary.WORKADRESScountry = readlineSync.question('Entrez le pays : ');


            //On va chercher les infos sur la Date au moment des entrées des données
            const date = new Date();
            vcardDictionnary.REVISIONyear = date.getFullYear();
            vcardDictionnary.REVISIONday = date.getDate();
            vcardDictionnary.REVISIONmonth = date.getMonth();
            vcardDictionnary.REVISIONhour = date.getHours();
            vcardDictionnary.REVISIONminute = date.getMinutes();
            vcardDictionnary.REVISIONseconde = date.getSeconds();

            let dateDay = date.getDay();  //On va chercher le jour actuel : 1 for Monday ... 3 for Wednesday
            let days = ['M','T','W','T','F','S','S'];
            dateDay = days[dateDay-1];  //On traduit cette valeur en une lettre pour symboliser le jour, ex : Monday = M, Wednesday = W
            vcardDictionnary.REVISIONdayoftheweek = dateDay;

            
            break;


        } else {
            console.log("Choix invalide, veuillez recommencer.");
        }

    }




  //[TEST] On check nos infos entrees
  console.log(vcardDictionnary);

  //On combine les adresses en un seul string pour la mise en forme
        //Adresse personnelle
  vcardDictionnary.HOMEADRESS = vcardDictionnary.HOMEADRESSstreet + '\\n' + vcardDictionnary.HOMEADRESStown + '\\n, ' 
  + vcardDictionnary.HOMEADRESStownID + ' ' + vcardDictionnary.HOMEADRESSdepartment + '\\n' + vcardDictionnary.HOMEADRESScountry;
        //Adresse professionnelle
  vcardDictionnary.WORKADRESS = vcardDictionnary.WORKADRESSstreet + '\\n' + vcardDictionnary.WORKADRESStown + '\\n, ' 
  + vcardDictionnary.WORKADRESStownID + ' ' + vcardDictionnary.WORKADRESSdepartment + '\\n' + vcardDictionnary.WORKADRESScountry;


  //On combine le NOM + PRENOM + TITRE pour mettre en forme le nom
  vcardDictionnary.FORMATTEDNAME = vcardDictionnary.ROLE + ' ' + vcardDictionnary.SURNAME + ' ' + vcardDictionnary.NAME;

  //On met notre date en String pour la combinaison dans le VCard
    vcardDictionnary.REVISIONyear = vcardDictionnary.REVISIONyear.toString();

    vcardDictionnary.REVISIONmonth = vcardDictionnary.REVISIONmonth.toString();   //Si notre mois est de la forme 2 -> on le transforme en 02
        if (vcardDictionnary.REVISIONmonth.length == 1){
            vcardDictionnary.REVISIONmonth = '0' + vcardDictionnary.REVISIONmonth;
        }

    vcardDictionnary.REVISIONday = vcardDictionnary.REVISIONday.toString();   //idem
        if (vcardDictionnary.REVISIONday.length == 1){
            vcardDictionnary.REVISIONday = '0' + vcardDictionnary.REVISIONday;
        }

    vcardDictionnary.REVISIONhour = vcardDictionnary.REVISIONhour.toString();   //idem
        if (vcardDictionnary.REVISIONhour.length == 1){
            vcardDictionnary.REVISIONhour = '0' + vcardDictionnary.REVISIONhour;
        }
    
    vcardDictionnary.REVISIONminute = vcardDictionnary.REVISIONminute.toString();   //idem
        if (vcardDictionnary.REVISIONminute.length == 1){
            vcardDictionnary.REVISIONminute = '0' + vcardDictionnary.REVISIONminute;
        }

    vcardDictionnary.REVISIONseconde = vcardDictionnary.REVISIONseconde.toString();   //idem
        if (vcardDictionnary.REVISIONseconde.length == 1){
            vcardDictionnary.REVISIONseconde = '0' + vcardDictionnary.REVISIONseconde;
        }


  
  //On combine notre date de la révision pour la mettre en forme
  vcardDictionnary.REVISION = vcardDictionnary.REVISIONyear + vcardDictionnary.REVISIONmonth + vcardDictionnary.REVISIONday + vcardDictionnary.REVISIONdayoftheweek 
  + vcardDictionnary.REVISIONhour + vcardDictionnary.REVISIONminute + vcardDictionnary.REVISIONseconde + 'Z';

  //On creee le string final qu'on enverra plus tard dans un fichier .vcard
  var vcardString = vcardDictionnary.BEGIN +'\n'+
 'VERSION:' + vcardDictionnary.VERSION +'\n' +
  'N:' + vcardDictionnary.NAME +';' + vcardDictionnary.SURNAME + ';;' + vcardDictionnary.ROLE + ';' +'\n' +
  'FN:'+ vcardDictionnary.FORMATTEDNAME +'\n' +
  'ORG:'+ vcardDictionnary.ORANIZATION +'\n' +
  'TITLE:' + vcardDictionnary.NICKNAME +'\n' +
  'PHOTO;MEDIATYPE=image/gif:' + vcardDictionnary.PHOTO +'\n' +
  'TEL;TYPE=work,voice;VALUE=' +    'uri'    + ':tel:' + vcardDictionnary.WORKPHONE +'\n' +
  'TEL;TYPE=home,voice;VALUE=' +    'uri'   + ':tel:' + vcardDictionnary.PHONE +'\n' +
  'ADR;TYPE=WORK;PREF=1;LABEL="' + vcardDictionnary.WORKADRESS + '":;;' + vcardDictionnary.WORKADRESSstreet + ';' + vcardDictionnary.WORKADRESStown + ';' + vcardDictionnary.WORKADRESStownID + ';' + vcardDictionnary.WORKADRESSdepartment + ';' + vcardDictionnary.WORKADRESScountry +'\n' +
  'ADR;TYPE=HOME;LABEL="' + vcardDictionnary.HOMEADRESS + '":;;' + vcardDictionnary.HOMEADRESSstreet + ';' + vcardDictionnary.HOMEADRESStown + ';' + vcardDictionnary.HOMEADRESStownID + ';' + vcardDictionnary.HOMEADRESSdepartment + ';' + vcardDictionnary.HOMEADRESScountry +'\n' +
  'EMAIL:' + vcardDictionnary.EMAIL +'\n' +
  'REV:' + vcardDictionnary.REVISION +'\n' +
  'x-qq:' +     '21588891'       +'\n' +
  vcardDictionnary.END;

  console.log(vcardString);


  //On crée le fichier vcard
  fs.writeFile('user_' + userID + '.vcf', vcardString, (err) => {
    if (err) throw err;
   });

};

module.exports = infoToVcard;