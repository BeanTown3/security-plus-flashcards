const quests = [
  {
    zone: "Key Camp",
    term: "Plaintext",
    mode: "Meaning",
    prompt: "What does plaintext mean?",
    choices: [
      "Readable data before encryption",
      "Scrambled data after encryption",
      "A certificate revocation check",
      "A one-way password fingerprint"
    ],
    answer: 0,
    why: "Plaintext is readable data before encryption. Ciphertext is what you get after encryption.",
    lesson: { clue: "Readable before encryption", use: "Starting data", why: "Plaintext becomes ciphertext.", trap: "Ciphertext is after encryption." }
  },
  {
    zone: "Key Camp",
    term: "Ciphertext",
    mode: "Meaning",
    prompt: "What does ciphertext mean?",
    choices: [
      "A public certificate",
      "Scrambled unreadable data after encryption",
      "The random value added to a password",
      "A trusted certificate authority"
    ],
    answer: 1,
    why: "Ciphertext is encrypted data. You need the correct key to turn it back into plaintext.",
    lesson: { clue: "Scrambled unreadable data", use: "Protected output", why: "Encryption turns plaintext into ciphertext.", trap: "Hash output is not reversible ciphertext." }
  },
  {
    zone: "Cipher Cave",
    term: "Symmetric Encryption",
    mode: "When to use",
    prompt: "You need to encrypt a large backup file quickly. What should you use?",
    choices: [
      "Symmetric encryption",
      "Digital signature",
      "OCSP",
      "Steganography"
    ],
    answer: 0,
    why: "Symmetric encryption is fast and best for bulk data. AES is the big exam example.",
    lesson: { clue: "Large backup file quickly", use: "Symmetric encryption", why: "Fast for bulk data.", trap: "Signatures prove sender and integrity." }
  },
  {
    zone: "Cipher Cave",
    term: "Asymmetric Encryption",
    mode: "When to use",
    prompt: "You need public and private keys for key exchange or proof of sender. What fits?",
    choices: [
      "Hashing",
      "Asymmetric encryption",
      "Masking",
      "CRL"
    ],
    answer: 1,
    why: "Asymmetric encryption uses a public/private key pair. It helps with key exchange and digital signatures.",
    lesson: { clue: "Public and private keys", use: "Asymmetric encryption", why: "Solves key exchange and supports signatures.", trap: "It is slower for bulk data." }
  },
  {
    zone: "Cipher Cave",
    term: "AES",
    mode: "Meaning",
    prompt: "What is AES best known for?",
    choices: [
      "Fast symmetric encryption",
      "Certificate revocation",
      "Password cracking",
      "Blockchain mining"
    ],
    answer: 0,
    why: "AES means Advanced Encryption Standard. It is a modern symmetric block cipher.",
    lesson: { clue: "Fast symmetric encryption", use: "AES", why: "Modern standard block cipher.", trap: "AES is not asymmetric." }
  },
  {
    zone: "Cipher Cave",
    term: "ECC",
    mode: "When to use",
    prompt: "A mobile app needs strong asymmetric crypto with less processing power. Pick the best fit.",
    choices: [
      "DES",
      "ECC",
      "MD5",
      "CRL"
    ],
    answer: 1,
    why: "ECC means Elliptic Curve Cryptography. It gives strong asymmetric security with smaller keys.",
    lesson: { clue: "Mobile and less processing", use: "ECC", why: "Strong asymmetric crypto with smaller keys.", trap: "Smaller ECC keys are not weaker." }
  },
  {
    zone: "Hash Mine",
    term: "Hashing",
    mode: "Meaning",
    prompt: "What is hashing used for?",
    choices: [
      "Reversible secrecy",
      "One-way integrity checking",
      "Issuing certificates",
      "Replacing data with a vault token"
    ],
    answer: 1,
    why: "Hashing creates a one-way digest to verify integrity. It is not encryption.",
    lesson: { clue: "One-way integrity check", use: "Hashing", why: "Detects changes to data.", trap: "Hashing does not provide confidentiality." }
  },
  {
    zone: "Hash Mine",
    term: "Collision",
    mode: "Trap",
    prompt: "Two different files produce the same hash. What is that called?",
    choices: [
      "Collision",
      "Downgrade",
      "Tokenization",
      "Mutual TLS"
    ],
    answer: 0,
    why: "A collision happens when two different inputs create the same hash output.",
    lesson: { clue: "Two files, same hash", use: "Collision", why: "Different inputs matched one digest.", trap: "This is not reversing the hash." }
  },
  {
    zone: "Hash Mine",
    term: "Salting",
    mode: "When to use",
    prompt: "You want identical passwords to produce different hashes. What should you add?",
    choices: [
      "A salt",
      "A wildcard certificate",
      "A CRL",
      "A public key"
    ],
    answer: 0,
    why: "A salt adds random data before hashing, which defeats precomputed rainbow table attacks.",
    lesson: { clue: "Same passwords, different hashes", use: "Salt", why: "Adds random uniqueness before hashing.", trap: "A salt is not an encryption key." }
  },
  {
    zone: "Hash Mine",
    term: "Pass-the-Hash",
    mode: "Trap",
    prompt: "An attacker logs in by reusing a stolen password hash without cracking it. What attack is this?",
    choices: [
      "Birthday attack",
      "Pass-the-hash",
      "Downgrade attack",
      "Steganography"
    ],
    answer: 1,
    why: "Pass-the-hash reuses the hash directly as an authentication secret.",
    lesson: { clue: "Uses stolen hash directly", use: "Pass-the-hash", why: "No password cracking needed.", trap: "The attacker may never know the password." }
  },
  {
    zone: "Certificate Keep",
    term: "PKI",
    mode: "Meaning",
    prompt: "What is PKI?",
    choices: [
      "Only the RSA algorithm",
      "The trust system for keys and certificates",
      "A data masking format",
      "A type of malware"
    ],
    answer: 1,
    why: "PKI means Public Key Infrastructure. It is the system that manages certificate trust.",
    lesson: { clue: "Trust system", use: "PKI", why: "Manages keys, certificates, and authorities.", trap: "PKI is not just RSA." }
  },
  {
    zone: "Certificate Keep",
    term: "CA",
    mode: "Meaning",
    prompt: "What does a Certificate Authority do?",
    choices: [
      "Issues and signs certificates",
      "Masks test data",
      "Encrypts only disk partitions",
      "Detects malware persistence"
    ],
    answer: 0,
    why: "A CA issues and signs digital certificates so other systems can trust them.",
    lesson: { clue: "Issues and signs certificates", use: "CA", why: "Creates certificate trust.", trap: "RA verifies identity; CA issues." }
  },
  {
    zone: "Certificate Keep",
    term: "Wildcard Certificate",
    mode: "When to use",
    prompt: "You need one cert for www.company.com, mail.company.com, and blog.company.com. Pick it.",
    choices: [
      "Wildcard certificate",
      "Self-signed certificate",
      "CRL",
      "Key escrow"
    ],
    answer: 0,
    why: "A wildcard certificate covers many subdomains under the same root domain, like *.company.com.",
    lesson: { clue: "Many subdomains", use: "Wildcard certificate", why: "Covers *.company.com style names.", trap: "Use SAN for different root domains." }
  },
  {
    zone: "Certificate Keep",
    term: "SAN Certificate",
    mode: "Trap",
    prompt: "You need one cert for company.com and companyapp.io. What feature fits?",
    choices: [
      "SAN",
      "OCSP",
      "TPM",
      "Hashing"
    ],
    answer: 0,
    why: "SAN means Subject Alternate Name. It lets one certificate cover different domain names.",
    lesson: { clue: "Different domain names", use: "SAN", why: "One cert can list multiple names.", trap: "Wildcard is for subdomains of one root." }
  },
  {
    zone: "Certificate Keep",
    term: "OCSP",
    mode: "When to use",
    prompt: "You need a fast revocation status check for one certificate. What should you use?",
    choices: [
      "OCSP",
      "CRL",
      "AES",
      "Tokenization"
    ],
    answer: 0,
    why: "OCSP checks one certificate by serial number. A CRL is a full revocation list.",
    lesson: { clue: "Fast one-cert check", use: "OCSP", why: "Checks status by serial number.", trap: "CRL is the larger list." }
  },
  {
    zone: "Vault Workshop",
    term: "TPM",
    mode: "Meaning",
    prompt: "What is a TPM?",
    choices: [
      "A local hardware chip that protects device keys",
      "A public blockchain",
      "A phishing method",
      "A hash collision"
    ],
    answer: 0,
    why: "TPM means Trusted Platform Module. Think device-level hardware key protection.",
    lesson: { clue: "Local device key chip", use: "TPM", why: "Protects keys on one endpoint.", trap: "HSM is enterprise scale." }
  },
  {
    zone: "Vault Workshop",
    term: "HSM",
    mode: "Trap",
    prompt: "Your company needs enterprise-grade hardware to manage many cryptographic keys. What fits best?",
    choices: [
      "HSM",
      "TPM",
      "MD5",
      "WEP"
    ],
    answer: 0,
    why: "HSM means Hardware Security Module. It is built for enterprise key management and crypto operations.",
    lesson: { clue: "Enterprise many keys", use: "HSM", why: "Central hardware for crypto operations.", trap: "TPM is local device scale." }
  },
  {
    zone: "Attack Forge",
    term: "Downgrade Attack",
    mode: "Trap",
    prompt: "An attacker forces TLS to fall back to weak SSL 3.0. What attack is this?",
    choices: [
      "Downgrade attack",
      "Collision",
      "Masking",
      "Tokenization"
    ],
    answer: 0,
    why: "A downgrade attack forces weaker protocol behavior. POODLE is the famous SSL 3.0 example.",
    lesson: { clue: "Forced fallback to SSL 3.0", use: "Downgrade attack", why: "Pushes systems to weaker protocols.", trap: "This is not a hash collision." }
  },
  {
    zone: "Key Camp", term: "Cryptographic Key", mode: "Core idea",
    prompt: "A cryptographic algorithm is publicly documented and carefully reviewed. What should remain secret to protect encrypted data?",
    choices: ["The cryptographic key", "The algorithm's name", "The file extension", "The certificate's expiration date"], answer: 0,
    why: "Modern cryptography assumes the algorithm can be public. Security depends on protecting strong keys and using the algorithm correctly.",
    lesson: { clue: "Public, reviewed algorithm", use: "Protect the cryptographic key", why: "A key controls the protected operation.", trap: "Hiding an algorithm is security through obscurity, not a sound primary control." }
  },
  {
    zone: "Key Camp", term: "Data States", mode: "Compare",
    prompt: "A database record is actively being processed in memory. Which data state is this?",
    choices: ["Data in use", "Data at rest", "Data in transit", "Data in escrow"], answer: 0,
    why: "Data being actively processed is data in use. Stored data is at rest, and data moving between locations is in transit.",
    lesson: { clue: "Actively processed in memory", use: "Data in use", why: "The system is currently working with the data.", trap: "A stored database file that is not being processed is data at rest." }
  },
  {
    zone: "Cipher Cave", term: "Stream Cipher", mode: "Compare",
    prompt: "Which cipher type processes a continuous stream of bits or bytes rather than fixed-size groups?",
    choices: ["Stream cipher", "Block cipher", "Hash function", "Digital signature"], answer: 0,
    why: "A stream cipher processes data continuously. A block cipher operates on fixed-size blocks.",
    lesson: { clue: "Continuous bits or bytes", use: "Stream cipher", why: "It encrypts a stream as data arrives.", trap: "Advanced Encryption Standard is a block cipher." }
  },
  {
    zone: "Cipher Cave", term: "DES", mode: "Legacy warning",
    prompt: "Which legacy symmetric cipher has a 56-bit effective key and should not be selected for modern protection?",
    choices: ["Data Encryption Standard", "Advanced Encryption Standard", "Elliptic Curve Cryptography", "Secure Hash Algorithm 3"], answer: 0,
    why: "Data Encryption Standard has a 56-bit effective key and is obsolete because modern computing can brute-force it.",
    lesson: { clue: "Legacy and 56-bit effective key", use: "Data Encryption Standard (DES)", why: "Its key space is too small for modern security.", trap: "Advanced Encryption Standard is the modern symmetric standard." }
  },
  {
    zone: "Cipher Cave", term: "Hybrid Encryption", mode: "Workflow",
    prompt: "Why do secure network sessions commonly use asymmetric and symmetric cryptography together?",
    choices: ["Asymmetric methods establish keying material, then symmetric encryption protects bulk data efficiently", "Both methods are required to create a hash", "Symmetric encryption issues certificates", "Asymmetric encryption is faster for every byte of data"], answer: 0,
    why: "The hybrid approach combines easier key establishment with fast bulk encryption.",
    lesson: { clue: "Two cryptographic types in one session", use: "Asymmetric setup followed by symmetric data protection", why: "It combines the strengths of both approaches.", trap: "Asymmetric cryptography is normally slower for bulk data." }
  },
  {
    zone: "Cipher Cave", term: "Diffie-Hellman", mode: "When to use",
    prompt: "Two parties need to establish shared keying material across an untrusted network. Which method is designed for this purpose?",
    choices: ["Diffie–Hellman key agreement", "Message Digest Algorithm 5", "Data masking", "Certificate Revocation List"], answer: 0,
    why: "Diffie–Hellman is a key-agreement method. It must be authenticated to resist an on-path attacker.",
    lesson: { clue: "Establish a shared secret", use: "Diffie–Hellman key agreement", why: "It lets parties derive shared keying material.", trap: "Diffie–Hellman alone does not authenticate the parties." }
  },
  {
    zone: "Hash Mine", term: "Digital Signature", mode: "Workflow",
    prompt: "Which action allows a recipient to verify both message integrity and the sender's possession of a private key?",
    choices: ["Create and verify a digital signature", "Encrypt only with a shared key", "Download a revocation list", "Apply data masking"], answer: 0,
    why: "A digital signature is created from a message digest using the signer's private key and verified with the corresponding public key.",
    lesson: { clue: "Integrity plus proof tied to a private key", use: "Digital signature", why: "It provides integrity, authentication, and supports non-repudiation.", trap: "A signature does not provide confidentiality by itself." }
  },
  {
    zone: "Hash Mine", term: "HMAC", mode: "Meaning",
    prompt: "Which construction combines a secret key with a hash function to verify integrity and authenticity?",
    choices: ["Hash-based Message Authentication Code", "Certificate Signing Request", "Online Certificate Status Protocol", "Trusted Platform Module"], answer: 0,
    why: "A Hash-based Message Authentication Code combines a shared secret with a hash function.",
    lesson: { clue: "Secret key plus a hash", use: "Hash-based Message Authentication Code (HMAC)", why: "Only parties with the secret can create a valid code.", trap: "An ordinary unkeyed hash verifies integrity but not who created it." }
  },
  {
    zone: "Hash Mine", term: "Nonce", mode: "Compare",
    prompt: "Which value is intended to be used once to add freshness and help prevent replay?",
    choices: ["Nonce", "Salt", "Private key escrow", "Message digest"], answer: 0,
    why: "A nonce is a number used once. It helps make an exchange unique and resist replay.",
    lesson: { clue: "Freshness and replay prevention", use: "Nonce", why: "It should not be reused in the relevant context.", trap: "A salt primarily makes password hashes unique." }
  },
  {
    zone: "Certificate Keep", term: "CRL", mode: "Compare",
    prompt: "A client downloads a published collection of certificates that a Certificate Authority no longer trusts. What did it retrieve?",
    choices: ["Certificate Revocation List", "Certificate Signing Request", "Subject Alternative Name", "Online Certificate Status Protocol response"], answer: 0,
    why: "A Certificate Revocation List is a Certificate Authority's published list of revoked certificates.",
    lesson: { clue: "Published collection of revoked certificates", use: "Certificate Revocation List (CRL)", why: "Clients can check whether a certificate appears on the list.", trap: "Online Certificate Status Protocol checks an individual certificate's status." }
  },
  {
    zone: "Certificate Keep", term: "Key Escrow", mode: "When to use",
    prompt: "An organization needs an authorized recovery path when an employee's encryption key is lost. Which arrangement meets this need?",
    choices: ["Key escrow", "Public key pinning", "Hash collision", "Steganography"], answer: 0,
    why: "Key escrow stores recoverable key material with an authorized trusted party or process.",
    lesson: { clue: "Authorized recovery of a lost key", use: "Key escrow", why: "A protected recovery copy can prevent permanent data loss.", trap: "Escrow creates risk and requires strict access controls and separation of duties." }
  },
  {
    zone: "Vault Workshop", term: "KMS", mode: "When to use",
    prompt: "Which centralized system manages the generation, distribution, rotation, retirement, and auditing of cryptographic keys?",
    choices: ["Key Management System", "Trusted Platform Module", "Secure enclave", "Certificate Revocation List"], answer: 0,
    why: "A Key Management System manages cryptographic keys throughout their lifecycle.",
    lesson: { clue: "Full key lifecycle", use: "Key Management System (KMS)", why: "It centralizes policy and automation for keys.", trap: "A Hardware Security Module may protect key operations but is not itself the entire lifecycle program." }
  },
  {
    zone: "Vault Workshop", term: "Secure Enclave", mode: "Meaning",
    prompt: "Which isolated processing area protects sensitive operations even if the main operating system is compromised?",
    choices: ["Secure enclave", "Certificate Authority", "Permissioned blockchain", "Data mask"], answer: 0,
    why: "A secure enclave isolates sensitive code and data from the main processor and operating environment.",
    lesson: { clue: "Isolated sensitive processing", use: "Secure enclave", why: "It reduces exposure to compromise of the main environment.", trap: "It is related to, but not identical to, a Trusted Platform Module." }
  },
  {
    zone: "Ledger Lab", term: "Blockchain", mode: "Meaning",
    prompt: "Which technology links records using hashes to create a distributed ledger in which later tampering is evident?",
    choices: ["Blockchain", "Tokenization", "Key stretching", "Online Certificate Status Protocol"], answer: 0,
    why: "A blockchain links blocks using cryptographic hashes and distributes the ledger among participants.",
    lesson: { clue: "Linked records and distributed ledger", use: "Blockchain", why: "Changing a block breaks its relationship with later blocks.", trap: "Blockchain does not automatically make every input trustworthy or confidential." }
  },
  {
    zone: "Obfuscation Outpost", term: "Tokenization", mode: "Compare",
    prompt: "A payment processor replaces a card number with a random substitute that maps back to the original value in a protected vault. What is this?",
    choices: ["Tokenization", "Data masking", "Hashing", "Steganography"], answer: 0,
    why: "Tokenization substitutes a non-sensitive token and stores the relationship to the original value in a protected system.",
    lesson: { clue: "Random substitute with a protected mapping", use: "Tokenization", why: "The token has no useful mathematical relationship to the original value.", trap: "Data masking changes how data appears and may not use a reversible vault mapping." }
  },
  {
    zone: "Obfuscation Outpost", term: "Steganography", mode: "Compare",
    prompt: "Which technique hides the existence of a secret message inside an ordinary-looking image?",
    choices: ["Steganography", "Encryption", "Tokenization", "Key stretching"], answer: 0,
    why: "Steganography conceals that a message exists by embedding it within another medium.",
    lesson: { clue: "Hidden inside an ordinary file", use: "Steganography", why: "It conceals the presence of the message.", trap: "It does not necessarily encrypt the hidden content." }
  },
  {
    zone: "Future Gate", term: "Post-Quantum Cryptography", mode: "Future security",
    prompt: "Which approach prepares current systems for attacks from future quantum computers without requiring a quantum computer to run it?",
    choices: ["Post-quantum cryptography", "Data Encryption Standard", "Public key pinning", "Password salting"], answer: 0,
    why: "Post-quantum cryptographic algorithms run on classical systems but are designed to resist known quantum attacks.",
    lesson: { clue: "Quantum-resistant algorithms on today's systems", use: "Post-quantum cryptography", why: "Organizations can begin migration before cryptographically relevant quantum computers exist.", trap: "Post-quantum cryptography is not the same as quantum key distribution." }
  }
];

