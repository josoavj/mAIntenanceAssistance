# ID: KB-AUTH-03
# Titre: Perte ou indisponibilite du second facteur d'authentification (MFA)
# Catégorie: Comptes et authentification

## Symptômes

- L'utilisateur ne recoit plus le code de validation par SMS ou par appel.
- L'application d'authentification (ex : Microsoft Authenticator, Google Authenticator) n'est plus installee suite a un changement ou une perte de telephone.
- Message "Nous n'avons pas pu vous joindre" ou blocage a l'etape MFA malgre un mot de passe correct.
- L'utilisateur est en deplacement et n'a plus accès au numero de telephone enregistre (perte de signal, changement de carte SIM a l'etranger).

## Étapes de résolution

1. **Vérifier l'identite du demandeur par un canal alternatif fiable** (appel video avec vérification visuelle du badge, confirmation par le manager direct), la procedure de MFA existant precisement pour eviter une usurpation, la vérification doit etre au moins aussi rigoureuse.

2. **Vérifier s'il existe une methode MFA de secours déjà enregistree** sur le compte (code de recuperation, methode d'authentification secondaire, telephone de secours) via la console d'administration (ex : Entra ID > Authentication methods).

3. **Si une methode de secours est disponible et fonctionnelle**, guider l'utilisateur pour l'utiliser directement sans intervention administrative.

4. **Si aucune methode de secours n'est disponible :**
   - Reinitialiser temporairement les methodes MFA du compte via la console d'administration (option "Require re-register MFA" sous Entra ID, ou équivalent).
   - Accompagner l'utilisateur dans le reenregistrement d'une nouvelle methode (application authenticator sur son nouveau telephone, ou methode alternative validee par la politique de sécurité).

5. **Documenter dans le ticket** le moyen de vérification d'identite utilise, condition indispensable pour la tracabilite de toute réinitialisation MFA.

6. **Rappeler a l'utilisateur d'enregistrer une seconde methode de secours** une fois le nouvel enregistrement effectue, pour eviter la recurrence de l'incident.

## Conditions d'escalade

- Impossibilité de vérifier l'identite du demandeur avec un niveau de confiance suffisant : ne pas proceder a la réinitialisation, escalader vers le manager ou les RH pour confirmation formelle avant toute action.
- Compte a privileges élevés (administrateur, compte de service avec MFA) : escalader systematiquement vers l'équipe sécurité avant réinitialisation, quelle que soit l'urgence exprimee.
- Demande reçue via un canal non habituel ou avec un sentiment d'urgence inhabituel de la part du demandeur (technique frequente d'ingenierie sociale ciblant precisement les procedures de réinitialisation MFA) : escalader vers le SOC avant toute action, ne pas ceder a la pression temporelle.
- Plusieurs demandes de réinitialisation MFA rapprochees pour des comptes differents en peu de temps : signaler au SOC, possible campagne d'attaque cible.
