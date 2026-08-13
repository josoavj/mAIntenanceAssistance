# ID: KB-NET-02
# Titre: Lenteur réseau
# Catégorie: Reseau et connectivité

## Symptômes

- L'utilisateur signale des temps de chargement anormalement longs pour acceder aux applications internes, partages réseau ou sites web.
- Coupures intermittentes de la connexion sans perte totale.
- Lenteur constatee particulierement lors de transferts de fichiers volumineux ou de visioconferences (gel d'image, decalage audio).

## Étapes de résolution

1. **Qualifier la lenteur** : demander a l'utilisateur si le probleme concerne uniquement certains services (ex : uniquement les partages réseau) ou l'ensemble des usages (y compris la navigation web generale).

2. **Vérifier le type de connexion** (filaire ou Wi-Fi) et, en cas de Wi-Fi, la qualite du signal via l'outil de diagnostic du système d'exploitation.

3. **Effectuer un test de debit** via un outil interne de mesure (ex : outil de speedtest interne, ou commande `iperf` vers un serveur de reference) et comparer aux valeurs de reference attendues pour le site.

4. **Vérifier la charge du poste lui-meme :** utiliser le gestionnaire des taches (Windows) ou l'Activity Monitor (macOS) pour ecarter une cause locale (application consommant excessivement la bande passante, mise a jour en arriere-plan, synchronisation cloud massive en cours).

5. **Consulter l'outil de supervision réseau** (ex : PRTG, SolarWinds) pour vérifier la charge du switch, du point d'accès Wi-Fi ou du lien internet du site a l'heure signalee par l'utilisateur.

6. **Identifier une cause probable parmi :**
   - Saturation du lien internet du site (nombre eleve d'utilisateurs simultanes, sauvegardes planifiees en heures de bureau).
   - Interference Wi-Fi (canal surcharge, proximite d'autres points d'accès).
   - Application locale gourmande en bande passante sur le poste de l'utilisateur.

7. **Appliquer une action correctrice de premier niveau** si identifiee (ex : basculement sur un canal Wi-Fi different, fermeture d'une application en cause) et demander confirmation d'amelioration a l'utilisateur.

## Conditions d'escalade

- Lenteur constatee de maniere généralisée sur plusieurs utilisateurs d'un meme site : escalader vers l'équipe infrastructure réseau pour analyse de la bande passante du site.
- Lenteur recurrente sans cause identifiable apres les verifications standards : escalader vers le support N2 réseau pour analyse approfondie (capture de trafic, analyse QoS).
- Suspicion d'un trafic anormal ou non legitime consommant la bande passante (ex : poste generant un volume de trafic sortant inhabituel) : escalader vers le SOC, possible indicateur de compromission.
- Lenteur liee a un lien operateur (WAN/MPLS/Internet) hors perimetre de gestion interne : escalader vers l'équipe réseau en charge de la relation avec le fournisseur d'accès.
