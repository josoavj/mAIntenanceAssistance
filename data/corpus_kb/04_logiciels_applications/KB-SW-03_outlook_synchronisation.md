# ID: KB-SW-03
# Titre: Outlook ne synchronise plus - Fichier de données corrompu
# Catégorie: Logiciels et applications

## Symptômes

- Les nouveaux courriels n'apparaissent plus dans Outlook alors qu'ils sont visibles depuis la version web (Outlook Web Access / OWA).
- Message d'erreur de synchronisation persistant dans la barre d'état d'Outlook.
- Outlook se fige ou devient tres lent, en particulier a l'ouverture ou lors de la recherche dans les messages.
- Dossiers manquants ou incompletement affiches par rapport a ce qui est visible en ligne.

## Étapes de résolution

1. **Confirmer que le problème est propre au client Outlook local** en verifiant que les courriels recents sont bien visibles via Outlook Web Access (OWA) : si c'est le cas, le problème est confirmé comme local au poste et non serveur.

2. **Vérifier l'état de la connexion d'Outlook** via l'icône de statut en bas de la fenetre (Connecte / Deconnecte / Mode non connecté), et forcer une tentative de reconnexion.

3. **Executer l'outil de reparation integre d'Outlook** via Panneau de configuration > Programmes > Microsoft Office > Modifier > Reparation rapide, puis Reparation complete si la premiere tentative echoue.

4. **Vérifier la taille et l'integrite du fichier de données local (OST)** : pour un compte Exchange/M365, le fichier `.ost` se reconstruit automatiquement depuis le serveur en cas de suppression, contrairement a un fichier `.pst`.
   - Fermer Outlook completement.
   - Localiser le fichier `.ost` (généralement dans `%LOCALAPPDATA%\Microsoft\Outlook`).
   - Renommer le fichier (ex : ajouter `.old`) plutôt que de le supprimer directement, puis relancer Outlook pour forcer une resynchronisation complete depuis le serveur.

5. **Pour un fichier PST local (archives personnelles) suspecte d'être corrompu**, utiliser l'outil de reparation integre `SCANPST.EXE` (present dans le repertoire d'installation d'Office), en informant prealablement l'utilisateur qu'une sauvegarde du fichier original est recommandee avant reparation.

6. **Vérifier la presence de complements (add-ins) recemment installes** pouvant causer une instabilite : demarrer Outlook en mode sans échec (`outlook.exe /safe`) pour confirmer si le problème disparait, indiquant une cause liée a un complement.

7. **Informer l'utilisateur que la resynchronisation complete d'une boîte volumineuse peut prendre un temps significatif** selon le volume de données et la qualite de la connexion réseau.

## Conditions d'escalade

- Absence de nouveaux courriels egalement constatée sur Outlook Web Access : escalader vers l'équipe messagerie/infrastructure, le problème n'est pas local au poste mais côté serveur ou boîte aux lettres.
- Fichier PST corrompu de manière irrecuperable malgré l'outil de reparation, contenant des données jugees critiques par l'utilisateur : escalader vers le support N2 pour tentative de recuperation avancee.
- Boite aux lettres ayant atteint son quota de stockage, empechant toute synchronisation : escalader vers l'administrateur messagerie pour extension de quota ou archivage, hors périmètre d'action du support N1.
- Probleme touchant plusieurs utilisateurs simultanément sur le même serveur ou la même organisation Exchange/M365 : escalader immédiatement vers l'équipe infrastructure messagerie plutôt que de traiter chaque cas individuellement.
