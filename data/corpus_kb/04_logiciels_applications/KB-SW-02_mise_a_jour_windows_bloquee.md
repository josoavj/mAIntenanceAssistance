# ID: KB-SW-02
# Titre: Mise a jour Windows bloquee ou en échec
# Catégorie: Logiciels et applications

## Symptômes

- La mise a jour reste bloquee a un pourcentage fixe pendant une duree anormalement longue (au-dela de 1 a 2 heures selon le type de mise a jour).
- Message d'échec avec un code d'erreur specifique (ex : `0x8024402F`, `0x80070070`, `0x8007000E`).
- Le poste redemarre en boucle sur l'ecran de configuration des mises a jour sans jamais atteindre le bureau.
- Notification persistante indiquant qu'une mise a jour necessite un redemarrage malgre plusieurs redemarrages effectues.

## Étapes de résolution

1. **Ne pas forcer l'arret du poste** si une mise a jour est visiblement en cours d'application (ecran "Ne pas eteindre votre ordinateur"), risque de corruption système grave.

2. **Si le blocage depasse une duree raisonnable sans progression visible**, patienter au moins 2 a 3 heures avant toute intervention, certaines mises a jour cumulatives majeures necessitant un temps de traitement long, en particulier sur disque mecanique.

3. **Vérifier l'espace disque disponible** (voir egalement KB-HW-05) : un espace insuffisant est une cause frequente d'échec de mise a jour.

4. **Consulter le code d'erreur specifique** et le journal des mises a jour (`Get-WindowsUpdateLog` en PowerShell, ou consultation via Parametres > Mise a jour Windows > Historique des mises a jour) pour identifier la cause precise.

5. **Executer l'outil de résolution des problemes integre a Windows** dedie aux mises a jour (Parametres > Mise a jour et sécurité > Resolution des problemes > Windows Update).

6. **Si l'échec persiste, reinitialiser les composants de mise a jour Windows** via une sequence de commandes standard (arret des services `wuauserv`, `bits`, `cryptSvc`, renommage des dossiers `SoftwareDistribution` et `Catroot2`, puis redemarrage des services).

7. **En cas de redemarrage en boucle sans accès au bureau**, tenter un demarrage en mode sans échec (Safe Mode) pour desinstaller la mise a jour problematique via le panneau de configuration, avant nouvelle tentative d'installation.

8. **Vérifier apres résolution que le poste applique correctement les mises a jour suivantes**, pour confirmer que le probleme est bien resolu et non simplement contourne.

## Conditions d'escalade

- Poste bloque en boucle de redemarrage sans accès possible au bureau meme en mode sans échec : escalader vers le support matériel N2, risque de reinstallation complete du système nécessaire, avec recuperation prealable des données si possible.
- Echec de mise a jour touchant un grand nombre de postes de maniere simultanee suite a un deploiement centralise (ex : via WSUS, Intune, SCCM) : escalader immédiatement vers l'équipe en charge du deploiement, il ne s'agit plus d'un incident individuel mais d'un probleme de campagne de deploiement.
- Le poste concerne heberge des applications metier critiques et le risque d'indisponibilite prolongee doit etre communique en amont : escalader vers le responsable de l'utilisateur pour planifier une fenetre d'intervention adaptee.
- Echec persistant apres reinitialisation des composants de mise a jour et vérification de l'espace disque : escalader vers le support N2 pour analyse approfondie des journaux système.