const glossaryTerms = [
  ["Plaintext", "Readable data before encryption."],
  ["Ciphertext", "Scrambled unreadable data after encryption."],
  ["Encryption", "Reversible protection for confidentiality using a key."],
  ["Decryption", "Turning ciphertext back into plaintext with the correct key."],
  ["Cipher", "The algorithm used to encrypt or decrypt data."],
  ["Key", "The secret value that makes strong cryptography work."],
  ["Symmetric encryption", "One shared key; fast and best for bulk data."],
  ["Asymmetric encryption", "Public/private key pair; useful for key exchange and signatures."],
  ["AES", "Advanced Encryption Standard; modern symmetric block cipher."],
  ["DES", "Data Encryption Standard; old and weak symmetric cipher."],
  ["3DES", "Triple DES; stronger than DES but deprecated for modern use."],
  ["IDEA", "International Data Encryption Algorithm; symmetric block cipher."],
  ["Blowfish", "Symmetric block cipher."],
  ["Twofish", "Symmetric block cipher and Blowfish successor."],
  ["RC4", "Stream cipher; remember it as the stream cipher trap."],
  ["RC5 / RC6", "Symmetric block ciphers from the Rivest Cipher family."],
  ["Diffie-Hellman", "Asymmetric key agreement method."],
  ["RSA", "Asymmetric algorithm based on factoring large primes."],
  ["ECC", "Elliptic Curve Cryptography; strong asymmetric crypto with smaller keys."],
  ["ECDH", "Elliptic Curve Diffie-Hellman for key agreement."],
  ["ECDHE", "Ephemeral ECDH; supports forward secrecy."],
  ["ECDSA", "Elliptic Curve Digital Signature Algorithm."],
  ["Hashing", "One-way digest for integrity, not confidentiality."],
  ["Message digest", "The fixed-length output of a hash function."],
  ["MD5", "Old weak hash algorithm."],
  ["SHA-1", "Weak hash algorithm vulnerable to collision concerns."],
  ["SHA-2 / SHA-3", "Modern Secure Hash Algorithm families."],
  ["RIPEMD", "Hash algorithm family."],
  ["HMAC", "Hash-based Message Authentication Code; integrity plus authenticity."],
  ["Salt", "Random data added before hashing a password."],
  ["Nonce", "Number used once to add uniqueness and prevent replay."],
  ["Key stretching", "Slows password guessing by making hashing more expensive."],
  ["Collision", "Two different inputs create the same hash."],
  ["Birthday attack", "Attack that abuses collision probability."],
  ["Pass-the-hash", "Attacker authenticates with a stolen hash without cracking it."],
  ["Digital signature", "Hash encrypted with the sender's private key for integrity and non-repudiation."],
  ["PKI", "Public Key Infrastructure; the trust system for certificates and keys."],
  ["Certificate", "Binds a public key to an identity."],
  ["CA", "Certificate Authority; issues and signs certificates."],
  ["RA", "Registration Authority; verifies identity before certificate issuance."],
  ["CSR", "Certificate Signing Request."],
  ["Wildcard certificate", "Covers subdomains under one root domain."],
  ["SAN certificate", "Uses Subject Alternate Names to cover multiple names."],
  ["Self-signed certificate", "Certificate signed by the same entity that owns it."],
  ["Root CA", "Top trusted authority in a certificate chain."],
  ["Chain of trust", "Trust path from a certificate back to a trusted root."],
  ["CRL", "Certificate Revocation List."],
  ["OCSP", "Online Certificate Status Protocol; checks one certificate status."],
  ["OCSP stapling", "Server provides recent OCSP proof during connection setup."],
  ["Public key pinning", "Forces trust of a specific public key or certificate."],
  ["Key escrow", "A trusted third party stores recovery keys."],
  ["Key recovery agent", "Person or process authorized to recover escrowed keys."],
  ["Blockchain", "Immutable ledger linked by hashes."],
  ["Smart contract", "Code that runs on a blockchain when conditions are met."],
  ["Permissioned blockchain", "Blockchain with controlled membership."],
  ["TPM", "Trusted Platform Module; local hardware chip for device keys."],
  ["HSM", "Hardware Security Module; enterprise hardware for key management."],
  ["KMS", "Key Management System."],
  ["Secure enclave", "Isolated processor area for sensitive secrets."],
  ["Steganography", "Hides that data exists."],
  ["Tokenization", "Replaces sensitive data with a vault-backed token."],
  ["Data masking", "Disguises data while keeping a usable format."],
  ["Downgrade attack", "Forces systems to use weaker protocols or algorithms."],
  ["POODLE", "Padding Oracle On Downgraded Legacy Encryption."],
  ["Quantum computing", "Threatens asymmetric algorithms such as RSA and ECC."],
  ["Post-quantum cryptography", "Algorithms designed to resist quantum attacks."],
  ["CRYSTALS-Kyber", "Post-quantum key establishment design that became the basis of the standardized Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)."],
  ["CRYSTALS-Dilithium", "Post-quantum signature design that became the basis of the standardized Module-Lattice-Based Digital Signature Algorithm (ML-DSA)."]
];

