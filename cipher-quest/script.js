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
  ["CRYSTALS-Kyber", "Post-quantum encryption and key establishment."],
  ["CRYSTALS-Dilithium", "Post-quantum digital signatures."]
];

const state = {
  index: 0,
  score: 0,
  streak: 0,
  best: Number(localStorage.getItem("cipherQuestBest") || 0),
  locked: false,
  deck: [],
  missed: [],
  reviewingMissed: false
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
  glossaryCount: document.getElementById("glossaryCount")
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
  return shuffleItems(sourceDeck).map(quest => {
    const choices = quest.choices.map((text, originalIndex) => ({ text, originalIndex }));
    const shuffledChoices = shuffleItems(choices);
    return {
      ...quest,
      choices: shuffledChoices.map(choice => choice.text),
      answer: shuffledChoices.findIndex(choice => choice.originalIndex === quest.answer)
    };
  });
}

function renderMap() {
  el.map.innerHTML = state.deck.map((_, i) => {
    const stateClass = i < state.index ? "done" : i === state.index ? "current" : "";
    return `<span class="block ${stateClass}" aria-hidden="true"></span>`;
  }).join("");
}

function renderQuest() {
  const quest = state.deck[state.index];
  state.locked = false;

  el.zoneName.textContent = quest.zone;
  el.roundText.textContent = `${state.index + 1} / ${state.deck.length}`;
  el.modeLabel.textContent = quest.mode;
  el.termLabel.textContent = quest.term;
  el.prompt.textContent = quest.prompt;
  el.feedback.hidden = true;
  el.feedback.innerHTML = "";
  el.nextBtn.disabled = true;
  el.nextBtn.hidden = false;
  el.retryMissedBtn.hidden = true;

  el.choices.innerHTML = quest.choices.map((choice, i) => (
    `<button class="choice" type="button" data-index="${i}">${choice}</button>`
  )).join("");

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
  const title = correct ? "Correct." : "Good miss to learn from.";
  return `
    <strong>${title}</strong>
    <ul class="lesson-list">
      <li><span>Clue</span>${lesson.clue}</li>
      <li><span>Use</span>${lesson.use}</li>
      <li><span>Why</span>${lesson.why}</li>
      <li><span>Trap</span>${lesson.trap}</li>
    </ul>
  `;
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
    localStorage.setItem("cipherQuestBest", String(state.best));
  } else {
    state.streak = 0;
    if (!state.missed.some(item => item.term === quest.term && item.prompt === quest.prompt)) {
      state.missed.push(quest);
    }
  }

  el.feedback.hidden = false;
  el.feedback.innerHTML = renderLesson(quest, correct);
  el.nextBtn.disabled = false;
  updateHud();
}

function nextQuest() {
  if (state.index < state.deck.length - 1) {
    state.index += 1;
    renderQuest();
    return;
  }

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
}

function restartGame() {
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.deck = prepareDeck(quests);
  state.missed = [];
  state.reviewingMissed = false;
  renderQuest();
}

function retryMissed() {
  if (!state.missed.length) return;
  state.deck = prepareDeck(state.missed);
  state.missed = [];
  state.index = 0;
  state.streak = 0;
  state.reviewingMissed = true;
  renderQuest();
}

function renderGlossary() {
  el.glossaryCount.textContent = `${glossaryTerms.length} terms`;
  el.glossaryList.innerHTML = glossaryTerms.map(([term, meaning]) => (
    `<details><summary>${term}</summary><p>${meaning}</p></details>`
  )).join("");
}

el.choices.addEventListener("click", chooseAnswer);
el.nextBtn.addEventListener("click", nextQuest);
el.retryMissedBtn.addEventListener("click", retryMissed);
el.restartBtn.addEventListener("click", restartGame);

renderGlossary();
restartGame();
