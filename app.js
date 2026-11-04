// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
// Journal météorologique de la ferme — point d'entrée : le menu.
// Suivi agroclimatique de la ferme pédagogique (Digital Farming School - Brief 4)

import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';
import {
  journeeLaPlusChaude,
  modifierReleve,
  supprimerReleve,
  trierParTemperatureDecroissante,
} from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/releves.json';

function afficherAccueil(nbReleves, erreurChargement = null) {
  console.log('==================================================');
  console.log('   JOURNAL MÉTÉOROLOGIQUE DE LA FERME');
  console.log('   Suivi agroclimatique de la ferme pédagogique');
  console.log('==================================================');
  if (erreurChargement) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreurChargement.message}. Le journal démarre vide.`);
  } else {
    console.log(`${nbReleves} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
  }
}

function afficherMenu() {
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter un relevé');
  console.log('2. Lister les relevés');
  console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
  console.log('4. Trier (température, pluie)');
  console.log('5. Synthèse de la série');
  console.log('6. Supprimer un relevé');
  console.log('7. Modifier un relevé');
  console.log('0. Quitter');
}

async function actionAjouter(releves) {
  console.log('--- Ajouter un relevé ---');
  const idSaisie = await demander('Identifiant (ex. M11) : ');
  if (idSaisie === null) return;
  const id = idSaisie.toUpperCase();

  const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (date === null) return;

  const temperatureC = await demander('Température en °C : ');
  if (temperatureC === null) return;

  const pluieMm = await demander('Pluie en mm : ');
  if (pluieMm === null) return;

  const humiditeAirPct = await demander("Humidité relative de l'air en % : ");
  if (humiditeAirPct === null) return;

  const saisie = { id, date, temperatureC, pluieMm, humiditeAirPct };
  const erreurs = ajouterReleve(releves, saisie);

  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} ajouté. Le journal compte ${releves.length} relevé(s).`);
  } else {
    console.log('Relevé refusé :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevé(s).`);
  }
}

function actionLister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}

async function actionRechercher(releves) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par date');
  console.log(`3. Les journées pluvieuses (au moins ${SEUIL_JOUR_PLUVIEUX} mm)`);

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const idSaisie = await demander('Identifiant : ');
    if (idSaisie === null) return;
    const id = idSaisie.toUpperCase();
    const releve = trouverParId(releves, id);
    if (releve) {
      console.log(formaterReleve(releve));
    } else {
      console.log(`Relevé ${id} introuvable.`);
    }
  } else if (sousChoix === '2') {
    const date = await demander('Date (AAAA-MM-JJ) : ');
    if (date === null) return;
    const releve = trouverParDate(releves, date);
    if (releve) {
      console.log(formaterReleve(releve));
    } else {
      console.log(`Relevé du ${date} introuvable.`);
    }
  } else if (sousChoix === '3') {
    const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
    console.log(`${pluvieux.length} journée(s) avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie :`);
    console.log(listerReleves(pluvieux));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function actionTrier(releves) {
  console.log('--- Trier ---');
  console.log('1. Par température croissante');
  console.log('2. Par pluie croissante');
  console.log('3. Par température décroissante');

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    console.log(listerReleves(trierParTemperature(releves)));
  } else if (sousChoix === '2') {
    console.log(listerReleves(trierParPluie(releves)));
  } else if (sousChoix === '3') {
    console.log(listerReleves(trierParTemperatureDecroissante(releves)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function actionSynthese(releves) {
  console.log('--- Synthèse de la série ---');
  console.log(`Nombre de relevés : ${releves.length}`);

  if (releves.length === 0) {
    console.log('Température moyenne : aucune donnée');
    console.log('Températures minimale et maximale : aucune donnée');
    console.log('Cumul de pluie : 0 mm');
    console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : 0`);
    console.log('Journée la plus chaude : aucune donnée');
  } else {
    const moy = moyenneTemperature(releves);
    console.log(`Température moyenne : ${moy} °C`);

    const minMax = temperatureMinMax(releves);
    console.log(`Température minimale : ${minMax.min} °C · maximale : ${minMax.max} °C`);

    console.log(`Cumul de pluie : ${cumulPluie(releves)} mm`);

    const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
    console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : ${pluvieux.length}`);

    const plusChaude = journeeLaPlusChaude(releves);
    if (plusChaude) {
      console.log(`Journée la plus chaude : ${formaterReleve(plusChaude)}`);
    } else {
      console.log('Journée la plus chaude : aucune donnée');
    }
  }

  console.log('Rappels :');
  console.log('  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.');
  console.log("  - Le seuil de 10 mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.");
  console.log("  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.");
}

async function actionSupprimer(releves) {
  const idSaisie = await demander('Identifiant : ');
  if (idSaisie === null) return;
  const id = idSaisie.toUpperCase();

  const supprime = supprimerReleve(releves, id);
  if (supprime) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} supprimé. Le journal compte ${releves.length} relevé(s).`);
  } else {
    console.log(`Relevé ${id} introuvable.`);
  }
}

async function actionModifier(releves) {
  const idSaisie = await demander('Identifiant : ');
  if (idSaisie === null) return;
  const id = idSaisie.toUpperCase();

  const champ = await demander('Champ à modifier (date, temperatureC, pluieMm, humiditeAirPct) : ');
  if (champ === null) return;

  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) return;

  const erreurs = modifierReleve(releves, id, champ, valeur);
  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${id} modifié.`);
  } else {
    console.log('Modification refusée :');
    for (const err of erreurs) {
      console.log(`  - ${err}`);
    }
  }
}

async function main() {
  ouvrirSaisie();

  let releves = [];
  try {
    releves = await chargerJson(FICHIER_DONNEES);
    afficherAccueil(releves.length);
  } catch (erreur) {
    afficherAccueil(0, erreur);
  }

  while (true) {
    afficherMenu();
    const choix = await demander('Votre choix : ');

    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      break;
    }

    try {
      switch (choix) {
        case '1':
          await actionAjouter(releves);
          break;
        case '2':
          actionLister(releves);
          break;
        case '3':
          await actionRechercher(releves);
          break;
        case '4':
          await actionTrier(releves);
          break;
        case '5':
          actionSynthese(releves);
          break;
        case '6':
          await actionSupprimer(releves);
          break;
        case '7':
          await actionModifier(releves);
          break;
        default:
          console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
          break;
      }
    } catch (erreur) {
      if (erreur.message?.startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }

  fermerSaisie();
}

main();