const conceptDetails = {
  Plaintext: { full: "Plaintext", definition: "Readable, unencrypted information that can be understood before an encryption algorithm transforms it.", contrast: "Ciphertext is the scrambled output produced after encryption.", memory: "Plain means readable." },
  Ciphertext: { full: "Ciphertext", definition: "Encrypted information that appears unreadable until the correct cryptographic key is used to decrypt it.", contrast: "A hash digest is one-way; ciphertext is designed to be decrypted.", memory: "Ciphertext is the protected output." },
  "Symmetric Encryption": { full: "Symmetric encryption", definition: "Encryption that uses the same shared secret key to encrypt and decrypt data. It is fast and well suited to large amounts of data.", contrast: "Asymmetric encryption uses a public key and a private key and is slower.", memory: "Symmetric = same shared secret." },
  "Asymmetric Encryption": { full: "Asymmetric encryption", definition: "Encryption that uses a mathematically related public key and private key. It supports secure key establishment and digital signatures.", contrast: "Symmetric encryption uses one shared secret key and is faster for bulk data.", memory: "Asymmetric = a pair of keys." },
  AES: { full: "Advanced Encryption Standard (AES)", definition: "A modern symmetric block cipher that encrypts data in fixed-size blocks using 128-bit, 192-bit, or 256-bit keys. It is widely used because it is efficient and secure when configured correctly.", contrast: "Advanced Encryption Standard is symmetric, not asymmetric, and it is encryption rather than hashing.", memory: "AES = accepted modern encryption standard." },
  ECC: { full: "Elliptic Curve Cryptography (ECC)", definition: "A family of asymmetric cryptographic techniques that provides strong security with smaller keys, making it useful for mobile and resource-constrained devices.", contrast: "Rivest–Shamir–Adleman uses much larger keys for comparable security levels.", memory: "ECC = efficient curves for constrained computers." },
  Hashing: { full: "Hashing", definition: "A one-way process that converts input into a fixed-length message digest. It is primarily used to verify integrity and is not reversible encryption.", contrast: "Encryption provides confidentiality and is designed to be reversed with a key.", memory: "Hashing = fingerprint, not a locked box." },
  Collision: { full: "Hash collision", definition: "A condition in which two different inputs produce the same hash value, weakening the reliability of the hash as a unique digital fingerprint.", contrast: "A collision does not mean the attacker reversed the hash.", memory: "Different inputs, identical digest." },
  Salting: { full: "Password salting", definition: "Adding a unique random value to a password before hashing so identical passwords produce different stored hashes.", contrast: "A salt does not encrypt the password and does not need to remain secret.", memory: "Unique seasoning defeats precomputed tables." },
  "Pass-the-Hash": { full: "Pass-the-hash attack", definition: "An attack in which a stolen password hash is reused directly for authentication without recovering the original plaintext password.", contrast: "Password cracking attempts to discover the original password; pass-the-hash may not.", memory: "Pass the credential, do not crack it." },
  PKI: { full: "Public Key Infrastructure (PKI)", definition: "The people, policies, processes, hardware, and software used to create, manage, distribute, validate, and revoke digital certificates and public keys.", contrast: "Public key cryptography is a technical component; Public Key Infrastructure is the complete trust framework.", memory: "PKI = the whole certificate trust system." },
  CA: { full: "Certificate Authority (CA)", definition: "A trusted organization that issues and digitally signs certificates, allowing others to verify that a public key belongs to the stated identity.", contrast: "A Registration Authority verifies identity; a Certificate Authority issues the certificate.", memory: "CA creates certificate trust." },
  "Wildcard Certificate": { full: "Wildcard certificate", definition: "A certificate that protects multiple subdomains under one base domain, commonly represented with an asterisk such as *.company.com.", contrast: "A Subject Alternative Name certificate can cover different domain names.", memory: "Wildcard = many subdomains, one root." },
  "SAN Certificate": { full: "Subject Alternative Name (SAN) certificate", definition: "A certificate containing a Subject Alternative Name field that allows one certificate to identify multiple hostnames or domain names.", contrast: "A wildcard certificate generally covers subdomains beneath a single base domain.", memory: "SAN = several alternative names." },
  OCSP: { full: "Online Certificate Status Protocol (OCSP)", definition: "A protocol a client can use to request the current revocation status of an individual digital certificate.", contrast: "A Certificate Revocation List contains a published list of revoked certificates.", memory: "OCSP = one certificate status check." },
  TPM: { full: "Trusted Platform Module (TPM)", definition: "A tamper-resistant cryptographic component associated with one device that can generate, protect, and use keys for functions such as measured boot and drive encryption.", contrast: "A Hardware Security Module is generally an enterprise device or service for centralized cryptographic operations.", memory: "TPM = this personal machine." },
  HSM: { full: "Hardware Security Module (HSM)", definition: "A hardened physical device or managed service that securely generates, stores, and uses cryptographic keys for high-value or high-volume enterprise operations.", contrast: "A Trusted Platform Module normally protects keys for one endpoint.", memory: "HSM = high-scale secure key machine." },
  "Downgrade Attack": { full: "Downgrade attack", definition: "An attack that manipulates negotiation so systems fall back to an older, weaker protocol, cipher, or security mode that is easier to exploit.", contrast: "A collision attack targets hash outputs rather than protocol negotiation.", memory: "Downgrade = force weaker protection." }
};

