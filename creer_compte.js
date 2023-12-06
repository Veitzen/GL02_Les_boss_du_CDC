const fs = require('fs');
const readlineSync = require('readline-sync');

// Structure de données pour stocker les utilisateurs
let utilisateurs = [];

// Fonction pour créer un compte
function creerCompte() {
  let utilisateur = {};

  utilisateur.type = readlineSync.keyInSelect(['Enseignant', 'Membre du SRYEM'], 'Sélectionnez le type de compte :') + 1;

  utilisateur.nom = readlineSync.question('Entrez votre nom : ');
  utilisateur.prenom = readlineSync.question('Entrez votre prénom : ');
  utilisateur.email = readlineSync.questionEMail('Entrez votre adresse e-mail : ');
  utilisateur.numeroTel = readlineSync.question('Entrez votre numéro de téléphone : ');
  utilisateur.adresseMail = readlineSync.question('Entrez votre adresse mail : ');
  utilisateur.numeroBureau = readlineSync.question('Entrez votre numéro de bureau : ');

  // Génération d'un identifiant unique (peut être amélioré)
  utilisateur.id = Math.random().toString(36).substring(7);

  utilisateurs.push(utilisateur);

  console.log('Compte créé avec succès.');
}

// Fonction pour se connecter
function seConnecter() {
  let email = readlineSync.questionEMail('Entrez votre adresse e-mail : ');

  // Recherche de l'utilisateur par adresse e-mail
  let utilisateur = utilisateurs.find(user => user.email === email);

  if (utilisateur) {
    console.log(`Bienvenue, ${utilisateur.prenom} ${utilisateur.nom}!`);
   
    return utilisateur;
  } else {
    console.log('Aucun compte trouvé avec cette adresse e-mail.');
    
    return null;
  }
}

// Scénario principal
console.log('Bienvenue dans le programme.');

while (true) {
  let choix = readlineSync.keyInSelect(['Créer un compte', 'Se connecter', 'Quitter'], 'Que souhaitez-vous faire ?');

  if (choix === 0) {
    creerCompte();
  } else if (choix === 1) {
    let utilisateurConnecte = seConnecter();
    if (utilisateurConnecte) {
      // Utilisateur connecté, accéder à la fonctionnalité spécifiée (par exemple, l'affichage des questions disponibles)
      console.log('Accès à l\'affichage de toutes les questions disponibles (SPEC_1).');
      // ... Autres fonctionnalités pour l'utilisateur connecté
    }
  } else if (choix === 2) {
    break; // Quitter le programme
  }
}

// Exemple d'utilisation des données des utilisateurs
console.log('Liste des utilisateurs :');
console.log(utilisateurs);
