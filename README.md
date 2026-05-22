# VS Code Dev Toolkit

![License](https://img.shields.io/github/license/folarinmartins/vscode-dev-toolkit)
![Version](https://img.shields.io/visual-studio-marketplace/v/mfolarin.vscode-dev-toolkit)
![CI](https://img.shields.io/badge/ci-azure%20pipelines-blue)

VS Code Dev Toolkit is an extensible Visual Studio Code extension delivering small, focused productivity toolkits through a modular architecture.

## Status Bar

All buttons appear on the far right of the status bar, colour-coded for at-a-glance context:

| Button | Colour | Action |
|--------|--------|--------|
| `$(eye) Auto-Hide` | Green (active) / muted (inactive) | Click to select which views auto-hide on editor focus |
| `$(layout-sidebar-left)` | Blue | Toggle Primary Sidebar |
| `$(layout-panel)` | Blue | Toggle Panel |
| `$(layout-sidebar-right)` | Blue | Toggle Secondary Bar |
| `$(layout-activitybar-left)` | Blue | Toggle Activity Bar |
| `$(layout-statusbar)` | Blue | Toggle Status Bar |
| `$(screen-full)` | Blue | Toggle Full Screen |

## Focus Auto-Hide

When an editor gains focus, VS Code automatically hides whichever views you have opted in to. Click the eye button to open a checkbox picker and select the surfaces that should auto-hide. Deselecting all surfaces disables the feature with no further configuration needed.

- Debounce: `0 ms` by default (near-instant, configurable via `vscodeDevToolkit.focusAutoHide.debounceMs`).

## Toolkit Suite

- **Workbench toolkit** — status bar view toggles, full screen toggle, focus auto-hide surface selection.
- **Focus Auto-Hide toolkit** — hides selected views when focus returns to an editor.
- **Editor Utilities toolkit** — insert ISO timestamp at cursor.
- **Workspace Utilities toolkit** — copy relative file path, reveal file in Explorer.
- **Notes Utilities toolkit** — open or create today's daily workspace note.

## Commands (Command Palette)

- `Dev Toolkit: Toggle Sidebar`
- `Dev Toolkit: Toggle Panel`

All other toolkit actions are accessible via the status bar buttons.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `vscodeDevToolkit.focusAutoHide.hideSidebar` | `true` | Include Primary Sidebar in auto-hide |
| `vscodeDevToolkit.focusAutoHide.hidePanel` | `true` | Include Panel in auto-hide |
| `vscodeDevToolkit.focusAutoHide.hideSecondaryBar` | `false` | Include Secondary Bar in auto-hide |
| `vscodeDevToolkit.focusAutoHide.hideActivityBar` | `false` | Include Activity Bar in auto-hide |
| `vscodeDevToolkit.focusAutoHide.hideStatusBar` | `false` | Include Status Bar in auto-hide |
| `vscodeDevToolkit.focusAutoHide.debounceMs` | `0` | Delay (ms) before auto-hide fires |
| `vscodeDevToolkit.statusBar.showFocusAutoHideToggle` | `true` | Show the eye auto-hide button |
| `vscodeDevToolkit.statusBar.showViewToggles` | `true` | Show the six view toggle buttons |
| `vscodeDevToolkit.notes.directory` | `.vscode/dev-toolkit-notes` | Directory for daily note files |

## Architecture

```
src/core/          Shared Toolkit interface and registry
src/toolkits/      One folder per toolkit module
src/toolkits/index.ts  Single activation wiring point
```

## Local Development

```bash
npm install
npm run compile
npm run lint
npm test
```

Press `F5` in VS Code to launch an Extension Development Host.

## Publishing

See [RELEASING.md](RELEASING.md). The `azure-pipelines.yml` extends the shared CI/CD template; publication to the Marketplace is triggered by setting `publishToMarketplace: true` on a `release` branch build.

## License

MIT
