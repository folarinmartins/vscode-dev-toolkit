import * as path from 'path';
import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

function getNotesDirectory(): string {
    return vscode.workspace
        .getConfiguration('vscodeDevToolkit.notes')
        .get<string>('directory', '.vscode/dev-toolkit-notes');
}

function getWorkspaceRoot(): string | undefined {
    return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
}

function getTodayFileName(): string {
    const date = new Date().toISOString().slice(0, 10);
    return `${date}.md`;
}

export const notesUtilitiesToolkit: Toolkit = {
    id: 'notesUtilities',
    activate() {
        const dailyNoteItem = vscode.window.createStatusBarItem(
            'vscodeDevToolkit.dailyNote',
            vscode.StatusBarAlignment.Right,
            98,
        );
        dailyNoteItem.command = 'vscodeDevToolkit.openDailyNote';
        dailyNoteItem.text = '$(calendar)';
        dailyNoteItem.tooltip = "Open Today's Daily Note";

        const syncDailyNoteItem = (): void => {
            const show = vscode.workspace
                .getConfiguration('vscodeDevToolkit.statusBar')
                .get<boolean>('showDailyNote', true);
            if (show) {
                dailyNoteItem.show();
            } else {
                dailyNoteItem.hide();
            }
        };

        syncDailyNoteItem();

        return [
            dailyNoteItem,
            vscode.workspace.onDidChangeConfiguration((e) => {
                if (e.affectsConfiguration('vscodeDevToolkit.statusBar.showDailyNote')) {
                    syncDailyNoteItem();
                }
            }),
            vscode.commands.registerCommand('vscodeDevToolkit.openDailyNote', async () => {
                const workspaceRoot = getWorkspaceRoot();

                if (!workspaceRoot) {
                    void vscode.window.showWarningMessage('Open a workspace folder to use daily notes.');
                    return;
                }

                const notesDirectory = path.join(workspaceRoot, getNotesDirectory());
                const noteFile = path.join(notesDirectory, getTodayFileName());

                await vscode.workspace.fs.createDirectory(vscode.Uri.file(notesDirectory));

                const noteUri = vscode.Uri.file(noteFile);
                const stat = await vscode.workspace.fs.stat(noteUri).then(
                    () => true,
                    () => false,
                );

                if (!stat) {
                    const header = `# Daily Note ${new Date().toISOString().slice(0, 10)}\n\n`;
                    await vscode.workspace.fs.writeFile(noteUri, Buffer.from(header, 'utf8'));
                }

                const document = await vscode.workspace.openTextDocument(noteUri);
                await vscode.window.showTextDocument(document, { preview: false });
            }),
        ];
    },
};