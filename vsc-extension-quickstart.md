# VS Code Dev Toolkit Quickstart

## Run the extension

1. Install dependencies with `npm install`.
2. Press `F5` in VS Code.
3. Open the Command Palette and run one of the `Dev Toolkit` commands.

## Add a new toolkit

1. Create a folder under `src/toolkits/<toolkit-name>/`.
2. Export a `Toolkit` from that folder.
3. Add it to `src/toolkits/index.ts`.
4. Add commands and settings to `package.json`.