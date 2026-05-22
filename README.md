# VS Code Dev Toolkit

![License](https://img.shields.io/github/license/folarinmartins/vscode-dev-toolkit)
![Version](https://img.shields.io/visual-studio-marketplace/v/mfolarin.vscode-dev-toolkit)
![CI](https://img.shields.io/badge/ci-azure%20pipelines-blue)

VS Code Dev Toolkit is an extensible Visual Studio Code extension repository for shipping small, focused tooling without turning the codebase into a monolith.

This repository is now strictly bootstrap-aligned to the official generator (`yo code`) baseline and then extended with modular toolkits.

## Toolkit Suite

- **Workbench toolkit** for hiding the sidebar and panel on demand.
- **Focus Auto Hide toolkit** for automatically closing the sidebar and panel when focus returns to an editor.
- **Editor Utilities toolkit** for inserting an ISO timestamp quickly.
- **Workspace Utilities toolkit** for active-file path helpers.
- **Notes Utilities toolkit** for opening a daily workspace note.

## Architecture

- `src/core/` contains the shared toolkit contract and the registry.
- `src/toolkits/` contains isolated toolkit modules.
- `src/toolkits/index.ts` is the single place where toolkits are wired into activation.

## Included Commands

- `Dev Toolkit: Hide Sidebar and Panel`
- `Dev Toolkit: Hide Sidebar`
- `Dev Toolkit: Hide Panel`
- `Dev Toolkit: Toggle Focus Auto Hide`
- `Dev Toolkit: Insert ISO Timestamp`
- `Dev Toolkit: Copy Active File Relative Path`
- `Dev Toolkit: Reveal Active File In Explorer`
- `Dev Toolkit: Open Daily Note`

## Settings

- `vscodeDevToolkit.focusAutoHide.enabled`
- `vscodeDevToolkit.focusAutoHide.hideSidebar`
- `vscodeDevToolkit.focusAutoHide.hidePanel`
- `vscodeDevToolkit.focusAutoHide.debounceMs`
- `vscodeDevToolkit.notes.directory`

## Local Development

```bash
npm install
npm run compile
npm run lint
npm test
```

Use `F5` in VS Code to launch an Extension Development Host.

## Publishing and Release Conventions

- `azure-pipelines.yml` extends your shared Azure DevOps extension template.
- `.github/workflows/release-readiness.yml` enforces compile/lint checks on `master` and `release`.
- `RELEASING.md` documents branch and release flow.

## License

MIT
