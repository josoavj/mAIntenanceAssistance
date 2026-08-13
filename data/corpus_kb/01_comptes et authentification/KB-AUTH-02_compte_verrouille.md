# ID: KB-AUTH-02
# Titre: Compte utilisateur verrouillé
# Catégorie: Comptes et authentification

## Symptômes

- Message d'erreur explicite du type "Ce compte a été verrouillé" ou "Account locked out" lors de la tentative de connexion.
- L'utilisateur indique que son compte fonctionnait normalement peu de temps auparavant.
- Blocage constate sur plusieurs services simultanément (session Windows, messagerie, VPN) si l'authentification est federee (SSO).

## Étapes de résolution

1. **Vérifier l'identite du demandeur** selon la procedure standard avant toute action sur le compte.

2. **Consulter les journaux d'evenements de sécurité** via l'outil d'administration (ex : Event Viewer sur le contrôleur de domaine, ou journal de connexions Entra ID) pour identifier la cause du verrouillage : nombre de tentatives echouees, poste source, horodatage.

3. **Déterminer la cause probable :**
   - Erreur de saisie répétée par l'utilisateur (cas le plus frequent) : mot de passe expire non mis a jour sur un appareil mobile ou un service synchronise.
   - Tentative de connexion depuis un appareil ou une localisation inhabituelle.
   - Application ou script utilisant des identifiants en cache invalides (cause frequente de verrouillages en boucle).

4. **Deverrouiller le compte** via la console d'administration (option "Unlock account" dans Active Directory Users and Computers ou équivalent Entra ID).

5. **Si la cause identifiee est un identifiant en cache invalide** (ex : telephone synchronisant la messagerie avec l'ancien mot de passe), demander a l'utilisateur de mettre a jour les identifiants sur l'ensemble de ses appareils avant de cloturer le ticket, afin d'eviter un nouveau verrouillage immediat.

6. **Confirmer avec l'utilisateur** que la connexion est retablie sur l'ensemble des services concernes.

## Conditions d'escalade

- Les journaux montrent des tentatives de connexion provenant d'une adresse IP ou d'un pays inhabituel non explique par l'utilisateur (ex : deplacement non declare) : escalader immédiatement vers le SOC avant tout deverrouillage, suspicion de compromission d'identifiants.
- Verrouillages repetes du même compte sur une courte periode malgré le deverrouillage : escalader vers le support N2 pour analyse approfondie.
- Le compte concerne est un compte a privileges élevés : deverrouillage soumis a validation préalable de l'équipe sécurité.
- Impossibilité de déterminer la cause du verrouillage via les journaux disponibles : escalader vers l'équipe infrastructure identite.
