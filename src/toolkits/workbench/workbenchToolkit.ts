import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

const FOCUS_AUTO_HIDE_SURFACES = [
    'hideSidebar',
    'hidePanel',
    'hideSecondaryBar',
    'hideActivityBar',
    'hideStatusBar',
] as const;

function isAnyFocusAutoHideSurfaceEnabled(): boolean {
    const config = vscode.workspace.getConfiguration('vscodeDevToolkit.focusAutoHide');
    return FOCUS_AUTO_HIDE_SURFACES.some((s) => config.get<boolean>(s, false));
}

async function executeWorkbenchCommand(command: string): Promise<void> {
    await vscode.commands.executeCommand(command);
}

export async function hideWorkbenchChrome(): Promise<void> {
    const configuration = vscode.workspace.getConfiguration('vscodeDevToolkit.focusAutoHide');
    const hideSidebar = configuration.get<boolean>('hideSidebar', true);
    const hidePanel = configuration.get<boolean>('hidePanel', true);
    const hideSecondaryBar = configuration.get<boolean>('hideSecondaryBar', false);
    const hideActivityBar = configuration.get<boolean>('hideActivityBar', false);
    const hideStatusBar = configuration.get<boolean>('hideStatusBar', false);

    if (hideSidebar) {
        await executeWorkbenchCommand('workbench.action.closeSidebar');
    }

    if (hidePanel) {
        await executeWorkbenchCommand('workbench.action.closePanel');
    }

    if (hideSecondaryBar) {
        await executeWorkbenchCommand('workbench.action.closeAuxiliaryBar');
    }

    if (hideActivityBar) {
        const activityBarLocation = vscode.workspace
            .getConfiguration('workbench')
            .get<string>('activityBar.location', 'default');
        if (activityBarLocation !== 'hidden') {
            await executeWorkbenchCommand('workbench.action.toggleActivityBarVisibility');
        }
    }

    if (hideStatusBar) {
        const statusBarVisible = vscode.workspace
            .getConfiguration('workbench')
            .get<boolean>('statusBar.visible', true);
        if (statusBarVisible !== false) {
            await executeWorkbenchCommand('workbench.action.toggleStatusbarVisibility');
        }
    }
}

export const workbenchToolkit: Toolkit = {
    id: 'workbench',
    activate() {
        const autoHideItem = vscode.window.createStatusBarItem(
            'vscodeDevToolkit.focusAutoHideToggle',
            vscode.StatusBarAlignment.Right,
            100,
        );
        autoHideItem.command = 'vscodeDevToolkit.toggleFocusAutoHide';

        const hideChromeItem = vscode.window.createStatusBarItem(
            'vscodeDevToolkit.hideChrome',
            vscode.StatusBarAlignment.Right,
            99,
        );
        hideChromeItem.command = 'vscodeDevToolkit.hideWorkbenchChrome';
        hideChromeItem.text = '$(layout-sidebar-left-off)';
        hideChromeItem.tooltip = 'Hide Workbench Chrome';

        const syncStatusBarItems = (): void => {
            const sbConfig = vscode.workspace.getConfiguration('vscodeDevToolkit.statusBar');

            if (sbConfig.get<boolean>('showFocusAutoHideToggle', true)) {
                const anyEnabled = isAnyFocusAutoHideSurfaceEnabled();
                autoHideItem.text = anyEnabled ? '$(eye) Auto-Hide' : '$(eye-closed) Auto-Hide';
                autoHideItem.tooltip = anyEnabled
                    ? 'Focus Auto-Hide: Active — click to disable all'
                    : 'Focus Auto-Hide: Inactive — click to enable';
                autoHideItem.show();
            } else {
                autoHideItem.hide();
            }

            if (sbConfig.get<boolean>('showHideChrome', true)) {
                hideChromeItem.show();
            } else {
                hideChromeItem.hide();
            }
        };

        syncStatusBarItems();

        return [
            autoHideItem,
            hideChromeItem,
            vscode.workspace.onDidChangeConfiguration((e) => {
                if (
                    e.affectsConfiguration('vscodeDevToolkit.statusBar') ||
                    e.affectsConfiguration('vscodeDevToolkit.focusAutoHide')
                ) {
                    syncStatusBarItems();
                }
            }),
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
                const anyEnabled = isAnyFocusAutoHideSurfaceEnabled();
                const globalConfig = vscode.workspace.getConfiguration();

                if (anyEnabled) {
                    // Disable all surfaces
                    for (const surface of FOCUS_AUTO_HIDE_SURFACES) {
                        await globalConfig.update(
                            `vscodeDevToolkit.focusAutoHide.${surface}`,
                            false,
                            vscode.ConfigurationTarget.Global,
                        );
                    }
                } else {
                    // Enable the two most common surfaces as a sensible default
                    await globalConfig.update(
                        'vscodeDevToolkit.focusAutoHide.hideSidebar',
                        true,
                        vscode.ConfigurationTarget.Global,
                    );
                    await globalConfig.update(
                        'vscodeDevToolkit.focusAutoHide.hidePanel',
                        true,
                        vscode.ConfigurationTarget.Global,
                    );
                }
                // Status bar item updates automatically via onDidChangeConfiguration
            }),
        ];
    },
};