const acronymFullNames = {
  AES: "Advanced Encryption Standard (AES)", DES: "Data Encryption Standard (DES)", "3DES": "Triple Data Encryption Standard (3DES)",
  IDEA: "International Data Encryption Algorithm (IDEA)", RC4: "Rivest Cipher 4 (RC4)", "RC5 / RC6": "Rivest Cipher 5 and Rivest Cipher 6 (RC5 / RC6)",
  RSA: "Rivest–Shamir–Adleman (RSA)", ECC: "Elliptic Curve Cryptography (ECC)", ECDH: "Elliptic Curve Diffie–Hellman (ECDH)",
  ECDHE: "Elliptic Curve Diffie–Hellman Ephemeral (ECDHE)", ECDSA: "Elliptic Curve Digital Signature Algorithm (ECDSA)",
  MD5: "Message Digest Algorithm 5 (MD5)", "SHA-1": "Secure Hash Algorithm 1 (SHA-1)", "SHA-2 / SHA-3": "Secure Hash Algorithm 2 and 3 (SHA-2 / SHA-3)",
  RIPEMD: "RACE Integrity Primitives Evaluation Message Digest (RIPEMD)", HMAC: "Hash-based Message Authentication Code (HMAC)",
  PKI: "Public Key Infrastructure (PKI)", CA: "Certificate Authority (CA)", RA: "Registration Authority (RA)", CSR: "Certificate Signing Request (CSR)",
  "SAN certificate": "Subject Alternative Name (SAN) certificate", "Root CA": "Root Certificate Authority (Root CA)", CRL: "Certificate Revocation List (CRL)",
  OCSP: "Online Certificate Status Protocol (OCSP)", "OCSP stapling": "Online Certificate Status Protocol (OCSP) stapling",
  TPM: "Trusted Platform Module (TPM)", HSM: "Hardware Security Module (HSM)", KMS: "Key Management System (KMS)",
  POODLE: "Padding Oracle On Downgraded Legacy Encryption (POODLE)", "CRYSTALS-Kyber": "Cryptographic Suite for Algebraic Lattices – Kyber (CRYSTALS-Kyber)",
  "CRYSTALS-Dilithium": "Cryptographic Suite for Algebraic Lattices – Dilithium (CRYSTALS-Dilithium)"
};

