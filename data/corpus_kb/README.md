# Corpus KB - mAIntenanceAssistance

Base de connaissances pour l'assistant de support IT, organisée par catégorie
pour faciliter la maintenance humaine. L'ingestion RAG peut se faire sur
l'ensemble du dossier de manière récursive (l'arborescence n'a pas besoin
d'être respectée par l'index vectoriel, chaque document est autoporteur
grâce a son en-tete ID/Titre/Catégorie).

## Structure

- 01_comptes et authentification/    (KB-AUTH-xx)
- 02_reseau_connectivite/            (KB-NET-xx)
- 03_materiel_informatique/          (KB-HW-xx)
  - postes_de_travail/
  - peripheriques_affichage_bureau/
  - equipements_reseau_locaux/
- 04_logiciels_applications/         (KB-SW-xx)
- 05_imprimantes_peripheriques/      (KB-PRINT-xx)
- 06_droits_acces/                   (KB-ACC-xx)
- 07_cybersecurite/                  (KB-SEC-xx)
- 08_autre_indetermine/              (KB-OTH-xx)

Règle d'unicite:
- Un ID KB ne doit exister qu'une seule fois dans le corpus.
- Les documents `KB-ACC-xx` doivent être places uniquement dans `06_droits_acces/`.

## Convention de nommage

Chaque fichier : `KB-<PREFIXE>-<NUMERO>_<slug-du-titre>.md`
Le préfixe correspond au sous-dossier (catégorie), le numero est
séquentiel au sein du préfixe.

Mapping préfixe -> dossier:
- `KB-AUTH-xx` -> `01_comptes et authentification/`
- `KB-NET-xx` -> `02_reseau_connectivite/`
- `KB-HW-xx` -> `03_materiel_informatique/` (et sous-dossiers)
- `KB-SW-xx` -> `04_logiciels_applications/`
- `KB-PRINT-xx` -> `05_imprimantes_peripheriques/`
- `KB-ACC-xx` -> `06_droits_acces/`
- `KB-SEC-xx` -> `07_cybersecurite/`
- `KB-OTH-xx` -> `08_autre_indetermine/`

## Ajout d'un nouveau document

1. Identifier la catégorie et le préfixe correspondant.
2. Attribuer le numero suivant disponible pour ce préfixe.
3. Respecter le gabarit standard (en-tete ID/Titre/Catégorie, sections
   Symptômes / Étapes de résolution / Conditions d'escalade).
4. Placer le fichier dans le sous-dossier approprie.
