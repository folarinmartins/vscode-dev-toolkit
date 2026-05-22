import * as vscode from 'vscode';

import { registerToolkits } from './core/toolkitRegistry';
import { toolkits } from './toolkits';

export function activate(context: vscode.ExtensionContext) {
	registerToolkits(context, toolkits);
}

export function deactivate() {}
