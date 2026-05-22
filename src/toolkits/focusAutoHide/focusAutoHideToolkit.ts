import * as vscode from 'vscode';

import { Toolkit } from '../../core/toolkit';
import { hideWorkbenchChrome } from '../workbench/workbenchToolkit';

function isFocusAutoHideEnabled(): boolean {
    return vscode.workspace
        .getConfiguration('vscodeDevToolkit.focusAutoHide')
        .get<boolean>('enabled', true);
}

function getDebounceMs(): number {
    return vscode.workspace
        .getConfiguration('vscodeDevToolkit.focusAutoHide')
        .get<number>('debounceMs', 120);
}

export const focusAutoHideToolkit: Toolkit = {
    id: 'focusAutoHide',
    activate() {
        let timer: NodeJS.Timeout | undefined;

        const scheduleAutoHide = (): void => {
            if (!isFocusAutoHideEnabled()) {
                return;
            }

            if (!vscode.window.state.focused) {
                return;
            }

            if (!vscode.window.activeTextEditor) {
                return;
            }

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                void hideWorkbenchChrome();
            }, getDebounceMs());
        };

        return [
            vscode.window.onDidChangeActiveTextEditor(() => {
                scheduleAutoHide();
            }),
            vscode.window.onDidChangeWindowState((state) => {
                if (state.focused) {
                    scheduleAutoHide();
                }
            }),
            new vscode.Disposable(() => {
                if (timer) {
                    clearTimeout(timer);
                }
            }),
        ];
    },
};