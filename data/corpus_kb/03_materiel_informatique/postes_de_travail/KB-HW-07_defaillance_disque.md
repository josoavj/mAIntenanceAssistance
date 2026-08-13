# ID: KB-HW-07
# Titre: Defaillance de disque SSD ou HDD (fin de vie)
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Bruits mecaniques anormaux (clics repetitifs) provenant du poste, caracteristiques d'un disque dur mecanique (HDD) en fin de vie.
- Erreurs de lecture/ecriture frequentes, fichiers corrompus a l'ouverture, ou dossiers devenant subitement illisibles.
- Ralentissements soudains et importants sans lien avec un manque d'espace disque (voir KB-HW-05 pour ce cas distinct).
- Le système d'exploitation ne parvient plus a demarrer, avec un message du type "No bootable device" ou ecran noir avant meme le chargement de Windows.

## Étapes de résolution

1. **Ne jamais redemarrer le poste de maniere repetee ou forcee** en cas de suspicion de défaillance disque, chaque cycle d'alimentation supplementaire augmente le risque d'aggraver la panne et de compromettre la recuperation de données.

2. **Vérifier l'etat de sante du disque via les attributs SMART**, accessibles via l'outil de diagnostic du constructeur (ex : Dell SupportAssist, CrystalDiskInfo en environnement controle, ou l'outil de diagnostic integre au BIOS/UEFI accessible au demarrage).

3. **Si le poste demarre encore mais presente des erreurs de lecture**, executer une vérification du système de fichiers via `chkdsk /f /r` (Windows), en informant prealablement l'utilisateur qu'une sauvegarde immediate est prioritaire avant toute operation de reparation, l'operation elle-meme pouvant echouer sur un disque deja fortement degrade.

4. **Prioriser la sauvegarde des données utilisateur** des que le disque reste accessible, meme partiellement, avant toute tentative de reparation ou de reinstallation. Copier en priorité les repertoires de documents personnels et les fichiers de travail en cours.

5. **Si le poste ne demarre plus du tout**, ne pas tenter de reparation depuis le poste lui-meme : retirer le disque (si demontage autorise par la procedure interne) pour tentative de lecture via un boitier externe sur un autre poste, ou transmettre a l'équipe technique pour cette operation.

6. **Documenter les attributs SMART releves** (notamment "Reallocated Sector Count" et "Pending Sector Count" pour un HDD, ou l'indicateur d'usure pour un SSD) dans le ticket, ces valeurs orientant la decision de remplacement.

## Conditions d'escalade

- Attributs SMART indiquant un etat critique ou une degradation confirmee : escalader immédiatement vers le support matériel N2 pour planifier un remplacement, la panne totale peut survenir a tout moment.
- Poste ne demarrant plus et contenant des données non sauvegardees jugees critiques par l'utilisateur : escalader vers le support N2 pour tentative de recuperation de données specialisee, ne pas tenter d'operations de reparation avancees au niveau N1 qui risqueraient de compromettre une recuperation future.
- Panne touchant un disque encore sous garantie constructeur : escalader vers le prestataire de garantie plutot que d'engager une intervention interne non couverte.
- Defaillances repetees sur plusieurs postes d'un meme lot ou modele en peu de temps : escalader vers le support N2 matériel pour investigation d'un défaut de serie potentiel.
