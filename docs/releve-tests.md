# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** :
Température moyenne : 27 + 28 + 29 + 27 + 30 + 28 + 26 + 29 + 30 
la somme des 10 températures = 280 divisé par 10 = 28°C, température moyenne = 28°C
Température minimale : la plus petite valeur est 26 (M03 et M08), soit 26 °C.
Température maximale : la plus grande valeur est 30 (M06 et M10), soit 30 °C.
Cumul de pluie
0 + 5 + 12 + 0 + 3 + 0 + 8 + 15 + 0 + 2 = 45
Cumul : 45 mm
Journées avec au moins 10 mm : seules deux lignes atteignent le seuil, M03 (12 mm) et M08 (15 mm): 2 journées.

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| ajouter un relevé, quitter puis relancer| le relevé est toujours est présent après rédemarrage| le relevé est toujours présent après redémarrage effectivement| M11|2026-11-03|28°C |6 mm | air 76%|
| Saisir pluie négative| saisie négative, journal inchangé | relevé refusé : la pluie doit être un nombre positif ou nul en mm, journal inchangé|-12 | 
| saisir une humidité de 101%| saisie refusée, journal inchangé| relevé refusé : l'humidité relative de l'air entre 0 et 100, journal inchangé. | 101
| Rechercher la date `2026-10-22` | Le relevé M08 est affiché | date (AAAA-MM-JJ):2026-10-30 |
M08| 2026-10-22| 26°C| 15 mm | air 85 % | 2026-10-22

Trier par pluie | les pluies apparaissent par ordre croissant, le journal reste initial inchangé| A exécuter | 2026-10-30 |

|Afficher la synthèse | 28° C ; 26° C ; 30° C ; 45 mm ; 2 journées pluvieuses | M03 | 2026-10-17 | 26°C | 12 mm | air 82 %


**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
