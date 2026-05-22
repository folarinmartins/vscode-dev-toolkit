import * as vscode from 'vscode';

export interface Toolkit {
    readonly id: string;
    activate(context: vscode.ExtensionContext): void | vscode.Disposable | vscode.Disposable[];
}