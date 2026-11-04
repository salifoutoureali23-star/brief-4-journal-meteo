# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | M11 |
| date | date du relevé | texte | date réelle au format AAAA-MM-JJ | - |2026-10-25 |
| temperatureC | température de l'air | nombre | nombre; négatif ou décimal accepté  |°C  | 27,5 |
| pluieMm | hauteur de pluie | nombre | nombre ou nul (>=0)  |mm | 4 |
| humiditeAirPct | humidité relative de l'air | nombre | nombre compris entre 0 et 100 | % | 79 |

**Listes de valeurs autorisées** : Les cinq champs sont libres (texte ou nombre) et contrôlés uniquement par leurs règles de validation, id (obligatoire et unique); date( texte, au format AAAA-MM-JJ); temperatureC(nombre :négatif, décimal accepté); pluieMn(nombre, >=0); humiditeAirPct(nombre compris entre 0 et 100)

**Sources** : SUJET.md; donnees/releves.json
