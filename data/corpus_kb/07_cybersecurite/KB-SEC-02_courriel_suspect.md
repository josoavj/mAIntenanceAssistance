# ID: KB-SEC-02
# Titre: Courriel suspect - Suspicion de phishing
# Catégorie: Cybersécurité

## Symptômes

- L'utilisateur signale un courriel dont l'expéditeur, le contenu ou les liens lui semblent suspects.
- Courriel imitant une entité connue (banque, fournisseur, direction interne) avec une demande urgente (paiement, identifiants, ouverture de piece jointe).
- Fautes d'orthographe, adresse d'expéditeur ne correspondant pas au domaine officiel attendu, ou lien affiche different de l'URL reelle au survol.
- L'utilisateur indique avoir potentiellement deja clique sur un lien ou ouvert une piece jointe avant de signaler le courriel.

## Étapes de résolution

1. **Ne jamais demander a l'utilisateur de transferer le courriel par un simple "Repondre a tous" ou de le renvoyer en clair** : utiliser le mecanisme de signalement officiel s'il existe (bouton "Signaler comme phishing" du client de messagerie, ou boîte de reception dediee au signalement de sécurité).

2. **Analyser les en-tetes du courriel** (adresse d'expéditeur reelle, domaine, chemin de routage) via l'outil de messagerie ou une console d'analyse (ex : Microsoft Defender for Office 365, Proofpoint).

3. **Vérifier la reputation des liens et pieces jointes** sans les ouvrir directement, via un outil de sandboxing ou d'analyse d'URL (ex : URL scanner interne, VirusTotal en environnement controle).

4. **Determiner si le courriel a deja ete distribue a d'autres utilisateurs** via une recherche dans le système de messagerie (ex : recherche de sujet/expéditeur via le centre de conformite Microsoft 365 ou equivalent).

5. **Si le courriel est confirme malveillant et n'a pas encore ete ouvert/clique par l'utilisateur :**
   - Supprimer le courriel de la boîte de reception de l'utilisateur et, si possible, de l'ensemble des boîtes l'ayant reçu, via l'outil d'administration de messagerie.
   - Bloquer l'expéditeur et le domaine associe au niveau de la passerelle de messagerie.

6. **Si l'utilisateur indique avoir clique sur un lien ou ouvert une piece jointe**, ne pas se limiter a la suppression du courriel : traiter le poste comme potentiellement compromis (voir KB-SEC-03).

7. **Si l'utilisateur indique avoir saisi ses identifiants sur une page suite au lien**, considerer les identifiants comme compromis : forcer une reinitialisation immediate du mot de passe et une revocation des sessions actives, en coordination avec l'équipe sécurité.

## Conditions d'escalade

- Courriel identifie comme une campagne de phishing cible (spear phishing) visant specifiquement des cadres dirigeants ou des fonctions sensibles (finance, RH) : escalader immédiatement vers le SOC, priorité elevee.
- Diffusion constatee du courriel a un nombre significatif d'utilisateurs de l'organisation : escalader vers le SOC pour une communication de sensibilisation coordonnee et un blocage centralise.
- Utilisateur ayant saisi des identifiants ou execute une piece jointe : escalader systematiquement vers le SOC, ce cas ne doit pas etre clôture au niveau N1 seul.
- Doute sur la nature legitime ou malveillante du courriel apres analyse : privilegier la prudence et escalader vers l'équipe sécurité plutot que de conclure a tort a l'absence de danger.
