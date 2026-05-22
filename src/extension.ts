import * as vscode from 'vscode';

import { registerToolkits } from './core/toolkitRegistry';
import { toolkits } from './toolkits';

export function activate(context: vscode.ExtensionContext): void {
    registerToolkits(context, toolkits);
}

export function deactivate(): void {}