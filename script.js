// La fonction principale qui vérifie les dates et déverrouille les boutons
document.addEventListener('DOMContentLoaded', () => {
    // Exécute la vérification au chargement
    verifierEtMettreAJourTousLesJours();
    // Exécute la vérification toutes les minutes (pour ne pas manquer minuit)
    setInterval(verifierEtMettreAJourTousLesJours, 60000); 
});

function verifierEtMettreAJourTousLesJours() {
    const jours = document.querySelectorAll('.jour');
    const aujourdhui = new Date();
    
    // Définit le jour actuel du Calendrier (ex: le 26 novembre 2025)
    // Aujourd'hui est le 26/11/2025. 
    // Pour les tests, le mois doit être 11 (Décembre) dans la logique ci-dessous.
    
    const moisActuel = 11;// 10 = Novembre, 11 = Décembre
    const jourDuMois = aujourdhui.getDate(); 
    
    let numeroDuJourCalendrier = 0;

    // Logique standard d'un Calendrier de l'Avent
    if (moisActuel === 11 && jourDuMois <= 24) {
        numeroDuJourCalendrier = jourDuMois;
    } else if (moisActuel === 11 && jourDuMois >= 25) {
        // Après Noël, tout est ouvert (ouvrez jusqu'à 12 si vous avez 12 cases)
        numeroDuJourCalendrier = 25; 
    } else if (moisActuel === 10) {
        // Si nous sommes en novembre (pour tester avant Décembre), forcez ici.
        // C'EST ICI QUE VOUS POUVEZ SIMULER LA DATE DE DÉVERROUILLAGE
        // Exemple pour le test :
        // numeroDuJourCalendrier = 3; // Déverrouille les jours 1, 2, 3
        numeroDuJourCalendrier = 0; // Remettre 0 pour la version finale en Novembre
    }
    
    jours.forEach(jourElement => {
        const numeroCadeau = parseInt(jourElement.dataset.jour);
        const bouton = jourElement.querySelector('button');
        
        // 1. Détermine si le bouton doit être actif
        let estActif = (numeroCadeau <= numeroDuJourCalendrier);
        
        if (bouton) {
            // Bouton est cliquable (déverrouillé)
            if (estActif) {
                bouton.textContent = `Jour ${numeroCadeau}`;
                bouton.disabled = false;
                bouton.classList.add('unlocked');
            } else {
                // Bouton est inactif (verrouillé)
                bouton.textContent = `Jour ${numeroCadeau} (Verrouillé)`;
                bouton.disabled = true;
                bouton.classList.remove('unlocked');
            }
        }
        
        // 2. Gestion de l'état ouvert dans localStorage
        const estOuvert = localStorage.getItem(`jour_${numeroCadeau}_ouvert`);
        if (estOuvert === 'true') {
            jourElement.classList.add('ouvert'); // Garde la classe pour le style
        }
    });
}


// Cette fonction est appelée UNIQUEMENT par le clic du bouton
function ouvrirJour(numeroDuJour) {
    const jourElement = document.querySelector(`.jour[data-jour="${numeroDuJour}"]`);
    const contenu = jourElement.querySelector('.contenu-cache');

    // 1. Ajoute la classe 'ouvert' (pour afficher le contenu via CSS)
    jourElement.classList.toggle('ouvert'); 

    // 2. Enregistre dans la mémoire locale que ce jour est ouvert
    if (jourElement.classList.contains('ouvert')) {
        localStorage.setItem(`jour_${numeroDuJour}_ouvert`, 'true');
    } else {
        localStorage.setItem(`jour_${numeroDuJour}_ouvert`, 'false');
    }
}
// ... Votre code existant pour ouvrirJour(jour) ...

// --------- CODE MIS À JOUR POUR LE JOUR 25 (AVEC TOGGLE) ---------
document.addEventListener('DOMContentLoaded', () => {
    const coeurBouton = document.getElementById('coeurAnimation');
    const messageFinal = document.getElementById('messageFinal');

    // On s'assure que le message est caché au départ (même si le CSS le fait)
    if (messageFinal) {
        messageFinal.style.display = 'none'; 
    }

    if (coeurBouton && messageFinal) {
        coeurBouton.addEventListener('click', () => {
            // 1. Vérifie si le message est actuellement visible
            const isVisible = messageFinal.style.display === 'block';

            // 2. Déclenche l'animation de "battement"
            coeurBouton.style.transform = 'scale(1.2)'; 
            
            setTimeout(() => {
                coeurBouton.style.transform = 'scale(1)'; 

                // 3. Bascule l'affichage du message après l'animation
                if (isVisible) {
                    // Si visible, on le cache
                    messageFinal.style.display = 'none';
                } else {
                    // Sinon, on l'affiche et on fait défiler la page
                    messageFinal.style.display = 'block';
                    messageFinal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300); // Durée du battement
        });
    }
});