<!-- @format -->

# VS Code Dev Toolkit

![License](https://img.shields.io/github/license/folarinmartins/vscode-dev-toolkit)
![Version](https://img.shields.io/visual-studio-marketplace/v/mfolarin.vscode-dev-toolkit)
![CI](https://img.shields.io/badge/ci-azure%20pipelines-blue)

VS Code Dev Toolkit is an extensible Visual Studio Code extension repository for shipping small, focused tooling without turning the codebase into a monolith.

The current bootstrap includes five toolkits:

-   **Workbench toolkit** for hiding the sidebar and panel on demand.
-   **Focus Auto Hide toolkit** for automatically closing the sidebar and panel when focus returns to an editor.
-   **Editor Utilities toolkit** for inserting an ISO timestamp quickly.
-   **Workspace Utilities toolkit** for active-file path helpers.
-   **Notes Utilities toolkit** for opening a daily workspace note.

## Architecture

The extension is organized as a toolkit registry.

-   `src/core/` contains the shared toolkit contract and the registry.
-   `src/toolkits/` contains isolated toolkit modules.
-   Each toolkit is responsible for its own commands, subscriptions, and settings.
-   `src/toolkits/index.ts` is the single place where new toolkits are wired into the extension.

This keeps the extension easy to grow over time: each toolkit stays independent, and the entrypoint remains small.

## Included Commands

-   `Dev Toolkit: Hide Sidebar and Panel`
-   `Dev Toolkit: Hide Sidebar`
-   `Dev Toolkit: Hide Panel`
-   `Dev Toolkit: Toggle Focus Auto Hide`
-   `Dev Toolkit: Insert ISO Timestamp`
-   `Dev Toolkit: Copy Active File Relative Path`
-   `Dev Toolkit: Reveal Active File In Explorer`
-   `Dev Toolkit: Open Daily Note`

## Settings

-   `vscodeDevToolkit.focusAutoHide.enabled`
-   `vscodeDevToolkit.focusAutoHide.hideSidebar`
-   `vscodeDevToolkit.focusAutoHide.hidePanel`
-   `vscodeDevToolkit.focusAutoHide.debounceMs`
-   `vscodeDevToolkit.notes.directory`

## Local Development

```bash
npm install
npm run compile
```

Use `F5` in VS Code to launch the extension host.

## Publishing and CI

This repository mirrors the same Azure DevOps pipeline model used in `vscode-scratch-pad`.

-   `azure-pipelines.yml` extends the shared `vscode-extension-pipeline.yml` template.
-   Publishing is enabled from the `release` branch.
-   Marketplace metadata is declared in `package.json`.
-   First release workflow convention is documented in `RELEASING.md`.

## Remote Repository Layout

The package metadata is already wired for:

-   Repository: `https://github.com/folarinmartins/vscode-dev-toolkit.git`
-   Issues: `https://github.com/folarinmartins/vscode-dev-toolkit/issues`
-   Homepage: `https://github.com/folarinmartins/vscode-dev-toolkit#readme`

## Elegant Growth Plan

The clean way to grow this repo is:

1. Add one toolkit per folder under `src/toolkits/`.
2. Keep settings namespaced under `vscodeDevToolkit.<toolkitName>.*`.
3. Keep commands flat and explicit so they are discoverable in the Command Palette.
4. Avoid cross-toolkit imports except through shared core helpers.
5. Promote reusable behavior into `src/core/` only after it is used by at least two toolkits.

## License

MIT