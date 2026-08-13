# ID: KB-ACC-02
# Titre: Depart de collaborateur - Désactivation des accès (offboarding)
# Catégorie: Droits d'accès

## Symptômes

- Reception d'une notification RH ou managerielle formelle indiquant la date de depart effective d'un collaborateur.
- Demande explicite de désactivation d'un compte suite a une fin de contrat, une rupture, ou une mutation vers une autre entité du groupe.
- Necessite de recuperer ou de transférer les données professionnelles du collaborateur avant fermeture definitive du compte.

## Étapes de résolution

1. **Vérifier la reception d'une demande formelle et validee** (notification RH officielle ou ticket valide par le manager), aucune désactivation de compte ne doit etre initiee sur simple demande verbale ou informelle.

2. **Confirmer la date et l'heure exactes de désactivation prevue**, qui peut differer de la date de fin de contrat administrative (ex : désactivation immédiate demandee pour un depart conflictuel, versus désactivation differee pour une transition standard).

3. **A la date prevue, executer la sequence de désactivation standard :**
   - Desactiver le compte dans l'annuaire (Active Directory / Entra ID) plutôt que de le supprimer immédiatement, afin de conserver la possibilite d'un accès administratif temporaire aux données si nécessaire.
   - Revoquer l'ensemble des sessions actives et jetons d'authentification du compte (option "Revoke sessions" dans la console d'identite).
   - Retirer le compte de l'ensemble des groupes de sécurité et listes de distribution.
   - Desactiver ou transférer l'accès MFA associé au compte.

4. **Gerer la boîte de messagerie** selon la politique en vigueur : mise en place d'un transfert automatique temporaire vers le manager si valide par la procedure interne, et/ou conversion en boîte partagee pour conservation.

5. **Recuperer ou transférer les fichiers professionnels** stockes localement ou sur l'espace personnel cloud du collaborateur vers un emplacement designe par le manager, selon la procedure de conservation des données en vigueur.

6. **Recuperer le matériel physique** attribue (poste, telephone, badges, tokens) selon la procedure de restitution de matériel, en coordination avec les services generaux si nécessaire.

7. **Documenter chaque etape realisee dans le ticket** avec horodatage precis, ce type d'action etant frequemment soumis a audit de conformité.

## Conditions d'escalade

- Depart identifié comme conflictuel ou a risque (licenciement pour faute, depart vers un concurrent direct) : escalader vers l'équipe sécurité pour une désactivation immédiate et prioritaire, potentiellement avant l'annonce officielle au collaborateur, selon la procedure de sécurité specifique a ce type de depart.
- Absence de validation formelle RH ou manageriale malgre une demande reçue : ne pas executer la désactivation et escalader vers les RH pour confirmation avant toute action.
- Compte du collaborateur disposant de droits d'administration sur des systemes critiques : escalader vers l'équipe sécurité pour vérifier qu'aucun accès residuel ou compte de service associé ne subsiste apres la désactivation standard.
- Demande de recuperation de données personnelles melangees a des données professionnelles sur le matériel restitue : escalader vers les RH ou le service juridique pour arbitrage, situation sensible au regard de la protection de la vie privee.
