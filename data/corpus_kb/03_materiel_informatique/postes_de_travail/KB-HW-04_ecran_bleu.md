# ID: KB-HW-04
# Titre: Ecran bleu (BSOD) recurrent
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Ecran bleu avec message d'erreur (ex : "Your device ran into a problem", code d'arret du type `IRQL_NOT_LESS_OR_EQUAL`, `PAGE_FAULT_IN_NONPAGED_AREA`, `DRIVER_IRQL_NOT_LESS_OR_EQUAL`) suivi d'un redemarrage automatique.
- Redemarrages inattendus repetes sans que l'utilisateur ait necessairement vu l'ecran bleu (poste qui redemarre seul de facon aleatoire).
- Recurrence du probleme apres une frequence variable (quotidienne, ou lors d'actions specifiques comme la mise en veille).

## Étapes de résolution

1. **Recuperer le code d'arret exact (stop code)** communique par l'utilisateur ou visible dans les journaux d'evenements Windows (Event Viewer > Windows Logs > System, filtrer sur la source "BugCheck").

2. **Consulter le fichier de vidage mémoire (minidump)** genere par le système (`C:\Windows\Minidump`) si un outil d'analyse est disponible (ex : WinDbg, ou outil interne d'analyse de crash) pour identifier le pilote ou composant en cause.

3. **Identifier si le stop code pointe vers un pilote specifique** (nom de fichier `.sys` frequemment mentionne dans le message d'erreur), cause la plus courante des ecrans bleus recurrents.

4. **Vérifier les mises a jour recentes** ayant precede l'apparition du probleme : mise a jour Windows, installation ou mise a jour d'un pilote (carte graphique, chipset), installation d'un nouveau logiciel ou peripherique.

5. **Mettre a jour ou reinstaller le pilote suspecte** via le gestionnaire de périphériques ou l'outil de deploiement de pilotes du constructeur (ex : Dell Command Update, HP Image Assistant).

6. **Executer une vérification de l'integrite système** via les commandes `sfc /scannow` puis, si des erreurs persistent, `DISM /Online /Cleanup-Image /RestoreHealth`.

7. **Si le probleme persiste apres mise a jour des pilotes**, effectuer un test de la mémoire vive via l'outil integre Windows (`mdsched.exe` - Windows Memory Diagnostic) pour ecarter une cause materielle.

## Conditions d'escalade

- Le stop code ou le fichier minidump pointe vers un composant matériel (mémoire, disque) plutot qu'un pilote logiciel : escalader vers le support matériel N2, intervention physique probable.
- Recurrence malgre mise a jour des pilotes et vérification d'integrite système : escalader vers le support N2 poste de travail pour analyse approfondie du vidage mémoire.
- Ecrans bleus apparaissant sur plusieurs postes de meme modele suite au deploiement d'une meme mise a jour ou d'un meme pilote : escalader vers l'équipe en charge du deploiement, suspendre le deploiement en cours si possible.
- Le poste contient des données non sauvegardees critiques et le risque de perte de données est identifie avant toute action corrective lourde (reinstallation) : informer l'utilisateur et proposer une sauvegarde prealable avant de poursuivre.
