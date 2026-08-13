# ID: KB-AUTH-04
# Titre: Compte suspendu suite a une activite jugée anormale
# Catégorie: Comptes et authentification

## Symptômes

- L'utilisateur signale ne plus pouvoir se connecter, avec un message specifique différent d'un simple verrouillage (ex : "Votre compte a été suspendu pour activite suspecte", "Sign-in blocked by Conditional Access").
- Le blocage a été declenche automatiquement par une politique de sécurité (ex : Conditional Access sous Entra ID, Cloud App Security) sans action volontaire d'un administrateur.
- L'utilisateur indique un evenement recent inhabituel : connexion depuis un nouveau pays, utilisation d'un nouvel appareil non enregistre, tentative de connexion massive detectee.

## Étapes de résolution

1. **Ne pas lever la suspension automatiquement** : ce type de blocage resulte d'une politique de sécurité automatisee et differe d'un verrouillage standard (voir KB-AUTH-02), il necessite une analyse préalable.

2. **Consulter le journal des connexions** dans la console de sécurité (ex : Entra ID Sign-in logs, Microsoft Defender for Cloud Apps, Azure AD Identity Protection) pour identifier le motif exact du declenchement : voyage impossible (impossible travel), adresse IP a risque, fuite d'identifiants detectee sur une base externe.

3. **Recouper l'evenement avec le contexte declare par l'utilisateur** : deplacement professionnel légitime non declare au préalable, nouvel appareil recemment configure, utilisation d'un VPN personnel modifiant la localisation apparente.

4. **Si l'evenement est explique de manière coherente et verifiee** (ex : deplacement confirmé par l'agenda professionnel ou une note de frais correspondante), proceder a la levée de la suspension via la console de sécurité.

5. **Si l'origine de l'alerte reste incertaine**, ne pas lever la suspension et transmettre le dossier pour analyse approfondie.

6. **Dans tous les cas**, recommander a l'utilisateur un changement de mot de passe par precaution avant la levée definitive de la suspension.

## Conditions d'escalade

- Toute suspension liée a une detection de type "identifiants compromis" (leaked credentials) provenant d'une source de renseignement sur les menaces : escalader systématiquement vers le SOC, la levée de blocage ne doit jamais être effectuee au niveau N1 dans ce cas.
- Connexions simultanees depuis des localisations geographiquement incompatibles (impossible travel) sans explication verifiable : escalader immédiatement vers le SOC, suspicion forte de compromission de compte.
- Compte a privileges élevés suspendu par la politique de sécurité : escalader systématiquement, aucune levée de blocage par le support N1 dans ce cas.
- Utilisateur insistant fortement pour une levée immédiate sans explication verifiable de l'evenement declencheur : maintenir la suspension et escalader, la pression du demandeur ne constitue pas un motif de levée.
