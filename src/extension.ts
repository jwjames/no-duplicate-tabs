import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.workspace.onDidOpenTextDocument(async (doc) => {
    const uri = doc.uri.toString();

    // Find any visible editor already showing this file
    const existing = vscode.window.visibleTextEditors.find(
      (e) => e.document.uri.toString() === uri
    );

    // If it’s already visible, focus that editor and close the new one
    if (existing) {
      await vscode.window.showTextDocument(
        existing.document,
        existing.viewColumn
      );
      const duplicates = vscode.window.visibleTextEditors.filter(
        (e) =>
          e.document.uri.toString() === uri &&
          e.viewColumn !== existing.viewColumn
      );
      // Close duplicates in other groups
      for (const dup of duplicates) {
        await vscode.window.showTextDocument(dup.document, dup.viewColumn);
        await vscode.commands.executeCommand(
          'workbench.action.closeActiveEditor'
        );
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