const inlineAcronyms = {
  TLS: "Transport Layer Security (TLS)", SSL: "Secure Sockets Layer (SSL)", AES: acronymFullNames.AES, ECC: acronymFullNames.ECC,
  PKI: acronymFullNames.PKI, OCSP: acronymFullNames.OCSP, CRL: acronymFullNames.CRL, TPM: acronymFullNames.TPM,
  HSM: acronymFullNames.HSM, RSA: acronymFullNames.RSA, SAN: "Subject Alternative Name (SAN)", MD5: acronymFullNames.MD5, WEP: "Wired Equivalent Privacy (WEP)"
};

const fullPhraseAcronyms = {
  "Advanced Encryption Standard": "Advanced Encryption Standard (AES)",
  "Data Encryption Standard": "Data Encryption Standard (DES)",
  "Elliptic Curve Cryptography": "Elliptic Curve Cryptography (ECC)",
  "Hash-based Message Authentication Code": "Hash-based Message Authentication Code (HMAC)",
  "Public Key Infrastructure": "Public Key Infrastructure (PKI)",
  "Certificate Authority": "Certificate Authority (CA)",
  "Registration Authority": "Registration Authority (RA)",
  "Certificate Signing Request": "Certificate Signing Request (CSR)",
  "Certificate Revocation List": "Certificate Revocation List (CRL)",
  "Online Certificate Status Protocol": "Online Certificate Status Protocol (OCSP)",
  "Subject Alternative Name": "Subject Alternative Name (SAN)",
  "Trusted Platform Module": "Trusted Platform Module (TPM)",
  "Hardware Security Module": "Hardware Security Module (HSM)",
  "Key Management System": "Key Management System (KMS)",
  "Secure Hash Algorithm": "Secure Hash Algorithm (SHA)"
};

