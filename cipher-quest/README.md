# Cipher Quest

Cipher Quest is a responsive cryptography learning game created for my CompTIA Security+ studies. It converts a dense Section 8 study guide into short active-recall rounds, immediate explanations, visual progress, and harder scenario practice.

## Live Project

[Play Cipher Quest](https://beantown3.github.io/security-plus-flashcards/cipher-quest/?version=bc44062)

## The Problem

My cryptography notes contained dozens of algorithms, abbreviations, certificate concepts, attacks, and commonly confused technologies. Repeatedly reading a long document felt overwhelming and did not prove that I could recall or apply the material.

The first Cipher Quest prototype was useful, but hands-on testing exposed several learning and interface problems:

- Incorrect answers still produced green progress blocks.
- Completed blocks could not be reopened for review.
- Feedback was too brief to reinforce full definitions.
- Abbreviations were not consistently paired with their complete names.
- The question panel could overlap the progress map at some widths.
- The 68-term vocabulary list was visually difficult to process.
- The questions did not progress far enough toward exam-style application.

## The Redesign

The redesigned version uses one-question-at-a-time practice with several difficulty levels:

- **Practice:** 35 questions covering the major cryptography concepts.
- **Five-Minute Review:** eight questions for a short daily session.
- **Compare:** ten questions focused on commonly confused concepts.
- **Boss Mode:** six difficult, original Security+-style scenarios.

Answer feedback includes:

- The full definition
- The complete term paired with its abbreviation
- The clue that matters in the question
- Why the best answer fits
- The closest concept not to confuse it with
- A short memory hook

## Progress and Review

- Green block: answered correctly
- Red block: answered incorrectly and needs review
- Yellow block: current question
- Gray block: not attempted

Completed green and red blocks are clickable. Reviewing a previous block shows the original question, selected answer, correct answer, and full explanation without erasing the current round.

The app stores the active session and learning history in browser local storage so a learner can refresh or return without losing an unfinished round.

## Vocabulary Design

The 68-term vocabulary reference is divided into eight smaller zones:

1. Cryptography Foundations
2. Symmetric Encryption
3. Asymmetric Encryption
4. Hashing and Signatures
5. Certificates and Public Key Infrastructure
6. Blockchain and Data Protection
7. Hardware and Key Management
8. Attacks and Future Cryptography

Abbreviations remain attached to their full terms—for example, **Hash-based Message Authentication Code (HMAC)** and **Online Certificate Status Protocol (OCSP)**.

## Responsive Testing

The interface was directly exercised and visually checked at representative sizes for:

- Desktop browsers
- Large iPad Pro portrait layout
- iPhone portrait layout

The functional test pass covered correct and incorrect answers, colored progress states, completed-block review, mode switching, a complete Practice round, missed-question retry, and mid-round restoration after a reload.

## Technology

- Semantic HTML
- Responsive CSS
- Vanilla JavaScript
- Browser local storage
- GitHub Pages
- AI-assisted development with Codex

## My Role and AI Collaboration

I served as the product owner and learner. I provided the source notes, explained where the prototype failed during real use, defined the desired learning experience, reviewed screenshots and live iterations, and requested corrections.

Codex assisted with implementation, responsive design, content transformation, browser testing, and debugging. The Git history preserves the original prototype and the later redesign so the project demonstrates iteration rather than hiding the development process.

## Exam Integrity

All practice questions are original and aligned to published Security+ concepts. This project does not contain exam dumps or recalled live-exam questions.

CompTIA and Security+ are trademarks of CompTIA. This personal study project is not affiliated with or endorsed by CompTIA.
