# Journal météorologique de la ferme

> Projet individuel du SAS DFS, brief 4 sujet : [SUJET.md] : JOURNAL METEOROLOGIQUE DE LA FERME

## Contexte

## Contexte

Le Journal météorologique de la ferme est ​un outil fait pour les agriculteurs, les techniciens ​agricoles, les étudiants en agronomie et les chefs ​d'exploitations agricoles. Il sert à noter et à ​regarder les informations sur la température, la pluie ​et l'humidité relative de l'air․ Ça aide à ​suivre les changements météo pour permettre aux utilisateurs ​d'organiser un peu mieux certaines tâches dans le ​travail agricole. Mais il ne permet ni de ​prévoir la météo ni de tirer des résultats ​sur le climat sur une longue période․

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/salifoutoureali23-star/brief-4-journal-meteo.git
cd brief-4-journal-meteo
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/releves.json`
- [X] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [X] Lister les relevés, message si le journal est vide
- [X] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [X] Trier par température ou par pluie
- [X] Synthèse : température moyenne, minimale et maximale de la série, cumul de pluie, journées pluvieuses
- [ ] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [ ] Bonus : tri par température décroissante, journée la plus chaude

## Données

✏️ Le journal contient initialement 10 relevés fictifs, couvrant la période du 15 au 24 octobre 2026. (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md))

## Limites

Les dix jours de données au départ font ​une petite série météo et ne permettent pas ​de décrire le climat dans une région.

Le seuil ​de 10 mm utilisé pour repérer une journée ​pluvieuse, c'est un seuil fait pour apprendre et ​ça permet pas de voir venir les inondations ​ou le stress hydrique.

L'humidité relative de l'air, ça ​donne pas l'humidité du sol.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Ali Salifou Touré, salifoutoureali23-star Entraide : jules christ, sur les notions en javascript, les méthodes de tableau
