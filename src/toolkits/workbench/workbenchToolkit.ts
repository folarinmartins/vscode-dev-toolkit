import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

const FOCUS_AUTO_HIDE_SETTING = 'vscodeDevToolkit.focusAutoHide.enabled';

async function executeWorkbenchCommand(command: string): Promise<void> {
    await vscode.commands.executeCommand(command);
}

export async function hideWorkbenchChrome(): Promise<void> {
    const configuration = vscode.workspace.getConfiguration('vscodeDevToolkit.focusAutoHide');
    const hideSidebar = configuration.get<boolean>('hideSidebar', true);
    const hidePanel = configuration.get<boolean>('hidePanel', true);

    if (hideSidebar) {
        await executeWorkbenchCommand('workbench.action.closeSidebar');
    }

    if (hidePanel) {
        await executeWorkbenchCommand('workbench.action.closePanel');
    }
}

export const workbenchToolkit: Toolkit = {
    id: 'workbench',
    activate() {
        return [
            vscode.commands.registerCommand('vscodeDevToolkit.hideWorkbenchChrome', async () => {
                await hideWorkbenchChrome();
            }),
            vscode.commands.registerCommand('vscodeDevToolkit.hideSidebar', async () => {
                await executeWorkbenchCommand('workbench.action.closeSidebar');
            }),
            vscode.commands.registerCommand('vscodeDevToolkit.hidePanel', async () => {
                await executeWorkbenchCommand('workbench.action.closePanel');
            }),
            vscode.commands.registerCommand('vscodeDevToolkit.toggleFocusAutoHide', async () => {
                const configuration = vscode.workspace.getConfiguration();
                const currentValue = configuration.get<boolean>(FOCUS_AUTO_HIDE_SETTING, true);

                await configuration.update(
                    FOCUS_AUTO_HIDE_SETTING,
                    !currentValue,
                    vscode.ConfigurationTarget.Global,
                );

                void vscode.window.setStatusBarMessage(
                    `Focus Auto Hide ${!currentValue ? 'enabled' : 'disabled'}`,
                    2500,
                );
            }),
        ];
    },
};