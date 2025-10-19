"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const disposable = vscode.workspace.onDidOpenTextDocument(async (doc) => {
        const uri = doc.uri.toString();
        // Find any visible editor already showing this file
        const existing = vscode.window.visibleTextEditors.find((e) => e.document.uri.toString() === uri);
        // If it’s already visible, focus that editor and close the new one
        if (existing) {
            await vscode.window.showTextDocument(existing.document, existing.viewColumn);
            const duplicates = vscode.window.visibleTextEditors.filter((e) => e.document.uri.toString() === uri &&
                e.viewColumn !== existing.viewColumn);
            // Close duplicates in other groups
            for (const dup of duplicates) {
                await vscode.window.showTextDocument(dup.document, dup.viewColumn);
                await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
            }
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