function expandAbbreviations(text) {
  let expanded = text;
  Object.entries(fullPhraseAcronyms).forEach(([phrase, paired]) => {
    if (!expanded.includes(paired)) expanded = expanded.replaceAll(phrase, paired);
  });
  Object.entries(inlineAcronyms).forEach(([short, full]) => {
    if (!expanded.includes(full)) expanded = expanded.replace(new RegExp(`\\b${short}\\b`, "g"), full);
  });
  return expanded;
}

const glossaryGroups = [
  { name: "1. Cryptography Foundations", terms: ["Plaintext", "Ciphertext", "Encryption", "Decryption", "Cipher", "Key"] },
  { name: "2. Symmetric Encryption", terms: ["Symmetric encryption", "AES", "DES", "3DES", "IDEA", "Blowfish", "Twofish", "RC4", "RC5 / RC6"] },
  { name: "3. Asymmetric Encryption", terms: ["Asymmetric encryption", "Diffie-Hellman", "RSA", "ECC", "ECDH", "ECDHE", "ECDSA"] },
  { name: "4. Hashing and Signatures", terms: ["Hashing", "Message digest", "MD5", "SHA-1", "SHA-2 / SHA-3", "RIPEMD", "HMAC", "Salt", "Nonce", "Key stretching", "Collision", "Birthday attack", "Pass-the-hash", "Digital signature"] },
  { name: "5. Certificates and Public Key Infrastructure", terms: ["PKI", "Certificate", "CA", "RA", "CSR", "Wildcard certificate", "SAN certificate", "Self-signed certificate", "Root CA", "Chain of trust", "CRL", "OCSP", "OCSP stapling", "Public key pinning", "Key escrow", "Key recovery agent"] },
  { name: "6. Blockchain and Data Protection", terms: ["Blockchain", "Smart contract", "Permissioned blockchain", "Steganography", "Tokenization", "Data masking"] },
  { name: "7. Hardware and Key Management", terms: ["TPM", "HSM", "KMS", "Secure enclave"] },
  { name: "8. Attacks and Future Cryptography", terms: ["Downgrade attack", "POODLE", "Quantum computing", "Post-quantum cryptography", "CRYSTALS-Kyber", "CRYSTALS-Dilithium"] }
];

const bossQuests = [
  { zone: "Boss Gate", term: "Symmetric Encryption", mode: "Exam scenario", prompt: "A company must transfer a 60-gigabyte encrypted archive every night. A secure session key has already been established. Which approach BEST protects the archive with the least processing overhead?", choices: ["Encrypt the archive with Advanced Encryption Standard", "Encrypt every block with Rivest–Shamir–Adleman", "Hash the archive with Secure Hash Algorithm 256", "Sign the archive with Elliptic Curve Digital Signature Algorithm"], answer: 0, why: "Advanced Encryption Standard is efficient symmetric encryption for bulk data after a shared session key exists.", lesson: { clue: "Bulk data and an established session key", use: "Advanced Encryption Standard (AES)", why: "Symmetric encryption minimizes processing overhead for large transfers.", trap: "Hashing and signing do not provide confidentiality." } },
  { zone: "Boss Gate", term: "HSM", mode: "Exam scenario", prompt: "A payment processor must generate and use thousands of high-value keys in tamper-resistant hardware while meeting strict audit requirements. Which solution is MOST appropriate?", choices: ["Trusted Platform Module", "Hardware Security Module", "Secure enclave", "Password salt"], answer: 1, why: "A Hardware Security Module provides hardened, auditable enterprise cryptographic key operations.", lesson: { clue: "Enterprise scale, tamper resistance, and auditing", use: "Hardware Security Module (HSM)", why: "It protects centralized high-value cryptographic operations.", trap: "A Trusted Platform Module is normally tied to one endpoint." } },
  { zone: "Boss Gate", term: "SAN Certificate", mode: "Exam scenario", prompt: "An organization wants one certificate for portal.example.com, example.net, and api.partner.org. Which certificate feature BEST satisfies the requirement?", choices: ["Wildcard certificate", "Subject Alternative Name", "Certificate Revocation List", "Online Certificate Status Protocol stapling"], answer: 1, why: "The Subject Alternative Name field can identify multiple different hostnames and domains.", lesson: { clue: "Different base domains on one certificate", use: "Subject Alternative Name (SAN)", why: "It lists multiple identities in one certificate.", trap: "A wildcard is normally limited to subdomains under one base domain." } },
  { zone: "Boss Gate", term: "Digital Signature", mode: "Exam scenario", prompt: "A software company needs customers to verify that an update came from the company and was not modified. Which process BEST meets both requirements?", choices: ["Encrypt the update with the customer's public key", "Hash the update and sign the digest with the company's private key", "Encrypt the update with a shared symmetric key", "Store the update hash in plaintext without a signature"], answer: 1, why: "A digital signature binds the publisher to the digest and allows recipients to verify integrity and origin.", lesson: { clue: "Verify origin and detect modification", use: "Digital signature", why: "The private-key signature authenticates the publisher and protects integrity.", trap: "A digital signature alone does not make the update confidential." } },
  { zone: "Boss Gate", term: "OCSP", mode: "Exam scenario", prompt: "A browser needs timely revocation information for one server certificate without downloading a complete published list. Which protocol should it use?", choices: ["Certificate Signing Request", "Online Certificate Status Protocol", "Certificate Revocation List", "Public Key Infrastructure"], answer: 1, why: "Online Certificate Status Protocol queries the status of an individual certificate.", lesson: { clue: "One certificate and timely status", use: "Online Certificate Status Protocol (OCSP)", why: "It provides an individual status response.", trap: "A Certificate Revocation List is a published list, not a per-certificate query." } },
  { zone: "Boss Gate", term: "Hashing", mode: "Exam scenario", prompt: "An analyst must prove that a forensic image has not changed while it is transferred. Confidentiality is not required. What should the analyst compare?", choices: ["The image's message digests before and after transfer", "The image's symmetric encryption keys", "The certificate's Subject Alternative Names", "The system's Trusted Platform Module ownership password"], answer: 0, why: "Matching cryptographic message digests provide evidence that the data remained unchanged.", lesson: { clue: "Integrity without confidentiality", use: "Cryptographic hashing", why: "A matching digest indicates the image did not change.", trap: "Encryption protects confidentiality, which the scenario does not require." } }
];

