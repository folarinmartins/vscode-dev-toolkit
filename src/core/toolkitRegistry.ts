import * as vscode from 'vscode';

import { Toolkit } from './toolkit';

export function registerToolkits(
    context: vscode.ExtensionContext,
    toolkits: readonly Toolkit[],
): void {
    for (const toolkit of toolkits) {
        const activationResult = toolkit.activate(context);

        if (!activationResult) {
            continue;
        }

        if (Array.isArray(activationResult)) {
            context.subscriptions.push(...activationResult);
            continue;
        }

        context.subscriptions.push(activationResult);
    }
}