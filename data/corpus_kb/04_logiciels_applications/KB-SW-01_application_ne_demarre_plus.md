# ID: KB-SW-01
# Titre: Application ne demarrant plus ou se fermant de maniere inattendue
# Catégorie: Logiciels et applications

## Symptômes

- L'application ne repond pas au double-clic ou disparait immédiatement apres son lancement.
- Message d'erreur au demarrage (code d'erreur specifique, fenetre de crash, ou message generique du système d'exploitation).
- L'application se fermait normalement auparavant et le probleme est apparu recemment, potentiellement apres une mise a jour système ou applicative.

## Étapes de résolution

1. **Identifier l'application concernee, sa version, et le contexte d'apparition du probleme** (premiere utilisation, apres mise a jour, apres redemarrage du poste, de maniere aleatoire).

2. **Vérifier les messages d'erreur precis** communiques a l'utilisateur ou visibles dans les journaux d'evenements du système (Event Viewer sous Windows, Console sous macOS) pour identifier un code d'erreur exploitable.

3. **Vérifier l'espace disque disponible** sur le poste : un espace insuffisant est une cause frequente de plantage au demarrage de nombreuses applications.

4. **Tenter un redemarrage simple du poste** avant toute action plus poussee, cette action resout une part significative des incidents logiciels transitoires.

5. **Vérifier si une mise a jour de l'application est disponible et l'appliquer** via le canal de distribution logicielle interne (ex : Microsoft Intune, SCCM, Jamf pour macOS) plutot qu'une installation manuelle non controlee.

6. **Vérifier la compatibilite avec une mise a jour système recente**, en consultant les notes de version de l'editeur si l'incident est apparu juste apres une mise a jour Windows/macOS.

7. **Si l'application reste inutilisable, tenter une reinstallation propre** via l'outil de deploiement logiciel interne, en desinstallant prealablement l'application existante.

8. **Vérifier les droits d'accès au fichier ou repertoire d'installation** de l'application, une restriction de droits pouvant empecher son execution correcte.

## Conditions d'escalade

- Le probleme touche plusieurs utilisateurs simultanement pour la meme application, en particulier apres un deploiement de mise a jour recent : escalader vers l'équipe applicative concernee, possible probleme de version generalise.
- L'application est une application metier critique (ERP, CRM, logiciel de production) : escalader immédiatement vers le support N2 applicatif, sans attendre l'échec des etapes de premier niveau si l'indisponibilite bloque l'activite de l'utilisateur.
- Le message d'erreur fait reference a une base de données, un serveur applicatif, ou un service backend indisponible : escalader vers l'équipe infrastructure applicative, le probleme depasse le perimetre du poste utilisateur.
- La reinstallation complete de l'application ne resout pas le probleme : escalader vers le support N2 avec les journaux d'erreurs collectes.