const state = {
  index: 0,
  score: 0,
  streak: 0,
  best: Number(localStorage.getItem("cipherQuestBestV3") || 0),
  locked: false,
  deck: [],
  results: [],
  missed: [],
  reviewingMissed: false,
  reviewIndex: null,
  mode: "practice",
  mastery: JSON.parse(localStorage.getItem("cipherQuestMasteryV3") || "{}")
};

const el = {
  score: document.getElementById("score"),
  zoneName: document.getElementById("zoneName"),
  roundText: document.getElementById("roundText"),
  progressBar: document.getElementById("progressBar"),
  streak: document.getElementById("streak"),
  best: document.getElementById("best"),
  modeLabel: document.getElementById("modeLabel"),
  termLabel: document.getElementById("termLabel"),
  prompt: document.getElementById("prompt"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("nextBtn"),
  retryMissedBtn: document.getElementById("retryMissedBtn"),
  restartBtn: document.getElementById("restartBtn"),
  map: document.getElementById("map"),
  glossaryList: document.getElementById("glossaryList"),
  glossaryCount: document.getElementById("glossaryCount"),
  reviewBanner: document.getElementById("reviewBanner"),
  returnBtn: document.getElementById("returnBtn"),
  modeTabs: [...document.querySelectorAll(".mode-tab")]
};

function shuffleItems(items) {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function prepareDeck(sourceDeck) {
  return shuffleItems(sourceDeck).map((quest, deckIndex) => {
    const choices = quest.choices.map((text, originalIndex) => ({ text, originalIndex }));
    const shuffledChoices = shuffleItems(choices);
    return {
      ...quest,
      id: quest.id || `${quest.term}-${quest.mode}-${deckIndex}`,
      choices: shuffledChoices.map(choice => choice.text),
      answer: shuffledChoices.findIndex(choice => choice.originalIndex === quest.answer)
    };
  });
}

function renderMap() {
  el.map.innerHTML = state.deck.map((_, i) => {
    const result = state.results[i];
    const stateClass = i === state.index && state.reviewIndex === null
      ? "current"
      : result ? (result.correct ? "correct" : "wrong") : "";
    const label = result
      ? `Review question ${i + 1}: ${result.correct ? "answered correctly" : "answered incorrectly"}`
      : i === state.index ? `Current question ${i + 1}` : `Question ${i + 1}, not attempted`;
    return `<button class="block ${stateClass}" type="button" data-block-index="${i}" aria-label="${label}" ${result ? "" : "disabled"}></button>`;
  }).join("");
}

function renderQuest() {
  const shownIndex = state.reviewIndex === null ? state.index : state.reviewIndex;
  const quest = state.deck[shownIndex];
  const savedResult = state.results[shownIndex];
  const reviewing = state.reviewIndex !== null;
  state.locked = reviewing;

  el.zoneName.textContent = quest.zone;
  el.roundText.textContent = `${shownIndex + 1} / ${state.deck.length}`;
  el.modeLabel.textContent = quest.mode;
  el.termLabel.textContent = conceptDetails[quest.term]?.full || acronymFullNames[quest.term] || quest.term;
  el.prompt.textContent = expandAbbreviations(quest.prompt);
  el.reviewBanner.hidden = !reviewing;
  el.feedback.hidden = !reviewing;
  el.feedback.innerHTML = "";
  el.nextBtn.disabled = true;
  el.nextBtn.hidden = reviewing;
  el.retryMissedBtn.hidden = true;

  el.choices.innerHTML = quest.choices.map((choice, i) => (
    `<button class="choice ${reviewing && i === quest.answer ? "correct" : ""} ${reviewing && savedResult && i === savedResult.picked && !savedResult.correct ? "wrong" : ""}" type="button" data-index="${i}" ${reviewing ? "disabled" : ""}>${expandAbbreviations(choice)}</button>`
  )).join("");

  if (reviewing && savedResult) {
    el.feedback.innerHTML = renderLesson(quest, savedResult.correct, savedResult.picked);
  }

  updateHud();
  renderMap();
}

function updateHud() {
  el.score.textContent = state.score;
  el.streak.textContent = state.streak;
  el.best.textContent = state.best;
  el.progressBar.style.width = `${(state.index / state.deck.length) * 100}%`;
}

function renderLesson(quest, correct) {
  const lesson = quest.lesson || {
    clue: quest.prompt,
    use: quest.choices[quest.answer],
    why: quest.why,
    trap: "Match the clue before choosing."
  };
  const detail = conceptDetails[quest.term] || {
    full: acronymFullNames[quest.term] || fullPhraseAcronyms[quest.term] || quest.term,
    definition: quest.why,
    contrast: lesson.trap,
    memory: lesson.clue
  };
  const title = correct ? "Correct — reinforce it." : "Review this one — mistakes build memory.";
  return `
    <div class="feedback-title ${correct ? "" : "miss"}"><i></i><strong>${title}</strong></div>
    <p class="definition"><strong>${detail.full}</strong>${detail.definition}</p>
    <ul class="lesson-list">
      <li><span>Question clue</span><div>${lesson.clue}</div></li>
      <li><span>Best answer</span><div>${expandAbbreviations(lesson.use)}</div></li>
      <li><span>Why it fits</span><div>${lesson.why}</div></li>
      <li><span>Do not confuse</span><div>${detail.contrast || lesson.trap}</div></li>
      <li><span>Memory hook</span><div>${detail.memory || lesson.clue}</div></li>
    </ul>
  `;
}

function saveSession() {
  localStorage.setItem("cipherQuestSessionV3", JSON.stringify({
    mode: state.mode, index: state.index, score: state.score, streak: state.streak,
    deck: state.deck, results: state.results, missed: state.missed,
    reviewingMissed: state.reviewingMissed
  }));
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem("cipherQuestSessionV3") || "null");
    if (!saved?.deck?.length || saved.index >= saved.deck.length) return false;
    state.mode = saved.mode || "practice";
    state.index = saved.index || 0;
    state.score = saved.score || 0;
    state.streak = saved.streak || 0;
    state.deck = saved.deck;
    state.results = saved.results || [];
    state.missed = saved.missed || [];
    state.reviewingMissed = Boolean(saved.reviewingMissed);
    state.reviewIndex = null;
    el.modeTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.mode === state.mode));
    renderQuest();
    return true;
  } catch {
    return false;
  }
}

