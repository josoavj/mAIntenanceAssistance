# ID: KB-PRINT-01
# Titre: Impression impossible
# Catégorie: Imprimantes et périphériques

## Symptômes

- Le document envoye a l'impression reste bloque dans la file d'attente sans s'imprimer.
- Message d'erreur indiquant que l'imprimante est hors ligne, introuvable, ou en erreur.
- L'imprimante est physiquement allumee et accessible mais ne repond pas aux travaux envoyes.

## Étapes de résolution

1. **Vérifier l'état physique de l'imprimante** : mise sous tension, absence de message d'erreur sur l'ecran de l'imprimante (bourrage papier, manque d'encre/toner, capot ouvert).

2. **Vérifier la connectivité réseau de l'imprimante** si celle-ci est en réseau : ping de l'adresse IP de l'imprimante depuis un poste, vérification de son état dans la console d'administration d'impression (ex : serveur d'impression Windows, ou solution de gestion type PaperCut, PrintNode).

3. **Vérifier la file d'attente d'impression sur le poste de l'utilisateur** : vider les travaux bloques via le gestionnaire d'impression (Devices and Printers sous Windows, ou l'utilitaire d'impression macOS).

4. **Redemarrer le spouleur d'impression** sur le poste concerne si la file reste bloquee malgré la suppression des travaux (service `Print Spooler` sous Windows, redemarrable via `services.msc` ou la commande `net stop spooler` suivie de `net start spooler`).

5. **Vérifier que le bon pilote d'imprimante est installe** et a jour, en particulier après un changement de modele d'imprimante ou une mise a jour système.

6. **Tester l'impression depuis un autre poste** vers la même imprimante, pour distinguer un problème localise au poste de l'utilisateur d'un problème propre a l'imprimante.

7. **Si l'imprimante est en erreur matérielle** (bourrage persistant, cartouche non reconnue), vérifier qu'aucune intervention physique simple n'est possible avant d'escalader (retrait du papier bloque en suivant la procedure du fabricant affichee sur l'appareil).

## Conditions d'escalade

- L'imprimante est en panne matérielle confirmee (erreur persistante malgré intervention de premier niveau, pièce a remplacer) : escalader vers le prestataire de maintenance des imprimantes ou l'équipe support matériel.
- Plusieurs utilisateurs signalent une impossibilité d'imprimer sur la même imprimante réseau simultanément : escalader vers l'équipe infrastructure pour vérification du serveur d'impression ou de l'état réseau de l'imprimante.
- Probleme touchant l'ensemble des imprimantes d'un site : escalader en priorité vers l'infrastructure réseau, cause probable non liée aux imprimantes elles-memes.
- Necessite de reinstallation ou reconfiguration du serveur d'impression : hors périmètre du support N1, escalader vers le support N2 infrastructure.
