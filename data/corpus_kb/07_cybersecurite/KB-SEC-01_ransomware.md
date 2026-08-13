# ID: KB-SEC-01
# Titre: Gestion des incidents de cybersecurite lies au ransomware
# Catégorie: Cybersécurité

## Description generale

Ce document encadre la procedure de detection, confinement et remediation initiale d'un incident de type ransomware sur un poste de travail ou un serveur du parc informatique. Il s'adresse a l'assistant de support de niveau 1 (N1) et definit precisement les limites de son intervention.

## Symptômes caracteristiques

- Fichiers utilisateurs renommes avec une extension inconnue (ex : `.locked`, `.crypt`, `.encrypted`, ou extension aleatoire).
- Presence d'une note de rancon sous forme de fichier texte ou HTML dans plusieurs repertoires (ex : `READ_ME_TO_DECRYPT.txt`, `RECOVER_FILES.html`).
- Ecran de verrouillage ou fond d'ecran modifie affichant un message de demande de rancon.
- Lenteur soudaine et anormale du système ou de l'accès aux partages réseau, due a un chiffrement massif en cours.
- Alertes de l'antivirus/EDR signalant un comportement de chiffrement de masse ou de modification suspecte de fichiers (ex : alerte Sophos Intercept X, CrowdStrike Falcon, Microsoft Defender for Endpoint).
- Connexions réseau sortantes inhabituelles vers des adresses IP ou domaines non repertories, visibles via le pare-feu ou l'outil de supervision réseau (ex : SolarWinds, PRTG).
- Comptes utilisateurs verrouilles ou modifies de facon inattendue dans l'Active Directory.

## Étapes de résolution

1. **Confirmer l'incident.** Vérifier au moins deux indicateurs parmi les symptomes ci-dessus (fichiers renommes + note de rancon, ou alerte EDR + fichiers modifies en masse). Ne jamais se baser sur un seul indicateur isolé pour qualifier l'incident.

2. **Isoler immédiatement le poste ou serveur concerne du réseau.**
   - Debrancher le câble Ethernet ou desactiver le Wi-Fi, si accès physique possible.
   - A distance, isoler la machine via la console EDR (fonction "Network Isolation" ou "Contain Host", disponible sur CrowdStrike Falcon, Microsoft Defender, SentinelOne).
   - Ne jamais eteindre la machine avant isolement réseau : cela peut detruire des preuves en mémoire nécessaires a l'analyse forensique.

3. **Ne pas tenter de supprimer les fichiers chiffres ni la note de rancon.** Ces elements sont nécessaires a l'identification de la souche du ransomware (via des services comme ID Ransomware) et a une eventuelle procedure de dechiffrement ulterieure.

4. **Documenter l'incident** dans l'outil de ticketing (ex : ServiceNow, Jira Service Management) : horodatage de la premiere detection, utilisateur/poste concerne, symptomes observes, actions deja realisees.

5. **Vérifier l'etendue de la propagation** via la console EDR ou le SIEM (ex : Splunk, Microsoft Sentinel) : rechercher d'autres postes presentant des indicateurs de compromission (IOC) similaires (memes hachages de fichiers, memes connexions réseau suspectes).

6. **Identifier le vecteur d'entree probable** si les outils le permettent : piece jointe email, macro Office, accès RDP expose, identifiants compromis. Consigner cette information dans le ticket sans tenter de remediation avancee a ce stade.

7. **Suspendre les comptes utilisateurs associes** au poste compromis dans l'Active Directory ou l'annuaire cloud (Azure AD/Entra ID), en cas de suspicion de vol d'identifiants.

## Conditions d'escalade

L'assistant doit arreter toute action autonome et escalader immédiatement vers l'équipe de sécurité (SOC) ou le RSSI dans les cas suivants :

- Plus d'un poste ou serveur affecte simultanement (suspicion de propagation laterale).
- Un serveur critique (contrôleur de domaine, serveur de fichiers central, base de données de production) est concerne.
- La note de rancon mentionne explicitement une exfiltration de données ("double extorsion").
- Impossibilite d'isoler la machine a distance (EDR non fonctionnel ou desactive sur le poste).
- Detection d'une désactivation ou d'une modification des outils de sécurité (antivirus, EDR, journaux d'evenements effaces).
- Toute demande emanant d'un utilisateur ou d'un tiers concernant le paiement d'une rancon : ce point releve exclusivement d'une decision de la direction et du RSSI, jamais du support technique.

Dans tous les cas listes ci-dessus, l'assistant doit creer un ticket de priorité critique (P1), notifier l'astreinte sécurité selon la procedure d'alerte en vigueur, et s'abstenir de toute communication externe (client, presse, autorites) qui releve de la cellule de crise.

## Actions strictement interdites au support N1

- Eteindre ou redemarrer une machine compromise avant validation du SOC.
- Payer, negocier ou entrer en contact avec les auteurs de l'attaque.
- Restaurer une sauvegarde sans validation prealable de sa non-compromission par l'équipe sécurité.
- Communiquer publiquement ou en interne sur l'incident hors des canaux valides par la cellule de crise.
