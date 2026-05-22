import * as path from 'path';
import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

function getActiveFilePath(): string | undefined {
    return vscode.window.activeTextEditor?.document.uri.fsPath;
}

function getWorkspaceRelativePath(filePath: string): string {
    const folder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));

    if (!folder) {
        return filePath;
    }

    return path.relative(folder.uri.fsPath, filePath);
}

export const workspaceUtilitiesToolkit: Toolkit = {
    id: 'workspaceUtilities',
    activate() {
        return [
            vscode.commands.registerCommand('vscodeDevToolkit.copyRelativeFilePath', async () => {
                const filePath = getActiveFilePath();

                if (!filePath) {
                    void vscode.window.showInformationMessage('No active file found.');
                    return;
                }

                const relative = getWorkspaceRelativePath(filePath);
                await vscode.env.clipboard.writeText(relative);
                void vscode.window.showInformationMessage(`Copied: ${relative}`);
            }),
            vscode.commands.registerCommand('vscodeDevToolkit.revealActiveFileInExplorer', async () => {
                const uri = vscode.window.activeTextEditor?.document.uri;

                if (!uri) {
                    void vscode.window.showInformationMessage('No active file found.');
                    return;
                }

                await vscode.commands.executeCommand('revealInExplorer', uri);
            }),
        ];
    },
};