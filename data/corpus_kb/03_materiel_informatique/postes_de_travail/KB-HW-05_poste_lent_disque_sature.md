# ID: KB-HW-05
# Titre: Poste anormalement lent - Espace disque sature
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Demarrage du poste anormalement long (plusieurs minutes avant d'atteindre un etat utilisable).
- Lenteur généralisée lors de l'ouverture des applications, y compris des applications legeres.
- Message d'avertissement système indiquant un espace disque faible ou critique.
- Poste qui "gele" ou devient non reactif de maniere ponctuelle, en particulier lors d'operations disque (enregistrement de fichier, ouverture d'un document volumineux).

## Étapes de résolution

1. **Vérifier l'espace disque disponible** sur le disque système via l'explorateur de fichiers ou la commande `Get-PSDrive` (PowerShell) / `df -h` (macOS/Linux). Un espace libre inferieur a 10-15 % de la capacite totale degrade significativement les performances, en particulier sur disque SSD.

2. **Identifier les elements consommant le plus d'espace** via l'outil integre du système (ex : "Storage Sense" sous Windows, "Gestionnaire de stockage" sous macOS) : fichiers temporaires, cache navigateur, fichiers de mise a jour Windows non nettoyes, dossier de telechargements.

3. **Executer un nettoyage standard** via l'outil de nettoyage de disque (`cleanmgr` sous Windows, incluant le nettoyage des fichiers système et des anciennes installations Windows) et vider la corbeille.

4. **Vérifier les programmes lances automatiquement au demarrage** via le gestionnaire des taches (onglet "Demarrage" sous Windows, ou "Elements de connexion" sous macOS) et desactiver les applications non essentielles identifiees en accord avec l'utilisateur.

5. **Vérifier l'etat de sante du disque** via l'outil de diagnostic du système ou du constructeur (attribut SMART), un disque presentant des secteurs defectueux provoque une degradation progressive des performances au-dela d'un simple manque d'espace.

6. **Vérifier la presence de mises a jour Windows en attente ou bloquees**, une mise a jour incomplete pouvant fortement ralentir le système (voir egalement KB-SW-02).

7. **Si le poste utilise encore un disque dur mecanique (HDD) et que le volume d'usage le justifie**, evaluer une eligibilite au remplacement par un SSD dans le cadre du cycle de renouvellement de parc.

## Conditions d'escalade

- Diagnostic SMART indiquant un disque en etat degrade ou en cours de défaillance : escalader vers le support matériel N2 pour planifier un remplacement, avec sauvegarde prealable des données en priorité.
- Lenteur persistante malgre nettoyage et liberation d'espace disque significative, sans cause materielle identifiee : escalader vers le support N2 pour analyse approfondie (processus en arriere-plan, logiciel de sécurité mal configure, analyse de performance detaillee).
- Suspicion d'un logiciel non autorise ou malveillant consommant les ressources du poste (processus inconnu fortement consommateur de CPU/disque) : escalader vers le SOC plutot que de traiter comme une simple lenteur materielle (voir KB-SEC-03).
- Le poste est trop ancien pour repondre aux exigences de performance actuelles malgre toutes les optimisations possibles : escalader vers le responsable de la gestion de parc pour evaluation d'un remplacement dans le cadre du cycle de renouvellement.
