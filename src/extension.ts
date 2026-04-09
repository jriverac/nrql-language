import * as vscode from 'vscode';
import { formatNRQL } from './formatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('NRQL Formatter extension is now active');

  const disposable = vscode.languages.registerDocumentFormattingEditProvider('nrql', {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      const text = document.getText();
      const formatted = formatNRQL(text);

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      return [vscode.TextEdit.replace(fullRange, formatted)];
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('NRQL Formatter extension is now deactivated');
}
