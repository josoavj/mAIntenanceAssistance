# ID: KB-SEC-03
# Titre: Poste de travail compromis (suspicion de malware hors ransomware)
# Catégorie: Cybersécurité

## Symptômes

- Alerte de l'antivirus/EDR signalant la detection ou le blocage d'un fichier ou processus malveillant (ex : alerte Microsoft Defender for Endpoint, CrowdStrike Falcon, Sophos Intercept X).
- Comportement anormal du poste : lenteur soudaine et inexpliquee, fenetres publicitaires intempestives, processus inconnus visibles dans le gestionnaire des taches, parametres navigateur modifies sans action de l'utilisateur.
- L'utilisateur signale avoir cliqué sur un lien suspect ou ouvert une pièce jointe suite a un courriel de phishing (voir KB-SEC-02).
- Connexions réseau sortantes inhabituelles depuis le poste, visibles via le pare-feu ou l'EDR.

## Étapes de résolution

1. **Confirmer l'alerte** en consultant la console EDR/antivirus pour visualiser le detail de la detection : type de menace, fichier ou processus concerne, action déjà effectuee automatiquement par l'outil (mise en quarantaine, blocage).

2. **Si l'outil de sécurité a déjà neutralise la menace automatiquement (mise en quarantaine confirmee) et qu'aucune propagation n'est detectee**, documenter l'incident et surveiller le poste sur les heures suivantes sans action supplementaire immédiate.

3. **Si la menace n'a pas été neutralisee automatiquement ou si le comportement suspect persiste :**
   - Isoler le poste du réseau via la fonction de confinement de l'EDR ("Network Isolation" ou "Contain Host"), sans eteindre la machine.
   - Ne pas laisser l'utilisateur poursuivre des actions sur le poste (saisie d'identifiants, transactions) tant que le diagnostic n'est pas etabli.

4. **Lancer une analyse complete via l'outil de sécurité** depuis la console d'administration (scan a distance) plutôt que localement sur le poste.

5. **Vérifier si des identifiants ont été saisis ou si des données sensibles etaient accessibles depuis le poste** au moment de la compromission suspectee, information nécessaire pour evaluer l'ampleur de l'incident.

6. **Documenter precisement la chronologie** : heure de premiere alerte, actions de l'utilisateur ayant precede l'incident (email reçu, site visite, fichier telecharge), actions déjà entreprises.

## Conditions d'escalade

- Menace non neutralisee automatiquement par l'outil de sécurité, ou type de menace classee critique (cheval de Troie avec accès distant, keylogger, outil d'exfiltration) : escalader immédiatement vers le SOC.
- Indices de mouvement lateral (tentative de connexion du poste compromis vers d'autres machines ou serveurs du réseau) : escalader en priorité critique, la ransomware KB-SEC-01 s'applique si un chiffrement de fichiers est egalement constate.
- Identifiants d'un compte a privileges élevés potentiellement compromis : escalader immédiatement vers le SOC pour révocation de session et changement de mot de passe coordonne.
- Doute persistant sur la nature de l'alerte après vérification standard : escalader plutôt que de cloturer un ticket de sécurité sans certitude, le cout d'une escalade non nécessaire est toujours inferieur a celui d'un incident non traite.
