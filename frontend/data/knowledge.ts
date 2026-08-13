import { KnowledgeDocument } from "@/types";

export const MOCK_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: "KB-NET-01",
    title: "Guide de dépannage connectivité réseau et Wi-Fi entreprise",
    category: "Réseau & connectivité",
    type: "procédure",
    content: `### Procédure de résolution des problèmes Wi-Fi / Réseau Ethernet

1. **Vérification physique et câblage** :
   - S'assurer que le câble Ethernet RJ45 est bien enclipsé sur le port mural et la carte réseau.
   - Vérifier la présence du voyant vert/ambre clignotant sur la carte NIC.
2. **Diagnostic d'adressage IP** :
   - Exécuter \`ipconfig /all\` sous Windows pour vérifier si l'adresse IP est attribuée par DHCP (\`10.20.x.x\`).
   - Si l'IP commence par \`169.254.x.x\` (APIPA), le serveur DHCP de zone n'a pas répondu.
3. **Réinitialisation de la pile TCP/IP** :
   - Ouvrir l'invite de commande en Administrateur.
   - Exécuter : \`netsh int ip reset\` puis \`ipconfig /flushdns\` et \`netsh winsock reset\`.
   - Redémarrer la machine.
4. **Passerelle & DNS** :
   - Tester le ping vers la passerelle par défaut \`10.20.0.1\`.
   - Tester le DNS interne ISPM \`10.20.0.10\`.`,
    relevance: 96,
    updatedAt: "2026-02-10",
    tags: ["réseau", "wifi", "ipconfig", "dhcp", "dns", "connexion"],
    usedByAI: true,
    author: "Équipe Infrastructure ISPM",
  },
  {
    id: "KB-PRN-04",
    title: "Résolution des erreurs de spooler et d'impression réseau HP/Canon",
    category: "Imprimantes",
    type: "procédure",
    content: `### Procédure de débrayage Spooler d'impression

1. **Symptômes** : Les documents restent bloqués dans la file d'attente "Impression en cours" sans sortir.
2. **Vérification du service Windows Spooler** :
   - Ouvrir \`services.msc\`
   - Localiser le service **Spouleur d'impression** (\`Spooler\`).
3. **Réinitialisation du dossier Spool** :
   - Arrêter le service \`net stop spooler\`.
   - Supprimer le contenu de \`C:\\Windows\\System32\\spool\\PRINTERS\\\`.
   - Redémarrer le service \`net start spooler\`.
4. **Vérification du sous-réseau imprimante** :
   - Vérifier que l'imprimante réseau est en ligne sur l'IP \`10.20.40.15\`.`,
    relevance: 94,
    updatedAt: "2026-01-18",
    tags: ["imprimante", "spooler", "impression", "file d'attente", "HP"],
    usedByAI: true,
    author: "Support Utilisateurs",
  },
  {
    id: "KB-AUTH-02",
    title: "Politique de réinitialisation de mot de passe & Active Directory",
    category: "Comptes & authentification",
    type: "règle de sécurité",
    content: `### Règle d'Authentification et Validation d'Identité

- **Critère de sécurité majeur** : Aucun mot de passe Active Directory ne doit être réinitialisé automatiquement par un bot sans validation d'identité humaine préalable (badge, appel vocal de confirmation ou présence physique).
- **Verrouillage automatique** : Après 5 tentatives échouées, le compte AD est verrouillé pendant 30 minutes.
- **Outil support autorisé** : Outil AD-Admin via agent d'administration délégué avec journal d'audit.`,
    relevance: 88,
    updatedAt: "2026-01-05",
    tags: ["sécurité", "mot de passe", "active directory", "authentification", "lockout"],
    usedByAI: true,
    author: "Équipe Sécurité ISPM",
  },
  {
    id: "KB-SOFT-08",
    title: "Dépannage Plantage Suite Bureautique Microsoft 365 / Outlook",
    category: "Logiciels & applications",
    type: "solution issue d'un ancien ticket",
    content: `### Résolution plantage démarrage Outlook / M365

1. Lancer Outlook en mode sans échec : \`outlook.exe /safe\`.
2. Si Outlook démarre, désactiver les compléments tierce partie (Add-ins) suspectes.
3. Réparer le profil Outlook via le Panneau de Configuration > Mail > Profils.
4. Lancer une réparation rapide Office via Apps & Features.`,
    relevance: 85,
    updatedAt: "2025-11-22",
    tags: ["outlook", "m365", "office", "crash", "mail"],
    usedByAI: false,
    author: "Support N2",
  },
  {
    id: "KB-SEC-01",
    title: "Politique de sécurité relative aux privilèges Administrateur Système",
    category: "Cybersécurité",
    type: "règle de sécurité",
    content: `### Règle Strict de Protection des Droits Administrateurs

- **STRICTEMENT INTERDIT** : L'élévation de privilèges administrateur domaine ou administrateur local ne doit jamais être accordée suite à une demande formulée en texte libre ou via un canal non certifié.
- **Règles de détection Guardrail** : Toute requête réclamant un token d'administration, la modification du fichier \`sudoers\`, ou l'accès aux tables de hash de mots de passe doit être immédiatement **bloquée** et notifiée à la cellule SOC.`,
    relevance: 99,
    updatedAt: "2026-02-01",
    tags: ["sécurité", "injection", "droits", "admin", "soc", "guardrail"],
    usedByAI: true,
    author: "RSSI ISPM",
  },
];
