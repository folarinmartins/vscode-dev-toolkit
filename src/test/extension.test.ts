import * as assert from 'assert';
import * as vscode from 'vscode';

suite('VS Code Dev Toolkit', () => {
    test('registers workbench commands', async () => {
        const extension = vscode.extensions.getExtension('mfolarin.vscode-dev-toolkit');

        assert.ok(extension);

        await extension.activate();

        const commands = await vscode.commands.getCommands(true);

        assert.ok(commands.includes('vscodeDevToolkit.hideWorkbenchChrome'));
        assert.ok(commands.includes('vscodeDevToolkit.toggleFocusAutoHide'));
        assert.ok(commands.includes('vscodeDevToolkit.insertIsoTimestamp'));
        assert.ok(commands.includes('vscodeDevToolkit.copyRelativeFilePath'));
        assert.ok(commands.includes('vscodeDevToolkit.openDailyNote'));
    });
});