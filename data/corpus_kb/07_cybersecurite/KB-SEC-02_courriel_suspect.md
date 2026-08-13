# ID: KB-SEC-02
# Titre: Courriel suspect - Suspicion de phishing
# Catégorie: Cybersécurité

## Symptômes

- L'utilisateur signale un courriel dont l'expéditeur, le contenu ou les liens lui semblent suspects.
- Courriel imitant une entité connue (banque, fournisseur, direction interne) avec une demande urgente (paiement, identifiants, ouverture de pièce jointe).
- Fautes d'orthographe, adresse d'expéditeur ne correspondant pas au domaine officiel attendu, ou lien affiché différent de l'URL réelle au survol.
- L'utilisateur indique avoir potentiellement déjà cliqué sur un lien ou ouvert une pièce jointe avant de signaler le courriel.

## Étapes de résolution

1. **Ne jamais demander a l'utilisateur de transférer le courriel par un simple "Repondre a tous" ou de le renvoyer en clair** : utiliser le mécanisme de signalement officiel s'il existe (bouton "Signaler comme phishing" du client de messagerie, ou boîte de reception dédiée au signalement de sécurité).

2. **Analyser les en-têtes du courriel** (adresse d'expéditeur réelle, domaine, chemin de routage) via l'outil de messagerie ou une console d'analyse (ex : Microsoft Defender for Office 365, Proofpoint).

3. **Vérifier la réputation des liens et pièces jointes** sans les ouvrir directement, via un outil de sandboxing ou d'analyse d'URL (ex : URL scanner interne, VirusTotal en environnement contrôle).

4. **Déterminer si le courriel a déjà été distribué a d'autres utilisateurs** via une recherche dans le système de messagerie (ex : recherche de sujet/expéditeur via le centre de conformité Microsoft 365 ou équivalent).

5. **Si le courriel est confirmé malveillant et n'a pas encore été ouvert/cliqué par l'utilisateur :**
   - Supprimer le courriel de la boîte de reception de l'utilisateur et, si possible, de l'ensemble des boîtes l'ayant reçu, via l'outil d'administration de messagerie.
   - Bloquer l'expéditeur et le domaine associé au niveau de la passerelle de messagerie.

6. **Si l'utilisateur indique avoir cliqué sur un lien ou ouvert une pièce jointe**, ne pas se limiter a la suppression du courriel : traiter le poste comme potentiellement compromis (voir KB-SEC-03).

7. **Si l'utilisateur indique avoir saisi ses identifiants sur une page suite au lien**, considérer les identifiants comme compromis : forcer une réinitialisation immédiate du mot de passe et une révocation des sessions actives, en coordination avec l'équipe sécurité.

## Conditions d'escalade

- Courriel identifié comme une campagne de phishing cible (spear phishing) visant spécifiquement des cadres dirigeants ou des fonctions sensibles (finance, RH) : escalader immédiatement vers le SOC, priorité élevée.
- Diffusion constatée du courriel a un nombre significatif d'utilisateurs de l'organisation : escalader vers le SOC pour une communication de sensibilisation coordonnée et un blocage centralisé.
- Utilisateur ayant saisi des identifiants ou exécuté une pièce jointe : escalader systématiquement vers le SOC, ce cas ne doit pas être clôture au niveau N1 seul.
- Doute sur la nature légitime ou malveillante du courriel après analyse : privilégier la prudence et escalader vers l'équipe sécurité plutôt que de conclure a tort a l'absence de danger.