function chooseAnswer(event) {
  const button = event.target.closest(".choice");
  if (!button || state.locked) return;

  const quest = state.deck[state.index];
  const picked = Number(button.dataset.index);
  const correct = picked === quest.answer;
  state.locked = true;

  [...el.choices.querySelectorAll(".choice")].forEach((choiceButton, i) => {
    choiceButton.disabled = true;
    if (i === quest.answer) choiceButton.classList.add("correct");
    if (i === picked && !correct) choiceButton.classList.add("wrong");
  });

  if (correct) {
    state.score += 10 + Math.min(state.streak, 5);
    state.streak += 1;
    state.best = Math.max(state.best, state.streak);
    localStorage.setItem("cipherQuestBestV3", String(state.best));
  } else {
    state.streak = 0;
    if (!state.missed.some(item => item.term === quest.term && item.prompt === quest.prompt)) {
      state.missed.push(quest);
    }
  }

  state.results[state.index] = { correct, picked };
  state.mastery[quest.term] = {
    correct: (state.mastery[quest.term]?.correct || 0) + (correct ? 1 : 0),
    wrong: (state.mastery[quest.term]?.wrong || 0) + (correct ? 0 : 1),
    lastReviewed: new Date().toISOString()
  };
  localStorage.setItem("cipherQuestMasteryV3", JSON.stringify(state.mastery));
  saveSession();

  el.feedback.hidden = false;
  el.feedback.innerHTML = renderLesson(quest, correct);
  el.nextBtn.disabled = false;
  updateHud();
}

function nextQuest() {
  if (state.index < state.deck.length - 1) {
    state.index += 1;
    renderQuest();
    saveSession();
    return;
  }

  state.index = state.deck.length;
  el.progressBar.style.width = "100%";
  el.zoneName.textContent = state.reviewingMissed ? "Missed Review Complete" : "Quest Complete";
  el.roundText.textContent = `${state.deck.length} / ${state.deck.length}`;
  el.modeLabel.textContent = "Complete";
  el.termLabel.textContent = state.reviewingMissed ? "Retry Run" : "Section 8";
  el.prompt.textContent = state.missed.length
    ? `You cleared this run. You have ${state.missed.length} missed block${state.missed.length === 1 ? "" : "s"} ready to try again.`
    : "You cleared Cipher Quest with no missed blocks waiting.";
  el.choices.innerHTML = "";
  el.feedback.hidden = false;
  el.feedback.innerHTML = `<strong>Final score: ${state.score} gems.</strong> Best streak: ${state.best}.`;
  el.nextBtn.disabled = true;
  el.nextBtn.hidden = true;
  el.retryMissedBtn.hidden = state.missed.length === 0;
  renderMap();
  saveSession();
}

function restartGame() {
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.deck = prepareDeck(getDeckForMode(state.mode));
  state.results = [];
  state.missed = [];
  state.reviewingMissed = false;
  state.reviewIndex = null;
  renderQuest();
  saveSession();
}

function retryMissed() {
  if (!state.missed.length) return;
  state.deck = prepareDeck(state.missed);
  state.missed = [];
  state.index = 0;
  state.results = [];
  state.streak = 0;
  state.reviewingMissed = true;
  renderQuest();
  saveSession();
}

function getDeckForMode(mode) {
  if (mode === "quick") return shuffleItems(quests).slice(0, 8);
  if (mode === "compare") return quests.filter(quest => quest.mode === "Trap" || ["Symmetric Encryption", "Asymmetric Encryption", "Wildcard Certificate", "SAN Certificate", "TPM", "HSM", "Hashing"].includes(quest.term));
  if (mode === "boss") return bossQuests;
  return quests;
}

function setMode(mode) {
  state.mode = mode;
  el.modeTabs.forEach(tab => tab.classList.toggle("active", tab.dataset.mode === mode));
  restartGame();
}

function reviewBlock(event) {
  const button = event.target.closest("[data-block-index]");
  if (!button) return;
  const index = Number(button.dataset.blockIndex);
  if (!state.results[index]) return;
  state.reviewIndex = index;
  renderQuest();
  document.querySelector(".card").scrollIntoView({ behavior: "smooth", block: "start" });
}

function returnToCurrent() {
  state.reviewIndex = null;
  renderQuest();
}

function renderGlossary() {
  el.glossaryCount.textContent = `${glossaryTerms.length} terms`;
  const meaningByTerm = Object.fromEntries(glossaryTerms);
  el.glossaryList.innerHTML = glossaryGroups.map((group, groupIndex) => `
    <details class="glossary-group" ${groupIndex === 0 ? "open" : ""}>
      <summary>${group.name} · ${group.terms.length} terms</summary>
      <div class="term-list">
        ${group.terms.map(term => {
          const detailKey = Object.keys(conceptDetails).find(key => key.toLowerCase() === term.toLowerCase());
          const detail = detailKey ? conceptDetails[detailKey] : null;
          const fullTerm = detail?.full || acronymFullNames[term] || term;
          const meaning = detail?.definition || meaningByTerm[term] || "Review this term in the Section 8 notes.";
          return `<details class="term-item"><summary>${fullTerm}</summary><p>${meaning}</p></details>`;
        }).join("")}
      </div>
    </details>
  `).join("");
}

el.choices.addEventListener("click", chooseAnswer);
el.nextBtn.addEventListener("click", nextQuest);
el.retryMissedBtn.addEventListener("click", retryMissed);
el.restartBtn.addEventListener("click", restartGame);
el.map.addEventListener("click", reviewBlock);
el.returnBtn.addEventListener("click", returnToCurrent);
el.modeTabs.forEach(tab => tab.addEventListener("click", () => setMode(tab.dataset.mode)));

renderGlossary();
if (!restoreSession()) restartGame();
