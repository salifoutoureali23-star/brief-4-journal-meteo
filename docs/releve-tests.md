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
| calcul de la température moyenne | 28°C| 28°C après calcul(SommeTemperature/totalTemperature) | Salifou Toure Ali |
| calcul de la température minimale | 26°C |26°C après observation dans le tableau | Salifou Toure Ali |
| calcul de la température maximale | 30°C | 30°C après observation dans le tableau | Salifou Toure Ali
| calcul de cumul de pluie | 45mm | 45mm après addition des quantités pluie | Salifou Toure Ali
| determination des journées avec au moins 10mm | deux journées M03(12mm); M08(15mm) | après comparaison des seuils | Salifou Touré Ali |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
