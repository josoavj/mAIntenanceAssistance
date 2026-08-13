# ID: KB-HW-11
# Titre: Barrette de mémoire RAM defectueuse
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Redemarrages ou ecrans bleus aleatoires sans lien apparent avec une application ou un pilote specifique (voir egalement KB-HW-04, la cause peut se recouper).
- Applications qui se ferment de manière inattendue avec des erreurs generiques, en particulier lors d'un usage intensif de la mémoire (multiples applications ouvertes, fichiers volumineux).
- Le système reconnait une quantite de mémoire inferieure a celle physiquement installee (visible dans les informations système).
- Corruption occasionnelle de fichiers sans cause logicielle identifiee, symptome plus rare mais caracteristique d'une défaillance mémoire avancee.

## Étapes de résolution

1. **Vérifier la quantite de mémoire reconnue par le système** via les informations système (Parametres > Systeme > Informations sur le système, sous Windows) et la comparer a la configuration attendue du poste selon l'inventaire.

2. **Executer l'outil de diagnostic mémoire integre a Windows** (`mdsched.exe` - Windows Memory Diagnostic), qui redemarre le poste et effectue un test au demarrage avant le chargement du système d'exploitation.

3. **Pour un diagnostic plus approfondi**, utiliser un outil de test mémoire au demarrage independant du système d'exploitation si disponible dans l'environnement de support (ex : MemTest86 lance depuis une cle USB bootable prealablement preparee par l'équipe technique).

4. **Si le poste dispose de plusieurs barrettes de mémoire et que le demontage est autorise par la procedure interne**, tester en isolant chaque barrette individuellement pour identifier laquelle est en cause, en notant precisement l'emplacement (slot) de chaque barrette testee.

5. **Vérifier que les barrettes sont correctement inserees** dans leurs emplacements, un mauvais contact pouvant simuler une défaillance mémoire sans panne réelle du composant.

6. **Consulter les journaux d'evenements système** pour identifier des erreurs de type "WHEA-Logger" ou des codes d'arret spécifiquement lies a la mémoire, qui confirment l'origine matérielle du problème.

## Conditions d'escalade

- Erreur confirmee par l'outil de diagnostic mémoire (Windows Memory Diagnostic ou MemTest86) : escalader vers le support matériel N2 pour remplacement de la barrette defectueuse identifiee.
- Poste ne disposant pas de mémoire facilement demontable (mémoire soudee sur certains modeles ultra-portables) : escalader directement vers le support matériel N2 ou le prestataire de garantie, aucune intervention de remplacement possible au niveau N1.
- Quantite de mémoire reconnue par le système inferieure a la configuration attendue sans erreur de test confirmee : escalader pour vérification physique de l'insertion des barrettes, possible problème de contact plutôt que de défaillance du composant lui-même.
- Poste sous garantie constructeur : escalader vers le prestataire de garantie plutôt que d'engager un remplacement interne.
