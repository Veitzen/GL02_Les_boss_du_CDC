// Ajouter la méthode pour afficher le bilan des réponses
displayTestResults() {
    // Vérifier si le test a été simulé
    if (this.questionsSelectionnees.length === 0) {
        console.log('Aucun test n\'a été simulé. Veuillez simuler un test avant de consulter les résultats.');
        return;
    }

    // Afficher le bilan des réponses pour chaque question
    for (let i = 0; i < this.questionsSelectionnees.length; i++) {
        const question = this.questionsSelectionnees[i];
        console.log(`Question ${i + 1}: ${question.text}`);
        console.log(`Réponse correcte: ${question.correctAnswer}`);
        // Ajouter ici la logique pour afficher la réponse simulée et déterminer si elle est correcte ou non
        // Vous pouvez également afficher la note attribuée à chaque question si cela est pertinent pour votre application
        console.log('--------------------------');
    }

    // Ajouter ici la logique pour calculer et afficher la note totale du test simulé si nécessaire
}

// Modifier la fonction QuestionSelection pour qu'elle puisse appeler l'affichage des résultats
QuestionSelection(numeroQuestion, action) {
    if (action === 'selection') {
        // ... (votre code existant pour la sélection)
    } else if (action === 'deselection') {
        // ... (votre code existant pour la désélection)
    } else if (action === 'simulate') {
        // ... (votre code existant pour la simulation)
    } else if (action === 'resultat') {
        // Appeler la fonction pour afficher les résultats
        this.displayTestResults();
    } else {
        console.log('Action invalide. Utilisez "selection", "deselection", "simulate" ou "resultat".');
    }

    // Afficher les questions sélectionnées
    console.log('Questions sélectionnées :', this.questionsSelectionnees);
}
