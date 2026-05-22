import * as assert from 'assert';
import * as vscode from 'vscode';

suite('VS Code Dev Toolkit', () => {
	test('registers toolkit commands', async () => {
		const extension = vscode.extensions.getExtension('mfolarin.vscode-dev-toolkit');

		assert.ok(extension);
		await extension.activate();

		const commands = await vscode.commands.getCommands(true);

		// Workbench view toggles
		assert.ok(commands.includes('vscodeDevToolkit.toggleSidebar'));
		assert.ok(commands.includes('vscodeDevToolkit.togglePanel'));
		assert.ok(commands.includes('vscodeDevToolkit.toggleSecondaryBar'));
		assert.ok(commands.includes('vscodeDevToolkit.toggleActivityBar'));
		assert.ok(commands.includes('vscodeDevToolkit.toggleStatusBarView'));
		assert.ok(commands.includes('vscodeDevToolkit.toggleFullScreen'));

		// Focus auto-hide
		assert.ok(commands.includes('vscodeDevToolkit.toggleFocusAutoHide'));

		// Editor utilities
		assert.ok(commands.includes('vscodeDevToolkit.insertIsoTimestamp'));
		assert.ok(commands.includes('vscodeDevToolkit.copyRelativeFilePath'));
		assert.ok(commands.includes('vscodeDevToolkit.revealActiveFileInExplorer'));

		// Notes utilities
		assert.ok(commands.includes('vscodeDevToolkit.openDailyNote'));
	});
});
