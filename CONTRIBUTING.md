# Contributing

Thanks for your interest in contributing to this project.

This guide is intentionally short and practical so you can get started quickly.

## Quick Start

### 1) Fork and clone
- Fork this repository
- Clone your fork locally
- Create a feature branch from `main`

Suggested branch naming:
- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`

### 2) Install dependencies
This repo currently includes a UI app in `src/ui` (Vite + React).

```bash
cd src/ui
npm install
```

### 3) Run locally
```bash
npm run dev
```

### 4) Check quality before opening a PR
```bash
npm run lint
npm run build
```

If a command fails, include notes in your PR about what failed and why.

## What to Contribute

Good first contributions include:
- Fixing bugs
- Improving docs
- Small UX improvements
- Refactors that improve readability without changing behavior

For larger changes, please open an issue first to align on scope.

## Pull Request Checklist

Before submitting your PR, make sure:

- [ ] My branch is up to date with `main`
- [ ] I kept the change focused and minimal
- [ ] I ran lint/build checks locally
- [ ] I updated docs/comments where relevant
- [ ] I added screenshots or short demo notes for UI changes
- [ ] My PR title clearly describes the change
- [ ] My PR description explains:
  - what changed
  - why it changed
  - anything reviewers should pay special attention to

## Commit Guidance

Use clear, descriptive commit messages.

Examples:
- `feat: add loading state to workflow list`
- `fix: prevent null error in wizard step renderer`
- `docs: clarify local setup instructions`

## Code Style

- Follow existing patterns in the project
- Keep components and functions small and focused
- Avoid unrelated changes in the same PR

## Reporting Issues

When opening an issue, include:
- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots/logs if applicable
- Environment details (OS, Node version)

## Questions

If anything is unclear, open an issue or draft PR and ask for feedback early.