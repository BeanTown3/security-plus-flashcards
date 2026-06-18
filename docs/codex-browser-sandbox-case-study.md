# Incident Case Study: Diagnosing a Windows Sandbox Permission Failure

## Executive Summary

While preparing to publish this Security+ flashcard project on LinkedIn, Codex browser automation repeatedly failed with Windows error `CreateProcessAsUserW failed: 5`. I used AI-assisted investigation to test competing hypotheses, gather evidence, identify the root cause, apply a least-privilege permission repair, and verify recovery.

The Chrome extension was healthy. The actual problem was a protected ACL on the local Codex runtime directory that prevented the dedicated `CodexSandboxUsers` group from executing the bundled Node.js helper. Granting that group read-and-execute access only to the Codex runtime tree restored the browser helper.

## Impact

- Chrome and the in-app browser could open normally, but Codex could not control them.
- Browser-based portfolio work, including a LinkedIn project update, was blocked.
- Reinstalling software and changing antivirus exceptions did not address the underlying cause.

## Investigation

### Initial hypotheses

1. Bitdefender was blocking the Chrome native messaging host.
2. The Codex Chrome Extension was missing or disabled.
3. The Chrome native-host manifest or registry entry was invalid.
4. The Codex desktop installation was corrupted.
5. Windows sandbox permissions prevented the helper process from launching.

### Evidence collected

- Confirmed Chrome was running.
- Confirmed the Codex Chrome Extension was installed and enabled.
- Validated the native-host manifest and registry configuration.
- Reproduced the failure after removing Bitdefender from the equation.
- Reproduced the failure after reinstalling the Chrome plugin and Codex desktop app.
- Verified relevant Windows services were running.
- Checked Defender, AppLocker, and Code Integrity event logs for blocks; none were present.
- Located the Codex sandbox logs under `.codex/.sandbox`.
- Identified the exact command that failed: the bundled Node.js runtime launching the browser helper kernel.
- Compared ACLs on the parent `AppData` directory and the actual `node.exe` runtime.

### Key finding

The parent `AppData` directory contained the expected inheritable read-and-execute permission for `CodexSandboxUsers`, but the protected Codex runtime directory did not inherit it. The actual `node.exe` ACL included only SYSTEM, Administrators, and the signed-in user.

This explained Windows error 5: the sandbox account could reach the parent directory but could not execute the helper binary.

## Root Cause

A protected Windows ACL on:

```text
C:\Users\matth\AppData\Local\OpenAI\Codex
```

prevented the local `CodexSandboxUsers` group from inheriting read-and-execute permission. The Chrome extension appeared broken because its required helper process could not start.

`ZERODAY\CodexSandboxUsers` refers to the local Windows group `CodexSandboxUsers` on the computer named `ZERODAY`; it is not a reference to a zero-day vulnerability.

## Remediation

Applied a narrowly scoped ACL change:

```powershell
icacls C:\Users\matth\AppData\Local\OpenAI\Codex /grant "ZERODAY\CodexSandboxUsers:(OI)(CI)RX" /T /C
```

Security properties of the change:

- Granted only read and execute (`RX`).
- Applied only to the Codex runtime tree.
- Did not grant access to Documents or unrelated applications.
- Added object and container inheritance for future Codex runtime files.
- Did not grant write, modify, or full-control permission.

## Validation

Before remediation, the helper exited with:

```text
windows sandbox failed: runner error: CreateProcessAsUserW failed: 5
```

After remediation:

- The bundled `node.exe` ACL showed inherited `CodexSandboxUsers:(RX)` access.
- The helper runtime returned `ok` instead of crashing.
- The in-app browser connected successfully.
- The Chrome extension connected successfully.
- Codex navigated an authenticated LinkedIn session and interacted with profile controls.

## AI-Assisted Workflow

I used Codex as an investigation partner to accelerate command selection, source-code review, log analysis, hypothesis testing, and documentation. I remained responsible for:

- Describing the symptoms and desired outcome.
- Approving privileged diagnostic commands.
- Reviewing security implications before changing ACLs.
- Choosing a least-privilege remediation.
- Verifying that the fix addressed the root cause.
- Understanding and documenting why the remediation worked.

This was not blind execution. The AI proposed and performed actions within approved boundaries while I directed the objective and made the security decisions.

## Lessons Learned

- A visible integration failure may originate several layers below the integration itself.
- Reinstalling software is not a substitute for evidence-driven root-cause analysis.
- Windows error 5 is a symptom; logs and effective ACLs reveal the actual denied resource.
- Parent-directory permissions do not guarantee access when a child directory has protected ACLs.
- Least privilege matters even during troubleshooting: grant only the rights and scope required.
- AI is most valuable when paired with verification, clear boundaries, and human accountability.

## Interview STAR Summary

**Situation:** Codex browser automation failed while I was preparing to publish a cybersecurity portfolio project, even though Chrome and LinkedIn worked normally.

**Task:** Restore browser automation without weakening security across my user profile or system.

**Action:** I directed an AI-assisted investigation that validated the extension and native host, ruled out antivirus and application corruption, inspected Windows services and security logs, analyzed Codex sandbox logs, and compared effective ACLs. We found that the dedicated sandbox group lacked execute permission on the protected Codex runtime. I approved a least-privilege `RX` grant limited to that runtime tree.

**Result:** The helper immediately passed its runtime test, both browser integrations connected, and the fix remained narrowly scoped with no write permission or unrelated directory access.

## Resume Bullet

- Directed an AI-assisted Windows incident investigation, traced `CreateProcessAsUserW` error 5 to a protected runtime ACL, and restored browser automation with a least-privilege read/execute permission fix validated through logs and functional testing.
