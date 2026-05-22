import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

function formatIsoNow(): string {
    return new Date().toISOString();
}

export const editorUtilitiesToolkit: Toolkit = {
    id: 'editorUtilities',
    activate() {
        return [
            vscode.commands.registerCommand('vscodeDevToolkit.insertIsoTimestamp', async () => {
                const editor = vscode.window.activeTextEditor;

                if (!editor) {
                    void vscode.window.showInformationMessage('No active editor found.');
                    return;
                }

                const value = formatIsoNow();

                await editor.edit((builder) => {
                    for (const selection of editor.selections) {
                        builder.replace(selection, value);
                    }
                });
            }),
        ];
    },
};