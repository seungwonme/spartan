<h1 align="center">Spartan</h1>

<p align="center">
  <em>Think first. Build the minimum. Verify before done.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

---

Spartan is a personal fork of [Ponytail](https://github.com/DietrichGebert/ponytail) that merges two coding philosophies into one Claude Code plugin:

- **[Ponytail](https://github.com/DietrichGebert/ponytail)** by [@DietrichGebert](https://github.com/DietrichGebert) — YAGNI ladder, intensity levels (lite/full/ultra), `spartan:` comment convention
- **[Andrej Karpathy's coding guidelines](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md)** — think before coding (surface assumptions, push back), surgical changes (touch only what you must), goal-driven execution (define success criteria, loop until verified)

The result: an agent that asks first, builds the minimum, makes surgical edits, and proves it works before calling it done.

## How it works

```
Before coding: state assumptions, ask if unclear, push back if simpler exists.

The ladder — stop at the first rung that holds:
1. Does this need to exist?   → no: skip it (YAGNI)
2. Stdlib does it?            → use it
3. Native platform feature?   → use it
4. Installed dependency?      → use it
5. One line?                  → one line
6. Only then: the minimum that works

After coding: prove it works. Non-trivial logic leaves one runnable check.
```

## Install

### Claude Code

```
/plugin marketplace add seungwonme/spartan
/plugin install spartan@spartan
```

## Commands

| Command | What it does |
|---------|--------------|
| `/spartan [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. |

## Credits

Fork of [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT).
Karpathy guidelines from [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT).

## License

[MIT](LICENSE).
