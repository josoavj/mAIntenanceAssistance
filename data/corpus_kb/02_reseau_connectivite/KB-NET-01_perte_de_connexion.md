# ID: KB-NET-01
# Titre: Perte de connexion réseau
# Catégorie: Réseau et connectivité

## Symptômes

- L'utilisateur signale une absence totale d'accès a internet ou au réseau interne de l'entreprise.
- Icone réseau affichant une croix ou un point d'exclamation dans la barre système.
- Impossibilité d'accéder aux partages réseau, a la messagerie, ou aux applications internes, alors que le poste démarre normalement.

## Étapes de résolution

1. **Déterminer le mode de connexion** : filaire (Ethernet) ou sans fil (Wi-Fi).

2. **Vérifications de base côté utilisateur :**
   - Filaire : vérifier que le câble RJ45 est bien connecté au poste et a la prise murale, et que le voyant du port réseau est actif.
   - Wi-Fi : vérifier que le Wi-Fi est activé sur le poste et que le réseau attendu apparaît dans la liste des réseaux disponibles.

3. **Effectuer un test de connectivité de base a distance ou en guidant l'utilisateur :**
   - Commande `ipconfig /all` (Windows) ou `ifconfig` / `ip a` (Linux/macOS) pour vérifier l'attribution d'une adresse IP valide.
   - Si l'adresse IP est de type APIPA (plage 169.254.x.x), suspecter une absence de réponse du serveur DHCP.
   - Commande `ping` vers la passerelle par défaut, puis vers une adresse externe connue (ex : `ping 8.8.8.8`) pour distinguer un problème local d'un problème réseau plus large.

4. **En cas d'échec DHCP :** demander a l'utilisateur de forcer le renouvellement via `ipconfig /release` puis `ipconfig /renew`. Si l'opération echoue de manière répétée, suspecter une panne du point d'accès ou du switch local (voir KB-HW-03).

5. **Vérifier si l'incident est isolé ou généralisé** en consultant l'outil de supervision réseau (ex : SolarWinds, PRTG, ou tableau de bord du contrôleur Wi-Fi) pour déterminer si d'autres utilisateurs du même site ou du même segment sont affectés.

6. **Si l'incident est isolé au poste :** proceder au redémarrage du poste et, si nécessaire, de l'adaptateur réseau via le gestionnaire de périphériques.

7. **Confirmer le rétablissement de la connexion** avec l'utilisateur avant clôture du ticket.

## Conditions d'escalade

- Panne généralisée affectant plusieurs utilisateurs sur un même site ou segment réseau : escalader immédiatement vers l'équipe infrastructure réseau, il ne s'agit plus d'un incident individuel.
- Aucune adresse IP attribuée malgré le renouvellement DHCP et absence de panne généralisée constatée : escalader vers le support N2 réseau pour vérification de la configuration du port switch.
- Suspicion de panne matérielle sur un équipement réseau local (prise murale, point d'accès, switch) : escalader vers KB-HW-03 et l'équipe technique concernée.
- Panne persistante sur un site distant sans accès physique possible pour le support N1 : escalader vers l'équipe réseau avec intervention terrain a planifier.
