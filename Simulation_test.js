// Ajouter la méthode de simulation dans la classe Parser
simulateTest() {
    // Afficher le message de démarrage de la simulation
    console.log('Simulation du test en cours...');
    
    // Boucler sur les questions sélectionnées
    for (let i = 0; i < this.questionsSelectionnees.length; i++) {
        const question = this.questionsSelectionnees[i];
        
        // Afficher la question
        console.log(`Question ${i + 1}: ${question.text}`);

        // Demander à l'enseignant de fournir une réponse simulée
        const simulatedAnswer = prompt('Veuillez entrer votre réponse simulée: ');

        // Afficher la réponse correcte (à des fins de vérification)
        console.log(`Réponse correcte: ${question.correctAnswer}`);

        // Vous pouvez ajouter ici la logique pour comparer la réponse simulée avec la réponse correcte
        // et enregistrer les résultats de la simulation si nécessaire
    }

    // Afficher le message de fin de simulation
    console.log('Simulation du test terminée.');
}

// Modifier la fonction QuestionSelection pour qu'elle puisse appeler la simulation
QuestionSelection(numeroQuestion, action) {
    if (action === 'selection') {
        // ... (votre code existant pour la sélection)
    } else if (action === 'deselection') {
        // ... (votre code existant pour la désélection)
    } else if (action === 'simulate') {
        // Appeler la fonction de simulation
        this.simulateTest();
    } else {
        console.log('Action invalide. Utilisez "selection", "deselection" ou "simulate".');
    }

    // Afficher les questions sélectionnées
    console.log('Questions sélectionnées :', this.questionsSelectionnees);
}
