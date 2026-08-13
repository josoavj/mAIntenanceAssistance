# ID: KB-NET-03
# Titre: Connexion VPN impossible
# Catégorie: Reseau et connectivité

## Symptômes

- Le client VPN (ex : Cisco AnyConnect, FortiClient, GlobalProtect, OpenVPN) affiche une erreur de connexion ou reste bloque sur "Connecting".
- Message d'erreur d'authentification alors que les identifiants habituels sont utilises.
- Connexion VPN etablie mais absence d'accès aux ressources internes une fois connecte.
- Deconnexions VPN frequentes et repetees en cours d'utilisation.

## Étapes de résolution

1. **Vérifier la connectivité internet generale du poste** en dehors du VPN (accès a un site web externe), un probleme VPN presuppose une connexion internet fonctionnelle prealable.

2. **Vérifier la version du client VPN installee** et la comparer a la version minimale requise ; un client obsolete est une cause frequente d'échec de connexion suite a une mise a jour du concentrateur VPN côté serveur.

3. **Vérifier le statut du compte utilisateur et du second facteur d'authentification** si le VPN est associe a une MFA (cause frequente : meme cause qu'un blocage de compte standard, voir KB-AUTH-02 et KB-AUTH-03).

4. **Consulter les journaux du client VPN** (generalement accessibles via un menu "View Logs" ou equivalent dans le client) pour identifier le code d'erreur precis retourne par le serveur.

5. **Si la connexion s'etablit mais sans accès aux ressources internes :**
   - Vérifier la table de routage attribuee via `ipconfig /all` (Windows) pour confirmer que les routes internes sont bien poussees par le VPN.
   - Vérifier qu'aucun logiciel de sécurité local (pare-feu personnel, antivirus tiers) ne bloque le trafic du tunnel VPN.

6. **En cas de deconnexions repetees**, vérifier la stabilite du réseau local de l'utilisateur (Wi-Fi domestique instable, changement de réseau en cours de session) avant de suspecter une cause côté infrastructure.

7. **Tenter une reinstallation du client VPN** en dernier recours si une corruption locale est suspectee, via le portail de deploiement logiciel interne.

## Conditions d'escalade

- Erreur d'authentification persistante malgre des identifiants confirmes valides par ailleurs (connexion Windows fonctionnelle) : escalader vers l'équipe infrastructure réseau/sécurité en charge du concentrateur VPN, cause probable côté serveur.
- Plusieurs utilisateurs signalent une impossibilité de connexion VPN simultanement : escalader immédiatement, incident potentiellement lie a une panne du concentrateur VPN ou a une certification expiree (certificat serveur), sans traiter chaque cas individuellement.
- Connexion etablie mais absence totale d'accès aux ressources internes malgre vérification du routage : escalader vers le support N2 réseau pour analyse du tunnel et des regles de pare-feu associees.
- Suspicion d'utilisation du VPN depuis un appareil non conforme aux politiques de sécurité (poste personnel non enregistre) : escalader vers l'équipe sécurité avant tout retablissement d'accès.
