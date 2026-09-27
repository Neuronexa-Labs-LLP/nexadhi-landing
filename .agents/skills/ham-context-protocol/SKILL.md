---
name: ham-context-protocol
description: Hierarchical Agent Memory (HAM) and Context Optimization Protocol for NexaDhi. Enforces observation masking, aggressive subagent delegation, surgical line reads, and KV-cache stability.
---

# Hierarchical Agent Memory (HAM) & Context Optimization Protocol

## 1. Hierarchical Agent Memory (HAM) Overview
Hierarchical Agent Memory manages cognitive context across three distinct tiers to maximize token efficiency, prevent context degradation, and retain key architectural decisions.

```
+-------------------------------------------------------------+
| TIER 1: Working Memory (Active turn context, tool outputs)  |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
| TIER 2: Episodic Memory (Artifacts, summaries, change logs)  |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
| TIER 3: Semantic Project Memory (AGENTS.md, Rules, Skills)  |
+-------------------------------------------------------------+
```

### Memory Tier Roles:
1. **Working Memory**: Ephemeral, tightly bounded. Kept lean via surgical reads and selective tool inspection.
2. **Episodic Memory**: Stored in session artifacts and milestone summaries. Records progress, task status, and verified outputs.
3. **Semantic Memory**: Project guidelines, persistent architecture decisions, and design system contracts checked into `.agents/` and `AGENTS.md`.

---

## 2. Context Optimization Protocol

### A. Surgical File Reads
- **Rule**: Never view entire large files when inspecting specific logic.
- **Action**: Always specify precise `StartLine` and `EndLine` slices (maximum 60–100 lines).
- **Benefit**: Keeps prompt token usage low and avoids polluting active context with unrelated boilerplate.

### B. Observation Masking & Truncation
- Filter large command and terminal logs.
- Discard repetitive polling outputs; rely on reactive background wakeup mechanisms (`schedule` or task notification).
- Summarize findings concisely before making code modifications.

### C. Aggressive Delegation
- For multi-faceted tasks (deep research, multi-file refactoring, end-to-end testing), delegate focused sub-tasks to subagents with explicit boundary prompts.
- Subagents execute autonomously and return structured summaries back to the orchestrator.

### D. KV-Cache Stability
- Maintain consistent system prompt prefixes and prompt structure.
- Avoid churning top-level instructions and declarations between turns.
- Keep tool inputs deterministic and structured to leverage upstream prompt caching.

---

## 3. Execution Best Practices
1. **Inspect Before Modifying**: Read exact target line blocks before calling replace tools.
2. **Atomic Verification**: Always run `npx tsc --noEmit` after code edits to ensure complete type safety and zero regressions.
3. **Persist State**: When completing major milestones, update project episodic logs or rules to preserve memory across sessions.
