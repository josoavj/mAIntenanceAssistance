# ID: KB-ACC-01
# Titre: Demande d'accès a un partage réseau ou a une application
# Catégorie: Droits d'accès

## Symptômes

- L'utilisateur signale un message "Accès refuse" ou "Access Denied" en tentant d'ouvrir un dossier partage ou une application.
- L'utilisateur demande explicitement l'obtention d'un nouvel accès nécessaire a ses fonctions (nouveau poste, nouveau projet, changement de service).
- Application ou partage visible mais dont le contenu n'est pas accessible ou apparait vide en raison de droits insuffisants.

## Étapes de résolution

1. **Identifier precisement la ressource demandee** : chemin exact du partage réseau, ou nom precis de l'application et niveau de droit requis (lecture, ecriture, administration).

2. **Vérifier que la demande est accompagnee d'une validation hierarchique ou d'une justification metier**, conformement a la procedure de gestion des accès en vigueur. Aucun octroi de droit ne doit etre effectue sans cette validation, meme pour une demande jugée mineure.

3. **Vérifier le profil actuel de l'utilisateur** dans l'annuaire (Active Directory / Entra ID) : groupes de sécurité actuels, service, fonction, pour evaluer la coherence de la demande avec son role.

4. **Si la ressource est geree par groupe de sécurité standard** (cas le plus frequent pour les partages réseau) : ajouter l'utilisateur au groupe de sécurité correspondant via la console d'administration.

5. **Si la ressource est une application avec gestion de droits propre** (SaaS, application metier) : vérifier si le support N1 dispose des droits d'administration nécessaires ou si la demande doit etre transmise au proprietaire fonctionnel de l'application (souvent designe comme "data owner" ou "application owner").

6. **Informer l'utilisateur du delai de propagation** eventuel (synchronisation Active Directory / Entra ID, delai pouvant atteindre plusieurs heures selon l'infrastructure).

7. **Confirmer avec l'utilisateur** que l'accès est fonctionnel avant clôture du ticket.

## Conditions d'escalade

- Absence de validation hierarchique ou de justification formelle pour la demande : ne pas traiter la demande, la retourner au demandeur pour completion, sans escalade nécessaire a ce stade.
- Demande d'accès a des données sensibles (données RH, financieres, personnelles au sens RGPD, ou classifiees confidentielles) : escalader systematiquement vers le proprietaire fonctionnel des données ou le delegue a la protection des données (DPO) avant tout octroi.
- Demande d'accès a des droits d'administration système ou applicatif élevés : escalader vers l'équipe sécurité pour validation, quel que soit le justificatif fourni.
- Demande provenant d'un compte recemment implique dans un incident de sécurité (voir KB-SEC-02) : suspendre le traitement et escalader vers le SOC avant toute action.
- Incoherence manifeste entre la ressource demandee et le role habituel de l'utilisateur, sans justification suffisante : escalader vers le manager du demandeur pour clarification.
