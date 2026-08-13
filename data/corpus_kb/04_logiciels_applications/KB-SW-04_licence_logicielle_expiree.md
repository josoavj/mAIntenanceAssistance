# ID: KB-SW-04
# Titre: Licence logicielle expiree ou non activee
# Catégorie: Logiciels et applications

## Symptômes

- Message indiquant que le produit n'est plus active (ex : "Produit non authentique", "License expired", bandeau d'avertissement dans l'application).
- Fonctionnalites de l'application limitees ou desactivees (mode lecture seule, export desactive, filigrane applique aux documents).
- Application refusant totalement de se lancer avec un message lie a la licence ou a l'abonnement.
- Cas frequent apres un changement de poste, une reinstallation, ou l'expiration d'un abonnement annuel (ex : Microsoft 365, Adobe Creative Cloud).

## Étapes de résolution

1. **Identifier precisement le produit et le type de licence concerne** : licence perpetuelle, abonnement individuel, ou licence attribuee via une plateforme centralisee de gestion des licences (ex : Microsoft 365 Admin Center, Adobe Admin Console).

2. **Vérifier le statut de la licence dans la console d'administration correspondante** : licence effectivement attribuee a l'utilisateur, date d'expiration, statut du paiement ou du renouvellement au niveau organisationnel.

3. **Si la licence est bien attribuee mais l'application ne la reconnait pas** :
   - Deconnecter puis reconnecter le compte associe dans l'application concernee.
   - Vérifier la synchronisation de l'heure et de la date du poste, un decalage horaire important pouvant provoquer un échec de validation de licence.

4. **Si la licence n'est pas attribuee a l'utilisateur dans la console d'administration**, vérifier la disponibilite de licences non utilisees dans le pool de l'organisation avant d'engager une demande d'achat.

5. **Attribuer la licence disponible a l'utilisateur** via la console d'administration si le support N1 dispose des droits nécessaires, ou transmettre la demande au gestionnaire de licences si ce n'est pas le cas.

6. **Si aucune licence n'est disponible dans le pool existant**, orienter la demande vers le processus d'achat/renouvellement de licence en vigueur, hors perimetre de résolution technique directe.

7. **Confirmer avec l'utilisateur** que l'application retrouve son fonctionnement complet apres attribution ou renouvellement de la licence.

## Conditions d'escalade

- Expiration généralisée d'un abonnement organisationnel (et non d'une licence individuelle) affectant l'ensemble des utilisateurs d'un produit : escalader immédiatement vers le responsable des achats logiciels ou le gestionnaire de contrats, hors perimetre du support technique.
- Absence de licence disponible dans le pool existant et besoin urgent avere pour l'activite de l'utilisateur : escalader vers le manager du demandeur pour arbitrage et validation d'un achat en urgence si nécessaire.
- Doute sur la legitimite de la licence installee (produit potentiellement obtenu hors des canaux d'achat valides par l'organisation) : escalader vers le responsable de la conformite logicielle, ne pas reactiver sans validation.
- Application critique pour l'activite de l'utilisateur totalement bloquee dans l'attente d'une résolution de licence prolongee : escalader vers le manager pour evaluer une solution palliative temporaire (licence de secours, alternative logicielle).
