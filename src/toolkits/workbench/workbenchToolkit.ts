import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';

const FOCUS_AUTO_HIDE_SURFACES = [
    'hideSidebar',
    'hidePanel',
    'hideSecondaryBar',
    'hideActivityBar',
    'hideStatusBar',
] as const;

const FOCUS_AUTO_HIDE_SURFACE_LABELS: Record<(typeof FOCUS_AUTO_HIDE_SURFACES)[number], string> = {
    hideSidebar: 'Sidebar',
    hidePanel: 'Panel',
    hideSecondaryBar: 'Secondary Bar',
    hideActivityBar: 'Activity Bar',
    hideStatusBar: 'Status Bar',
};

const VIEW_TOGGLES = [
    {
        id: 'vscodeDevToolkit.toggleActivityBarBtn',
        command: 'vscodeDevToolkit.toggleActivityBar',
        icon: '$(layout-activitybar-left)',
        tooltip: 'Toggle Activity Bar',
        workbenchCommand: 'workbench.action.toggleActivityBarVisibility',
        priority: 9,
    },
    {
        id: 'vscodeDevToolkit.toggleSidebarBtn',
        command: 'vscodeDevToolkit.toggleSidebar',
        icon: '$(layout-sidebar-left)',
        tooltip: 'Toggle Sidebar',
        workbenchCommand: 'workbench.action.toggleSidebarVisibility',
        priority: 8,
    },
    {
        id: 'vscodeDevToolkit.toggleSecondaryBarBtn',
        command: 'vscodeDevToolkit.toggleSecondaryBar',
        icon: '$(layout-sidebar-right)',
        tooltip: 'Toggle Secondary Bar',
        workbenchCommand: 'workbench.action.toggleAuxiliaryBar',
        priority: 7,
    },
    {
        id: 'vscodeDevToolkit.togglePanelBtn',
        command: 'vscodeDevToolkit.togglePanel',
        icon: '$(layout-panel)',
        tooltip: 'Toggle Panel',
        workbenchCommand: 'workbench.action.togglePanel',
        priority: 6,
    },
    {
        id: 'vscodeDevToolkit.toggleStatusBarViewBtn',
        command: 'vscodeDevToolkit.toggleStatusBarView',
        icon: '$(layout-statusbar)',
        tooltip: 'Toggle Status Bar',
        workbenchCommand: 'workbench.action.toggleStatusbarVisibility',
        priority: 5,
    },
    {
        id: 'vscodeDevToolkit.toggleFullScreenBtn',
        command: 'vscodeDevToolkit.toggleFullScreen',
        icon: '$(screen-full)',
        tooltip: 'Toggle Full Screen',
        workbenchCommand: 'workbench.action.toggleFullScreen',
        priority: 4,
    },
];

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
            10,
        );
        autoHideItem.command = 'vscodeDevToolkit.toggleFocusAutoHide';

        const viewToggleItems = VIEW_TOGGLES.map((cfg) => {
            const item = vscode.window.createStatusBarItem(
                cfg.id,
                vscode.StatusBarAlignment.Right,
                cfg.priority,
            );
            item.command = cfg.command;
            item.text = cfg.icon;
            item.tooltip = cfg.tooltip;
            item.color = new vscode.ThemeColor('editorInfo.foreground');
            return item;
        });

        const syncStatusBarItems = (): void => {
            const sbConfig = vscode.workspace.getConfiguration('vscodeDevToolkit.statusBar');

            if (sbConfig.get<boolean>('showFocusAutoHideToggle', true)) {
                const anyEnabled = isAnyFocusAutoHideSurfaceEnabled();
                autoHideItem.text = anyEnabled ? '$(eye) Auto-Hide' : '$(eye-closed) Auto-Hide';
                autoHideItem.tooltip = anyEnabled
                    ? 'Focus Auto-Hide: Active — click to disable all'
                    : 'Focus Auto-Hide: Inactive — click to enable';
                autoHideItem.color = anyEnabled
                    ? new vscode.ThemeColor('charts.green')
                    : new vscode.ThemeColor('disabledForeground');
                autoHideItem.show();
            } else {
                autoHideItem.hide();
            }

            const showViewToggles = sbConfig.get<boolean>('showViewToggles', true);
            for (const item of viewToggleItems) {
                if (showViewToggles) {
                    item.show();
                } else {
                    item.hide();
                }
            }
        };

        syncStatusBarItems();

        return [
            autoHideItem,
            ...viewToggleItems,
            ...VIEW_TOGGLES.map((cfg) =>
                vscode.commands.registerCommand(cfg.command, async () => {
                    await executeWorkbenchCommand(cfg.workbenchCommand);
                }),
            ),
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
                const config = vscode.workspace.getConfiguration('vscodeDevToolkit.focusAutoHide');

                const items = FOCUS_AUTO_HIDE_SURFACES.map((surface) => ({
                    label: FOCUS_AUTO_HIDE_SURFACE_LABELS[surface],
                    description: surface,
                    picked: config.get<boolean>(surface, false),
                    surface,
                }));

                const selected = await vscode.window.showQuickPick(items, {
                    canPickMany: true,
                    title: 'Focus Auto-Hide: Select views to hide',
                    placeHolder: 'Check views to include in auto-hide (none = disabled)',
                });

                // User cancelled
                if (selected === undefined) {
                    return;
                }

                const selectedSurfaces = new Set(selected.map((i) => i.surface));
                const globalConfig = vscode.workspace.getConfiguration();

                for (const surface of FOCUS_AUTO_HIDE_SURFACES) {
                    await globalConfig.update(
                        `vscodeDevToolkit.focusAutoHide.${surface}`,
                        selectedSurfaces.has(surface),
                        vscode.ConfigurationTarget.Global,
                    );
                }
                // Status bar item updates automatically via onDidChangeConfiguration
            }),
        ];
    },
};