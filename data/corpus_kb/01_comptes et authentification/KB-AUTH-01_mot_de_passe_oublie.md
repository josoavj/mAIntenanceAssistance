# ID: KB-AUTH-01
# Titre: Mot de passe oublié - Réinitialisation
# Catégorie: Comptes et authentification

## Symptômes

- L'utilisateur indique ne plus se souvenir de son mot de passe de session Windows/macOS, de messagerie ou d'une application interne.
- Message d'erreur "Identifiant ou mot de passe incorrect" lors de la tentative de connexion.
- L'utilisateur signale avoir essayé plusieurs combinaisons sans succès, sans mention de blocage de compte (voir KB-AUTH-02 si le compte est verrouillé).

## Étapes de résolution

1. **Vérifier l'identite du demandeur** selon la procedure de vérification en vigueur (question de sécurité, validation par le manager, ou canal de contact officiel enregistre). Aucune reinitialisation ne doit etre effectuee sans cette vérification.

2. **Identifier le système concerne** : compte Active Directory / Entra ID, compte de messagerie, ou application tierce avec authentification propre (SSO ou compte local).

3. **Pour un compte Active Directory / Entra ID :**
   - Utiliser la console d'administration (ex : Active Directory Users and Computers, ou portail Entra ID) pour generer un mot de passe temporaire.
   - Forcer le changement de mot de passe a la prochaine connexion (option "User must change password at next logon").
   - Transmettre le mot de passe temporaire uniquement via un canal securise validé (jamais par email en clair vers une adresse externe).

4. **Pour un compte avec authentification multifacteur (MFA) active :**
   - Vérifier que l'utilisateur dispose toujours d'un moyen de reception du second facteur (application ou telephone enregistre).
   - Si le moyen MFA est egalement perdu, appliquer la procedure de reinitialisation MFA associee (hors perimetre de ce document, voir KB-AUTH-03 si disponible).

5. **Confirmer avec l'utilisateur** que la connexion fonctionne avec le mot de passe temporaire et que le changement obligatoire s'est bien deroule.

6. **Cloturer le ticket** en consignant l'heure de reinitialisation et le canal de vérification utilise.

## Conditions d'escalade

- Impossible de vérifier l'identite de l'utilisateur par les canaux standards : escalader vers le responsable hierarchique ou le service RH pour confirmation.
- Le compte concerne est un compte a privileges élevés (administrateur système, compte de service) : escalader systematiquement vers l'équipe sécurité avant toute reinitialisation.
- Demandes de reinitialisation repetees et rapprochees dans le temps pour le meme compte, ou demande provenant d'un canal non habituel (ex : message prive au lieu du ticketing officiel) : suspecter une tentative d'ingenierie sociale et escalader vers le SOC sans effectuer la reinitialisation.
- Echec technique de la console d'administration : escalader vers le support N2 infrastructure identite.
